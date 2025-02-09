import type { SupabaseClient } from '@supabase/supabase-js';
import { type BadgeLevel, type BadgeType } from './badges';
import type { Database } from '$lib/supabase.types';
import { error } from '@sveltejs/kit';

export async function getBadges(userId: string, supabase: SupabaseClient<Database>) {
	const progress: Record<BadgeType, BadgeLevel> = {
		completion: undefined,
		perfect_score: undefined,
		above_average: undefined,
		average: undefined
	};

	const { data: presentations } = await supabase
		.from('presentation')
		.select('*, recording(*)')
		.eq('user_id', userId);

	if (!presentations) throw error(500);

	const scoreItems = (
		await Promise.all(
			presentations.map(async (point) => {
				if (!point.recording || point.recording.length === 0) {
					console.log('No recordings found for presentation:', point);
					return [];
				}

				return point.recording.map((record) => {
					console.log('Processing Recording:', record);

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

					console.log({
						created_at: toDate,
						questionScore,
						recordingScore,
						totalScore,
						question_score: record.question_score,
						recording_score: record.recording_score
					});

					return {
						created_at: toDate,
						score: totalScore
					};
				});
			})
		)
	).flat();

	const presentationCount = presentations.reduce((sum, { recording }) => sum + recording.length, 0);
	const averageScore = presentationCount
		? scoreItems.reduce((sum, item) => sum + item.score, 0) / presentationCount
		: 0;

	if (presentationCount >= 5) progress.completion = 'gold';
	else if (presentationCount >= 3) progress.completion = 'silver';
	else if (presentationCount >= 1) progress.completion = 'bronze';

	if (averageScore >= 100) {
		if (presentationCount >= 5) progress.perfect_score = 'gold';
		else if (presentationCount >= 3) progress.perfect_score = 'silver';
		else if (presentationCount >= 1) progress.perfect_score = 'bronze';
	} else if (averageScore >= 80) {
		if (presentationCount >= 5) progress.above_average = 'gold';
		else if (presentationCount >= 3) progress.above_average = 'silver';
		else if (presentationCount >= 1) progress.above_average = 'bronze';
	} else if (averageScore >= 50) {
		if (presentationCount >= 5) progress.average = 'gold';
		else if (presentationCount >= 3) progress.average = 'silver';
		else if (presentationCount >= 1) progress.average = 'bronze';
	}

	return progress;
}
