<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';
	import type { PageProps } from './$types.js';
	import Question from './Question.svelte';

	let { data }: PageProps = $props();
	let presentation = $derived(data.presentation);
	let questions = $derived(data.recording.questions);
	let is_recorded = $state(questions.map(() => false));

	let slideIndex: number = $state(0);
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<h4>Present</h4>
	</div>

	<div class="flex flex-col gap-4">
		<div class="flex gap-4 justify-between">
			<div class="p-6 rounded border bg-bg-2">
				<div class="flex flex-col gap-y-3">
					<h5>Slides</h5>
					<button
						onclick={() => (slideIndex = (slideIndex + 1) % presentation.slides.length)}
						class="overflow-hidden rounded cursor-pointer aspect-video h-[460px]"
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
			<div class="overflow-y-scroll p-6 w-full rounded border bg-bg-2">
				<form class="flex flex-col gap-y-8" enctype="multipart/form-data" method="post">
					{#each questions as question, i}
						<Question
							text={question.question_text}
							cid={question.question_cid}
							form_name="audio{i}"
							on_record={() => console.log((is_recorded[i] = true))}
						/>
					{/each}

					<button type="submit" class="py-16" disabled={!is_recorded.every(Boolean)}>Submit</button>
					{JSON.stringify(is_recorded)}
				</form>
			</div>
		</div>
	</div>
</div>
