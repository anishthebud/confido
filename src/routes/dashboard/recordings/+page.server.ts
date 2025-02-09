import type { PageServerLoad } from '../$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { supabase, user } }) => {
	if (user == null) {
		error(401, 'Unauthorized');
	}

	const { data: presentationsData, error: dbError } = await supabase
		.from('presentation')
		.select(`*, recording(*)`)
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	console.log(presentationsData);
	const recordingsData = presentationsData?.flatMap((presentation) => {
		return presentation.recording;
	});

	console.log(recordingsData);

	return { recordings: recordingsData };
};
