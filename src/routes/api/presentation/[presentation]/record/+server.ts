import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import { createClient } from '@deepgram/sdk';
import { CARTESIA_API_KEY, DEEPGRAM_API_KEY } from '$env/static/private';
import { groq } from '$lib/server/groq';
import type { RequestHandler } from './$types';
import { CartesiaClient } from '@cartesia/cartesia-js';
import { pinata } from '$lib/server/pinata';

export const POST: RequestHandler = async ({ request, params, locals: { supabase } }) => {
	console.log(params.presentation);
	const presentation = (await supabase.from('presentation').select().eq('id', params.presentation))
		?.data?.[0];

	console.log(presentation);

	if (!presentation) throw error(404);

	const { audioCid } = z.object({ audioCid: z.string() }).parse(JSON.parse(await request.text()));
	const url = `https://gateway.pinata.cloud/ipfs/${audioCid}`;

	const deepgram = createClient(DEEPGRAM_API_KEY);
	const { result, error: err } = await deepgram.listen.prerecorded.transcribeUrl(
		{ url },
		{
			model: 'nova-2',
			language: 'en',
			filler_words: true
		}
	);
	if (err) {
		console.error(err);
		return error(501);
	}
	const { words, transcript } = result.results.channels[0].alternatives[0];

	// format (time) word (time) word etc.
	const transcriptWithTimestamps = words
		.map(({ word, start }, i, arr) => `(${(start - (arr[i - 1]?.end || 0)).toFixed(2)}) ${word}`)
		.join(' ');

	console.log(transcriptWithTimestamps);

	const uhum_count = transcript.match(/\b(?:uh+|um+)\b/gi)?.length || 0;

	const [gradingFeedback, questions] = await Promise.all([
		getGradingFeedback(transcriptWithTimestamps, presentation),
		generateQuestions(transcript, presentation)
	] as const);

	const res = await supabase.from('recording').insert({
		presentation_id: presentation.id,
		audio_cid: audioCid,
		transcript,
		recording_score: gradingFeedback,
		questions
	});

	console.log(res);

	return json({ transcript, words, gradingFeedback, uhum_count, questions });
};

async function getGradingFeedback(transcriptWithTimestamps: string, presentation: any) {
	const completion = await groq.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `
You are a scoring a user who has given an oral presentation about a topic. Grade the below transcript based on this rubric: 

Pacing (10 points)
Delivery and Confidence (15 points)
Clarity (10 points)
Engagement (15 points)

The topic of the slideshow the user presented on is \"${presentation.topic}\". Here is a JSON representation of the slideshow they presented on. ${presentation.slides}

Return JSON and only JSON following this zod schema:
\`\`\`typescript
z.object({
		pacing: z.number().max(10),
		delivery: z.number().max(15),
		clarity: z.number().max(10),
		engagement: z.number().max(15),
    comments: z.string()
});
\`\`\`

Keep in mind that the numbers in parenthesis are the time between the start and end of each word. The transcript does not have an punctuation. Assume punctuation based on the timing of the pauses between the words. The transcription service we are using does not have punctuation.`.trim()
			},
			{
				role: 'user',
				content: transcriptWithTimestamps
			}
		],
		model: 'llama-3.3-70b-versatile',
		temperature: 1,
		max_completion_tokens: 2048
	});

	const schema = z.object({
		pacing: z.coerce.number().max(10),
		delivery: z.coerce.number().max(15),
		clarity: z.coerce.number().max(10),
		engagement: z.coerce.number().max(15),
		comments: z.string()
	});

	const response = completion.choices[0].message
		.content!.replaceAll('```json', '')
		.replaceAll('```', '')
		.trim();
	console.log(response);

	return schema.parse(JSON.parse(response));
}

async function generateQuestions(transcript: string, presentation: any) {
	const completion = await groq.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `
You are generating questions for a user presentation. The audio will be generated in the voice of Peter Griffin, so talk like you're in family guy!

The topic of the slideshow the user presented on is \"${presentation.topic}\". Here is a JSON representation of the slideshow they presented on. ${presentation.slides}

Return a single sentence question that talks asks about something further in depth that the user talked about, just like if you were making small talk about the presentation that you just received.

Return JSON and only JSON following this zod schema:
\`\`\`typescript
z.array(z.string()).min(1).max(3);
\`\`\`

The transcription service we are using does not have punctuation. Assume the punctuation.`.trim()
			},
			{
				role: 'user',
				content: transcript
			}
		],
		model: 'llama-3.3-70b-versatile',
		temperature: 1,
		max_completion_tokens: 2048
	});

	const schema = z.array(z.string()).min(1).max(3);

	const response = completion.choices[0].message
		.content!.replaceAll('```json', '')
		.replaceAll('```', '')
		.trim();
	console.log(response);

	const questions = schema.parse(JSON.parse(response));
	const cartesia = new CartesiaClient({
		apiKey: CARTESIA_API_KEY
	});

	async function audioFor(text: string) {
		return new Uint8Array(
			await cartesia.tts.bytes({
				voice: {
					id: 'd18f25ce-1c39-4bda-95d9-b0d937ff7a11',
					mode: 'id',
					experimentalControls: {
						speed: 'slow',
						emotion: ['curiosity:high', 'positivity:low']
					}
				},
				modelId: 'sonic-english',
				transcript: text,
				outputFormat: {
					container: 'wav',
					encoding: 'pcm_s16le',
					sampleRate: 44100
				}
			})
		);
	}

	return await Promise.all(
		questions.map(async (q) => {
			const audio_bytes = await audioFor(q);
			const res = await pinata.upload.file(
				new File([audio_bytes], 'question.wav', {
					type: 'audio/wav',
					lastModified: Date.now()
				})
			);

			return { question_text: q, question_cid: res.IpfsHash };
		})
	);
}
