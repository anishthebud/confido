import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBadges } from '$lib/badges/badges.server';

export const load = (async ({ params, locals: { supabase, user } }) => {
	if (!user) throw error(401);

	// Fetch score data
	const { data: recording } = await supabase
		.from('recording')
		.select()
		.eq('id', params.recordingId)
		.single();

	if (!recording) throw error(404);

	const badges = await getBadges(user.id, supabase);

	const questionScore = recording.question_score
		? Object.entries(recording.question_score)
				.filter(([key]) => ['depth', 'clarity', 'relevance'].includes(key))
				.reduce((sum, [_, value]) => sum + (typeof value === 'number' ? value : 0), 0)
		: 0;

	const recordingScore = recording.recording_score
		? Object.entries(recording.recording_score)
				.filter(([key]) => ['pacing', 'clarity', 'delivery', 'engagement'].includes(key))
				.reduce((sum, [_, value]) => sum + (typeof value === 'number' ? value : 0), 0)
		: 0;

	const totalScore = questionScore + recordingScore + 20;

	return {
		recording,
		comments: (recording.recording_score as any).comments as string,
		badges,
		totalScore
	};
}) satisfies PageServerLoad;
