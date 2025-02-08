<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';

	let { data } = $props();
	let presentation = $derived(data.presentation);

	let slideIndex: number = $state(0);
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<h4>Present</h4>
	</div>

	<div class="flex justify-between gap-4">
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex flex-col gap-y-3">
				<div class="aspect-video h-[520px] overflow-hidden rounded">
					<Slide slide={presentation.slides[slideIndex]} />
				</div>
				<div class="grid grid-cols-4 gap-3">
					{#each presentation.slides.slice(presentation.slides.length > 4 ? slideIndex : 0, slideIndex + 4) as slide, i}
						<button
							class="aspect-video w-full overflow-hidden rounded {slideIndex == i
								? 'ring-2 ring-blue-400'
								: 'ring-blue-400 hover:ring-2 hover:ring-blue-400/30'} duration-200"
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
				<p class="h-[420px] overflow-y-scroll">
					{presentation.explanation}
				</p>
			</div>
		</div>
	</div>
</div>
