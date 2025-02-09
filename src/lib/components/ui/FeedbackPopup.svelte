<script lang="ts">
	import { lionAvatar } from '$lib/assets';
	import { goto } from '$app/navigation';

	export let score = 85;
	export let feedback =
		'Great job on your presentation! Your pace was excellent and your points were clear. Consider adding more vocal variety to enhance engagement.';
	export let recordingId: string;

	function getScoreColor(score: number): string {
		if (score >= 90) return 'text-emerald-400';
		if (score >= 70) return 'text-cyan-400';
		return 'text-amber-400';
	}

	const currentDateTime = '2025-02-08 17:17:08';
	const currentUser = 'nverma61';
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
	<!-- Header with date and user info -->
	<div class="w-full bg-black/20 p-3 text-sm text-white/80">
		<div class="mx-auto flex max-w-4xl justify-between">
			<span>UTC: {currentDateTime}</span>
			<span>User: {currentUser}</span>
		</div>
	</div>

	<!-- Main content with proper spacing -->
	<div class="mx-auto max-w-4xl space-y-12 p-8 pt-16">
		<div class="space-y-8 text-center">
			<h1
				class="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-5xl font-bold text-transparent"
			>
				Presentation Completed!
			</h1>
			<div class="text-8xl font-bold {getScoreColor(score)}">
				{score}/100
			</div>
		</div>

		<div
			class="mt-12 flex items-start gap-6 rounded-xl bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 backdrop-blur-sm"
		>
			<img
				src={lionAvatar}
				alt="AI Coach"
				class="shadow-glow h-24 w-24 flex-shrink-0 rounded-full border-4 border-cyan-400"
			/>
			<div class="relative flex-grow">
				<!-- Speech bubble triangle -->
				<div
					class="absolute left-[-20px] top-8 h-0 w-0
                             border-b-[10px] border-r-[20px]
                             border-t-[10px] border-b-transparent
                             border-r-cyan-200/20 border-t-transparent"
				></div>

				<!-- Feedback text -->
				<div
					class="rounded-2xl bg-gradient-to-r from-cyan-200/20 to-blue-200/20 p-8 text-xl leading-relaxed text-white shadow-lg backdrop-blur-sm"
				>
					{feedback}
				</div>
			</div>
		</div>

		<div class="pt-8 text-center">
			<a
				href="/dashboard/recordings/{recordingId}/view"
				class="transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-12 py-5 text-xl font-bold
                         text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cyan-300
                         hover:to-blue-400 hover:shadow-cyan-500/50"
			>
				Continue
			</a>
		</div>
	</div>
</div>

<style>
	.shadow-glow {
		box-shadow: 0 0 15px theme('colors.cyan.400');
	}
</style>
