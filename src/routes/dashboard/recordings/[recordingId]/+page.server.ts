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

	return {
		recording,
		comments: (recording.recording_score as any).comments as string,
		badges
	};
}) satisfies PageServerLoad;
