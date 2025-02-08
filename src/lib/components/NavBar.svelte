<script lang="ts">
	import { theme } from '$lib/shared';
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import confidoLogo from '$lib/assets/confido-logo.svg'; 

	let { session } = $props();

	let firstSpin = $state(false);
	let secondSpin = $state(false);

	const handleSpinTransition = () => {
		if (firstSpin) {
			firstSpin = false;
			theme.value = theme.value === 'dark' ? 'light' : 'dark';
			secondSpin = true;
		} else {
			secondSpin = false;
		}
	};
</script>

<div class="fixed z-50 h-14 w-full border-b bg-bg-2 py-0.5">
	<div class="flex h-full items-center justify-between px-4">
		<a href="/" aria-label="Home">
			<img src="{confidoLogo}" alt="Confido Logo" class="h-10" /> 
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
			>
				<Fa
					icon={theme.value === 'dark' ? faSun : faMoon}
					class="{(firstSpin && 'animate-spin-slow-1') || (secondSpin && 'animate-spin-slow-2')} aspect-square text-themeicon"
				/>
			</button>
		</div>
	</div>
</div>
