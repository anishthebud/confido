<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';
	import type { PageProps } from './$types.js';
	import Question from './Question.svelte';

	let { data }: PageProps = $props();
	let presentation = $derived(data.presentation);
	let questions = $derived(data.recording.questions);
	let is_recorded = $state(data.recording.questions.map(() => false));

	let slideIndex: number = $state(0);
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
			<div class="w-full min-w-64 gap-y-3 overflow-y-scroll rounded border bg-bg-2 p-6">
				<div class="flex h-full flex-col gap-y-3">
					<h5>Questions</h5>
					<form
						class="flex h-full flex-col justify-between gap-y-8"
						enctype="multipart/form-data"
						method="post"
					>
						<div class="flex flex-col gap-y-6">
							{#each questions as question, i}
								<Question
									text={question.question_text}
									cid={question.question_cid}
									form_name="audio{i}"
									on_record={() => console.log((is_recorded[i] = true))}
								/>
							{/each}
						</div>

						<button type="submit" class="btn-primary" disabled={!is_recorded.every(Boolean)}
							>Submit</button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
