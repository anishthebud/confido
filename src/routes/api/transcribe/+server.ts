import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import { createClient } from '@deepgram/sdk';
import { DEEPGRAM_API_KEY } from '$env/static/private';
import { pinata } from '$lib/server/pinata';

export const POST: RequestHandler = async ({ request }) => {
	console.log('hi????');
	const schema = z.object({
		ipfsHash: z.string()
	});

	const { ipfsHash } = schema.parse(JSON.parse(await request.text()));
	const deepgram = createClient(DEEPGRAM_API_KEY);

	const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
	console.log(url);

	const { result, error: err } = await deepgram.listen.prerecorded.transcribeUrl(
		{ url },
		{
			model: 'nova-2',
			language: 'en',
			filler_words: true
		}
	);

	console.log({ result, err });

	if (err) {
		return error(501);
	}

	console.dir(result, { depth: null });

	const { transcript, words } = result.results.channels[0].alternatives[0];
	return json({ transcript, words });
};
