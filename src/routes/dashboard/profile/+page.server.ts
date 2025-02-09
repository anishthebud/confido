import { getBadges } from '$lib/badges/badges.server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface ScoreItem {
	created_at: Date;
	score: number;
}

export const load = (async ({ locals: { user, supabase } }) => {
	if (!user) {
		error(401, 'Unauthorized');
	}

	const presentations = await supabase
		.from('presentation')
		.select('*, recording(*)')
		.eq('user_id', user.id);

	if (!presentations.data) {
		throw error(500, 'Failed to fetch presentation data');
	}

	const scoreItems: ScoreItem[] = (
		await Promise.all(
			presentations.data.map(async (point) => {
				if (!point.recording || point.recording.length === 0) {
					return [];
				}

				return point.recording.map((record) => {
					const toDate = new Date(record.created_at);

					// Get question scores
					const questionScore = record.question_score
						? Object.entries(record.question_score)
								.filter(([key]) => ['depth', 'clarity', 'relevance'].includes(key))
								.reduce((sum, [_, value]) => sum + (typeof value === 'number' ? value : 0), 0)
						: 0;

					// Get recording scores
					const recordingScore = record.recording_score
						? Object.entries(record.recording_score)
								.filter(([key]) => ['pacing', 'clarity', 'delivery', 'engagement'].includes(key))
								.reduce((sum, [_, value]) => sum + (typeof value === 'number' ? value : 0), 0)
						: 0;

					const totalScore = questionScore + recordingScore + 20;

					return {
						created_at: toDate,
						score: totalScore
					};
				});
			})
		)
	).flat();

	scoreItems.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

	let averageScore = '0.0';
	if (scoreItems.length > 0) {
		const sum = scoreItems.reduce((acc, item) => acc + item.score, 0);
		averageScore = (sum / scoreItems.length).toFixed(1);
	}

	const badges = await getBadges(user.id, supabase);

	return {
		scoreItems,
		averageScore,
		badges,
		users_name: user.email
	};
}) satisfies PageServerLoad;
