import { browser } from '$app/environment';

export let theme = $state({ value: browser ? localStorage.getItem('theme') || 'light' : 'light' });

$effect.root(() => {
	$effect(() => {
		if (browser) {
			localStorage.setItem('theme', theme.value);
		}
	});
});
