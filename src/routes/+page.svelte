<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let user = $derived(data.user);

	onMount(() => {
		if (user) {
			goto('/dashboard/');
		} else {
			goto('/auth/login');
		}
	});
</script>
