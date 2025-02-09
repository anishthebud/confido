import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, user } }) => {
    if (!user) return;

    try {
        // Fetch recording data
        console.log("🔄 Fetching recording data...");
        const recordingData = await supabase
            .from('recording')
            .select()
            .eq('recordingId', params.recordingId);

        // Fetch score data
        const scoreFrom = await supabase.from('recording').select().eq('id', params.recordingId).single();
        if (!scoreFrom.data) return;

        const user_id = user.id;
        const badge_ids: string[] = [];

        // Log presentation count fetch
        console.log("🔄 Fetching total presentations count...");
        const { count: presentationCount, error: presentationError } = await supabase
            .from('presentation')
            .select('*', { count: 'exact' })
            .eq('user_id', user_id);

        if (presentationError) {
            console.error("❌ Error fetching presentations count:", presentationError);
            return;
        }

        console.log(`📊 Total Presentations Count: ${presentationCount}`);

        // Apply presentation badges based on count
        if (presentationCount === 5) {
            badge_ids.push('358fb80c-561c-4987-952d-1619045d2cbd');
            console.log("🏅 Assigned badge for 5 presentations");
        } else if (presentationCount === 3) {
            badge_ids.push('283b15e8-f1bd-49e8-adbe-25c935b31cbd');
            console.log("🏅 Assigned badge for 3 presentations");
        } else if (presentationCount === 1) {
            badge_ids.push('df95531c-649c-45e0-af10-b50bd5705c81');
            console.log("🏅 Assigned badge for 1 presentation");
        } else {
            console.log("🔴 No presentation badges assigned");
        }

        // Log score fetch
        console.log("🔄 Fetching all scores...");
        const { data: scoreData, error: scoreError } = await supabase
            .from('recording')
            .select('score, created_at')
            .eq('user_id', user_id);

        if (scoreError) {
            console.error("❌ Error fetching scores:", scoreError);
            return;
        }

        console.log("📈 Score Items:", scoreData);

        // Calculate average score
        const totalScore = scoreData.reduce((sum, r) => sum + (r.score || 0), 0);
        const avgScore = totalScore / scoreData.length;

        console.log(`🎯 Average Score: ${avgScore}`);

        // Apply score-based badges
        if (avgScore >= 100) {
            badge_ids.push('ce454cef-2b2b-415c-a075-19f674065b22');
            console.log("🏅 Assigned badge for 100+ average score");
        } else if (avgScore >= 80) {
            badge_ids.push('408811a6-7ff3-4db9-a6ad-4a69d4a50958');
            console.log("🏅 Assigned badge for 80+ average score");
        } else if (avgScore >= 50) {
            badge_ids.push('a485feb1-7678-4e8b-815d-7ea6e51b87b7');
            console.log("🏅 Assigned badge for 50+ average score");
        } else {
            console.log("🔴 No score-based badges assigned");
        }

        // Log badge assignment before filtering
        console.log(`🏅 Badges Before Filtering: ${badge_ids}`);

        // If no badges were added, log this condition
        if (badge_ids.length === 0) {
            console.log("🔴 No badges assigned to badge_ids");
        }

        // Fetch existing badges assigned to user
        console.log("🔄 Fetching existing badges...");
        const { data: existingBadges, error: existingBadgeError } = await supabase
            .from('usersAndBadges')
            .select('badge_id')
            .eq('user_id', user_id);

        if (existingBadgeError) {
            console.error("❌ Error fetching existing badges:", existingBadgeError);
            return;
        }

        const existingBadgeIds = existingBadges?.map((b) => b.badge_id) || [];
        console.log(`🏅 Existing Badges: ${existingBadgeIds}`);

        // Filter out already assigned badges
        const newBadgeIds = badge_ids.filter((id) => !existingBadgeIds.includes(id));
        console.log(`🏅 New Badges to Insert: ${newBadgeIds}`);

        // Insert new badges
        if (newBadgeIds.length > 0) {
            console.log("🔄 Inserting new badges...");
            const { error: insertError } = await supabase.from('usersAndBadges').insert(
                newBadgeIds.map((badge_id) => ({
                    user_id: user.id,
                    badge_id: badge_id
                }))
            );

            if (insertError) {
                console.error("❌ Error inserting badges:", insertError);
                return;
            } else {
                console.log("✅ Badges inserted successfully");
            }
        } else {
            console.log("🔴 No new badges to insert (all badges already assigned)");
        }

        // Fetch final earned badges
        console.log("🔄 Fetching final earned badges...");
        const { data: earnedBadges, error: badgeFetchError } = await supabase
            .from('badge')
            .select()
            .in('id', [...existingBadgeIds, ...newBadgeIds]);

        if (badgeFetchError) {
            console.error("❌ Error fetching final badges:", badgeFetchError);
            return;
        }

        console.log(`🏅 Final Earned Badges: ${earnedBadges}`);

        return {
            recording: recordingData ?? [],
            earnedBadges,
            scoreInt: avgScore,
            comments: (scoreFrom.data.recording_score as any).comments as string
        };

    } catch (error) {
        console.error("❌ Unexpected Error:", error);
        return;
    }
}) satisfies PageServerLoad;
