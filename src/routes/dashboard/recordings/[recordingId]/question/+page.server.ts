import { error, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import type { Question } from '$lib/types';
import { pinata } from '$lib/server/pinata';
import { createClient } from '@deepgram/sdk';
import { DEEPGRAM_API_KEY } from '$env/static/private';
import { groq } from '$lib/server/groq';
import { z } from 'zod';

export const load = (async ({ params, locals: { supabase, user } }) => {
	const { data } = await supabase
		.from('recording')
		.select(`*, presentation (*)`)
		.eq('id', params.recordingId)
		.single();

	if (!data) throw error(404);
	if (data?.question_score) redirect(307, `/dashboard/recordings/${params.recordingId}/`);

	return {
		presentation: data.presentation,
		recording: { ...data, questions: data.questions as any[] as Question[] }
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const { data } = await supabase
			.from('recording')
			.select(`*, presentation (*)`)
			.eq('id', params.recordingId)
			.single();

		if (!data) throw error(404);
		if (data.question_score) redirect(303, `/dashboard/recordings/${params.recordingId}/`);

		const questions = data.questions as any[] as Question[];

		const fd = await request.formData();
		const files = [];
		for (let i = 0; ; i++) {
			const audio = fd.get(`audio${i}`);
			if (!audio || !(audio instanceof File)) break;

			const { IpfsHash } = await pinata.upload.file(audio);
			const url = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;

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
			files.push({
				url,
				transcript,
				words,
				question: questions[i].question_text
			});
		}

		console.log(files);

		const feedback = await getGradingFeedback(files, {
			...data.presentation,
			transcript: data.transcript
		});

		console.log(feedback);

		const { error: dbError } = await supabase
			.from('recording')
			.update({
				question_score: feedback,
				answers: files as any
			})
			.eq('id', params.recordingId);

		if (dbError) {
			console.error(dbError);
			return error(501);
		}
	}
} satisfies Actions;

async function getGradingFeedback(
	questions: {
		url: string;
		transcript: string;
		question: string;
	}[],
	presentation: { topic: string; slides: any; transcript: string }
) {
	const completion = await groq.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `
You are a scoring a user who has given an oral presentation about a topic. Then, an artificial intelligence peter griffin asked them questions about their presentation. Your job is to grade their answers to their questions.

Grade the below transcript based on this rubric: 

Depth and Insight (10 points)
Clarity and Confidence (10 points)
Relevance (10 points)

The topic of the slideshow the user presented on is \"${presentation.topic}\". 
Here is a JSON representation of the slideshow they presented on: ${JSON.stringify(presentation.slides)}. 
Here is the transcript from their presentation: ${presentation.transcript}

Return JSON and only JSON following this schema:
\`\`\`typescript
const schema = z.object({
  depth: z.coerce.number().max(10),
  clarity: z.coerce.number().max(10),
  relevance: z.coerce.number().max(10),
  comments: z.string()
});
\`\`\`

The following will be the question, asked by the AI, and then the users answer, transcripted by another service.
`.trim()
			},
			...questions.flatMap(
				({ question, transcript }) =>
					[
						{
							role: 'user',
							content: question
						},
						{ role: 'system', content: transcript }
					] as const
			)
		],
		model: 'llama-3.3-70b-versatile',
		temperature: 1,
		max_completion_tokens: 2048
	});

	const schema = z.object({
		depth: z.coerce.number().max(10),
		clarity: z.coerce.number().max(10),
		relevance: z.coerce.number().max(10),
		comments: z.string()
	});

	const response = completion.choices[0].message
		.content!.replaceAll('```json', '')
		.replaceAll('```', '')
		.trim();

	return schema.parse(JSON.parse(response));
}
