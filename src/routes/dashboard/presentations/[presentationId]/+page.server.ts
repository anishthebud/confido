import type { PageServerLoad, Actions } from './$types';
import { error, json } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { user, supabase }, params }) => {
	if (user == null) {
		error(401, 'Unauthorized');
	}

	const { data: presentationData, error: dbError } = await supabase
		.from('presentation')
		.select()
		.eq('id', params.presentationId)
		.single();

	if (dbError) {
		error(500);
	}

	return { presentation: presentationData };
};

export const actions: Actions = {};
