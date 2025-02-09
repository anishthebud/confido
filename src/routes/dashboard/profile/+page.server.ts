import type { PageServerLoad } from './$types';
import { error, json } from '@sveltejs/kit';

export const load = (async ({ locals: { user, supabase } }) => {
    if (user == null) {
        error(401, 'Unauthorized');
    }

    // Fetch data about scores and dates
    interface scoreItem {
        created_at: Date,
        score: number
    }

    const scoreFrom = await supabase
        .from('recording')
        .select('*')
        .eq('user_id', user.id)

    if (!user) {
        return;
    }


    let scoreItems: scoreItem[] = [];
    // Step 1: Score Items
    if (!scoreFrom.data) {
        scoreItems = [];
    } else {
        scoreItems = await Promise.all (scoreFrom.data.map (async (point) => {
            const toDate: Date = new Date(point.created_at);
            // Number 
            const scoreNum = [
                Object.values(point.question_score || {}),
                Object.values(point.recording_score || {})
            ].reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0) + 20;
            return {created_at: toDate, score: scoreNum} as scoreItem;
        }))
	};

    scoreItems.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

    // Step 2: Average Socre
    const averageScore = (scoreItems.reduce((sum, item) => sum + Number(item.score), 0) / scoreItems.length).toFixed(1);

    // Step 3: Badges
    interface Badge {
        created_at: Date,
        name: string,
        image_url: string
    }

    const badgeQuery = await supabase
        .from("usersAndBadges")
        .select('*')
        .eq("user_id", user.id)

    let badges: Badge[] = [];

    if (!badgeQuery.data) {
        badges = [];
    } else {
        badges = await Promise.all (badgeQuery.data.map(async (badge) => {
            const badgeInfo = await supabase
                .from("badge")
                .select()
                .eq("id", badge.badge_id)
                .single()
            if (badgeInfo.data == null) {
                return {created_at: new Date(), name: "", image_url: ""};
            }
            return {created_at: new Date(badge.created_at), name: badgeInfo.data.name, image_url: badgeInfo.data.image_url} as Badge;
        }))
    };

    const users_name = user.email;

    console.log(averageScore);

    return {
        scoreItems,
        averageScore,
        badges,
        users_name
    }
}) satisfies PageServerLoad;