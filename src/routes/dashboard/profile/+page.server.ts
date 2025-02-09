import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

interface ScoreItem {
    created_at: Date;
    score: number;
}

interface Badge {
    created_at: Date;
    name: string;
    image_url: string;
}

export const load = (async ({ locals: { user, supabase } }) => {
    if (!user) {
        console.log("No user found, throwing unauthorized error");
        throw error(401, 'Unauthorized');
    }

    // Fetch presentation data
    const scoreFrom = await supabase
        .from('presentation')
        .select('*, recording(*)')
        .eq('user_id', user.id);

    console.log("Fetched Presentations:", scoreFrom.data);

    if (!scoreFrom.data) {
        console.log("Error: Failed to fetch presentation data");
        throw error(500, 'Failed to fetch presentation data');
    }

    // Step 1: Process Score Items
    const scoreItems: ScoreItem[] = (await Promise.all(
        scoreFrom.data.map(async (point) => {
            if (!point.recording || point.recording.length === 0) {
                console.log("No recordings found for presentation:", point);
                return [];
            }

            return point.recording.map(record => {
                console.log("Processing Recording:", record);

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
    )).flat();

    console.log("Final Score Items:", scoreItems);
    console.log("Total Presentations Count:", scoreItems.length);

    // Sort score items by date
    scoreItems.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

    console.log('Sorted Score Items:', scoreItems);

    // Step 2: Calculate Average Score
    let averageScore = '0.0';
    if (scoreItems.length > 0) {
        const sum = scoreItems.reduce((acc, item) => acc + item.score, 0);
        averageScore = (sum / scoreItems.length).toFixed(1);
    }

    console.log('Average Score:', averageScore);

    // Step 3: Fetch Badges
    const badgeQuery = await supabase
        .from('usersAndBadges')
        .select('*')
        .eq('user_id', user.id);

    console.log("Fetched Badge Data:", badgeQuery.data);

    if (!badgeQuery.data) {
        console.log("Error: Failed to fetch badge data");
        throw error(500, 'Failed to fetch badge data');
    }

    const badges: Badge[] = await Promise.all(
        badgeQuery.data.map(async (badge) => {
            console.log("Processing Badge:", badge);
            
            const badgeInfo = await supabase
                .from('badge')
                .select()
                .eq('id', badge.badge_id)
                .single();

            console.log("Fetched Badge Info:", badgeInfo.data);

            if (!badgeInfo.data) {
                return {
                    created_at: new Date(badge.created_at),
                    name: 'Unknown Badge',
                    image_url: ''
                };
            }

            return {
                created_at: new Date(badge.created_at),
                name: badgeInfo.data.name,
                image_url: badgeInfo.data.image_url
            };
        })
    );

    console.log("Final Badges:", badges);

    const returnData = {
        scoreItems,
        averageScore,
        badges,
        users_name: user.email
    };

    console.log("Returning Data:", returnData);

    return returnData;
}) satisfies PageServerLoad;
