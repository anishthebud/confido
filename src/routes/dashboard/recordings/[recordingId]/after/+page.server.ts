import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, user } }) => {
	const presentationData = await supabase
		.from('presentation')
		.select()
		.eq('id', params.presentationId);
	const recordingData = await supabase
		.from('recording')
		.select()
		.eq('presentationId', params.presentationId);

	const badge_ids: string[] = [];

	const scoreFrom = await supabase.from('recording').select().eq('id', params.recordingId).single();
	if (!scoreFrom.data || !user) {
		return;
	}

	const user_id = user.id;
	const scoreNum = [
		...Object.values(scoreFrom.data.question_score || {}),
		...Object.values(scoreFrom.data.recording_score || {})
	].reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0) + 20;

	let scoreInt = parseInt(scoreNum);
	/* Conditional logic for presentations */
	const { data, count } = await supabase
		.from('presentation')
		.select('*', { count: 'exact' })
		.eq('user_id', user_id);
	if (count == 5) {
		badge_ids.push('358fb80c-561c-4987-952d-1619045d2cbd');
	} else if (count == 3) {
		badge_ids.push('283b15e8-f1bd-49e8-adbe-25c935b31cbd');
	} else if (count == 1) {
		badge_ids.push('df95531c-649c-45e0-af10-b50bd5705c81');
	}
	/* Conditional logic for scores */
	if (scoreInt == 100) {
		const { data, count } = await supabase
			.from('recording')
			.select('*', { count: 'exact' })
			.eq('score', 100)
			.eq('user_id', user_id);
		if (count == 5) {
			badge_ids.push('ce454cef-2b2b-415c-a075-19f674065b22');
		} else if (count == 3) {
			badge_ids.push('05b1653a-b007-4287-a595-8011e2fd5512');
		} else if (count == 1) {
			badge_ids.push('c34b8f0a-2677-4ef8-9eb7-b33a828ce529');
		}
	} else if (scoreInt >= 80) {
		const { data, count } = await supabase
			.from('recording')
			.select('*', { count: 'exact' })
			.eq('score', 80)
			.eq('user_id', user_id);
		if (count == 5) {
			badge_ids.push('408811a6-7ff3-4db9-a6ad-4a69d4a50958');
		} else if (count == 3) {
			badge_ids.push('72b127a1-ddb8-4039-99f6-e4476d9c51f0');
		} else if (count == 1) {
			badge_ids.push('51726161-0a55-4287-a471-9b968f99c82c');
		}
	} else if (scoreInt >= 50) {
		const { data, count } = await supabase
			.from('recording')
			.select('*', { count: 'exact' })
			.gte('score', 50)
			.eq('user_id', user_id);
		if (count == 5) {
			badge_ids.push('a485feb1-7678-4e8b-815d-7ea6e51b87b7');
		} else if (count == 3) {
			badge_ids.push('ed75f3e8-5e29-4d75-bd32-404cf046a71d');
		} else if (count == 1) {
			badge_ids.push('c66b0d76-778d-4e60-a456-160aad86e466');
		}
	}

	interface Badge {
		name: string;
		image_url: string;
		description: string;
	}

	const earnedBadges = await Promise.all (badge_ids.map(async (badge_id) => {
		const { data } = await supabase.from('badge').select().eq('id', badge_id).single();
		return data as Badge;
	}));

	return {
		presentation: presentationData ?? [],
		recording: recordingData ?? [],
		earnedBadges,
		scoreInt,
		comments: (scoreFrom.data.recording_score as any).comments as string
	};
}) satisfies PageServerLoad;