import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params, locals: { supabase, user } }) => {
	if (!user) {
		error(401, 'Unauthorized');
	}

	const { data: recordingData, error: dbError } = await supabase
		.from('recording')
		.select()
		.eq('id', params.recordingId);

	if (dbError) {
		error(502);
	}

	return { recording: recordingData };
};
