<script>
	import { lionAvatar } from '$lib/assets';
	import { FeatureCard } from '$lib/components';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { curves } from '$lib/assets';
	import Fa from 'svelte-fa';
	import { scale } from 'svelte/transition';
</script>

<img class="absolute -z-50 h-full w-full opacity-30" alt="curves" src={curves} />
<div class="flex flex-col px-32 py-16">
	<div class="grid h-[80vh] items-center md:grid-cols-2">
		<div class="flex flex-col gap-y-4">
			<h1 class="mb-2 text-5xl font-bold text-text-1">
				Boost Your <span class="bg-blue-500 px-1.5 pb-2 text-white">Speaking Skills</span> with AI
			</h1>
			<p class="text-lg text-text-3">
				Practice conversations with our AI tools and get personalized feedback to become a more
				confident speaker.
			</p>
			<a href="/auth/sign-up" class="btn-primary gap-x-2 self-start px-3"
				>Get Started <Fa icon={faArrowRight} />
			</a>
		</div>
		<div class="flex w-full items-center justify-center">
			<img
				src={lionAvatar}
				alt="AI Conversation Assistant"
				class="h-full w-full rounded-xl object-cover"
				width="200"
				height="200"
			/>
		</div>
	</div>

	<div class="mt-32 flex flex-col gap-y-8">
		<h3 class="text-center">Why Choose Confido?</h3>

		<div class="grid grid-cols-3 gap-8">
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
