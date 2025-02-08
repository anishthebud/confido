<script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Navbar } from '$lib/components';
	import '../app.css';
	import { goto } from '$app/navigation';
	import ThemeProvider from '$lib/components/ThemeProvider.svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => {
			console.log('Cleaning up auth listener');
			data.subscription.unsubscribe();
		};
	});
</script>

<ThemeProvider>
	<Navbar {session} />
	{@render children()}
</ThemeProvider>
