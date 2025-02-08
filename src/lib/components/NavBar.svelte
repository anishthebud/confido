<script lang="ts">
	import { theme } from '$lib/shared';
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	let { session } = $props();

	let firstSpin = $state(false);
	let secondSpin = $state(false);

	const handleSpinTransition = () => {
		if (firstSpin) {
			firstSpin = false;
			if (theme.value === 'dark') {
				theme.value = 'light';
			} else {
				theme.value = 'dark';
			}

			secondSpin = true;
		} else {
			secondSpin = false;
		}
	};
</script>

<div class="fixed z-50 h-14 w-full border-b bg-bg-2 py-0.5">
	<div class="flex h-full items-center justify-between px-4">
		<a href="/" aria-label="Home">
      logo
		</a>
		<div class="flex gap-x-3">
			{#if !session}
				<a href="/auth/login" class="btn-primary h-8 px-3">Login</a>
				<a href="/auth/sign-up" class="btn-secondary h-8 px-3">Sign Up</a>
			{/if}
			<button
				class="flex aspect-square h-8 items-center justify-center rounded hover:bg-btn-hover"
				onclick={() => {
					if (!firstSpin && !secondSpin) {
						firstSpin = true;
					}
				}}
				onanimationend={handleSpinTransition}
				><Fa
					icon={theme.value === 'dark' ? faSun : faMoon}
					class="{(firstSpin && 'animate-spin-slow-1') ||
						(secondSpin && 'animate-spin-slow-2')} aspect-square text-themeicon"
				/></button
			>
		</div>
	</div>
</div>
