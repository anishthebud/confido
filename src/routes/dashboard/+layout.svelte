<script lang="ts">
	import Sidebar from '$lib/components/SideBar.svelte';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import { navigating } from '$app/state';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	let { data, children } = $props();

	let { supabase, user } = $derived(data);

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			await goto('/auth/login');
		}
	}
</script>

<div class="flex">
	<Sidebar name={user!.user_metadata.display_name} email={user!.email} {handleLogout} />

	{#if !navigating.to}
		<main class="ml-48 mt-14 flex-1 p-6" in:fly={{ x: 20, duration: 300 }}>
			<Breadcrumbs />
			{@render children()}
		</main>
	{/if}
</div>
