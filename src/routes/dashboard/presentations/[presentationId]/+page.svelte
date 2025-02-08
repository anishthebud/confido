<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';
	import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	let { data } = $props();
	let presentation = $derived(data.presentation);

	let slideIndex: number = $state(0);

	let media = [];
	let mediaRecorder = null;
	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (e) => media.push(e.data);
	});
  function handleToggleRecording() {}
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<h4>Present</h4>
	</div>

	<div class="flex flex-col gap-4">
		<div class="flex justify-between gap-4">
			<div class="rounded border bg-bg-2 p-6">
				<div class="flex flex-col gap-y-3">
					<h5>Slides</h5>
					<button
						onclick={() => (slideIndex = (slideIndex + 1) % presentation.slides.length)}
						class="aspect-video h-[460px] cursor-pointer overflow-hidden rounded"
					>
						<Slide slide={presentation.slides[slideIndex]} />
					</button>
					<div class="grid grid-cols-4 gap-3">
						{#each presentation.slides.slice(presentation.slides.length > 4 ? Math.max(slideIndex - 1, 0) : 0, slideIndex + 4) as slide, i}
							<button
								class="aspect-video w-full overflow-hidden rounded {slideIndex == i
									? 'ring-2 ring-orange-400'
									: 'ring-orange-500 hover:ring-2 hover:ring-orange-400/30'} duration-200"
								onclick={() => {
									slideIndex = i;
								}}
							>
								<Slide {slide} />
							</button>
						{/each}
					</div>
				</div>
			</div>
			<div class="w-full overflow-y-scroll rounded border bg-bg-2 p-6">
				<div class="flex flex-col gap-y-3">
					<h5>Explanation</h5>
					<p class="h-[600px] overflow-y-scroll">
						{presentation.explanation}
					</p>
				</div>
			</div>
		</div>
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex items-center">
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-text-4 duration-200 hover:scale-105"
					onclick={handleToggleRecording}><Fa icon={faMicrophone} /></button
				>
			</div>
		</div>
	</div>
</div>
