<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	interface Badge {
		name: string;
		image_url: string;
		description: string;
	}

	const {
		score,
		presentationCount,
		onShowFeedback,
		earnedBadges
	}: {
		score: number;
		presentationCount: number;
		onShowFeedback: () => void;
		earnedBadges: Badge[];
	} = $props();
</script>

<div class="flex fixed inset-0 z-50 justify-center items-center bg-black/50" in:fade>
	<div
		class="p-8 mx-4 w-full max-w-2xl text-white bg-gradient-to-b from-purple-600 to-blue-600 rounded-2xl shadow-2xl"
		in:fly={{ y: 20, duration: 800 }}
	>
		<div class="text-center">
			<h1 class="mb-2 text-4xl font-bold text-yellow-300 animate-bounce">🎉 Congratulations! 🎉</h1>
			<p class="mb-8 text-xl font-bold text-blue-100">You have earned the following badges:</p>

			<div class="grid grid-cols-2 gap-6 mb-8 md:grid-cols-3">
				{#each earnedBadges as badge}
					<div
						class="p-4 rounded-xl transition-transform transform hover:scale-105 bg-white/10 backdrop-blur-sm"
						in:fly={{ y: 20, duration: 800, delay: 200 }}
					>
						<img src={badge.image_url} alt={badge.name} class="mx-auto w-24 h-24" />
					</div>
				{/each}
			</div>

			<button
				class="flex gap-2 items-center py-3 px-8 mx-auto text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-50"
				onclick={onShowFeedback}
			>
				View Feedback
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>
		</div>
	</div>
</div>

