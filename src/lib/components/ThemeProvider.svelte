<script lang="ts">
	import { theme } from '$lib/shared';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (theme.value === 'system') {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				theme.value = 'dark';
			} else {
				theme.value = 'dark';
			}
		}
	});
	$effect(() => {
		if (theme.value === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
		}
	});
</script>

{@render children()}
