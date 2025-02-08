import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					display_name: name
				}
			}
		});
		if (error) {
			return fail(400, { error: error.message });
		} else {
			redirect(303, '/dashboard/');
		}
	}
};
