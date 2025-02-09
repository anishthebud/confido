<script>
	import { lionAvatar } from '$lib/assets';
	import { FeatureCard } from '$lib/components';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { curves } from '$lib/assets';
	import Fa from 'svelte-fa';
</script>

<div>
	<div class="flex flex-col">
		<div
			class="grid h-[100vh] items-center bg-gradient-to-b from-transparent via-purple-600/80 to-transparent to-100% px-32 md:grid-cols-2"
		>
			<div class="flex flex-col gap-y-6 text-white">
				<h1 class="mb-2 text-5xl font-bold">
					<span class="text-white">Boost Your</span>
					<span class="relative">
						<span
							class="relative z-10 bg-gradient-to-r from-yellow-400 to-yellow-400 bg-clip-text px-1.5 pb-2 text-transparent"
						>
							Speaking Skills
						</span>
						<span class="absolute bottom-0 left-0 -z-10 h-3 w-full bg-white/20 blur-sm"></span>
					</span> <span class="text-white">with</span>
					<span class="bg-gradient-to-r from-yellow-400 to-yellow-400 bg-clip-text text-transparent"
						>Confido,</span
					> <span class="text-white">your personal</span>
					<span class="bg-gradient-to-r from-yellow-400 to-yellow-400 bg-clip-text text-transparent"
						>AI speech coach</span
					>
				</h1>
				<p class="text-lg text-white/80">
					Practice conversations with Confido to get personalized feedback to become a more
					confident speaker.
				</p>
				<a
					href="/auth/sign-up"
					class="btn group relative w-fit overflow-hidden rounded-lg bg-white px-6 py-3 font-semibold text-purple-700 transition-all hover:scale-105 hover:shadow-lg"
				>
					<span class="relative z-10 flex items-center gap-2">
						Get Started <Fa
							icon={faArrowRight}
							class="transition-transform group-hover:translate-x-1"
						/>
					</span>
					<div
						class="absolute inset-0 -z-0 bg-gradient-to-r from-purple-200 to-indigo-200 opacity-0 transition-opacity group-hover:opacity-100"
					></div>
				</a>
			</div>
			<div class="mb-96 flex w-full items-center justify-center">
				<div class="relative">
					<div
						class="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 opacity-75 blur-lg"
					></div>
					<div
						class="animation-delay-1000 absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 opacity-75 blur-lg"
					></div>
					<img
						src={lionAvatar}
						alt="AI Conversation Assistant"
						class="relative h-[400px] w-[400px] object-cover"
						width="400"
						height="400"
					/>
				</div>
			</div>
		</div>

		<div class="mt-12 flex w-full items-center justify-center">
			<div class="left-1/2 h-0.5 w-1/2 bg-border"></div>
		</div>

		<div class="mb-32 mt-32 flex flex-col gap-y-8 px-32">
			<h3 class="text-center text-text-1">Why Choose Confido?</h3>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<FeatureCard
					icon={{
						svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
					}}
					title="Natural Conversations"
					description="Practice with our AI that understands context and responds naturally, just like a real conversation."
				/>
				<FeatureCard
					icon={{
						svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5h3a2.5 2.5 0 0 1 2.5 2.5V12a2.5 2.5 0 0 1-5 0V9z"/><path d="M19.5 9H18"/><path d="M4.5 14H6"/><path d="M18 14h1.5a2.5 2.5 0 0 1 0 5h-3a2.5 2.5 0 0 1-2.5-2.5V12a2.5 2.5 0 0 1 5 0v2z"/></svg>`
					}}
					title="Instant Feedback"
					description="Get immediate, constructive feedback on your speaking style, pace, clarity, and more."
				/>
				<FeatureCard
					icon={{
						svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
					}}
					title="Personalized Growth"
					description="Track your progress through earning achievements when accomplishing speaking goals."
				/>
			</div>
		</div>
	</div>
</div>
