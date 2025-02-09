<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';
	import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { PageProps } from './$types.js';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();
	let presentation = $derived(data.presentation);

	let slideIndex: number = $state(0);

	let media = $state([] as Blob[]);
	let mediaRecorder: MediaRecorder | null = null;
	onMount(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.ondataavailable = (e) => {
				if (e.data && e.data.size > 0) {
					media.push(e.data);
				}
			};
		} catch (error) {
			console.error('Error accessing microphone:', error);
		}
	});

	let isRecording = $state(false);
	function handleToggleRecording(e: any) {
		console.log(e);
		if (!mediaRecorder) {
			return;
		}

		if (!isRecording) {
			mediaRecorder.start();
			console.log('Recording started');
		} else {
			mediaRecorder.stop();
			console.log('Recording stopped');
		}

		isRecording = !isRecording;
	}
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
				<div class="flex flex-col gap-y-3">
					<h5>Explanation</h5>
					<p class="overflow-y-scroll h-[600px]">
						{presentation.explanation}
					</p>

					<div class="flex items-center">
						<form
							method="post"
							enctype="multipart/form-data"
							use:enhance={({ formData }) => {
								console.log(isRecording);
								if (media.length === 0) return;

								const audioBlob = new Blob(media, { type: 'audio/webm' });
								const audioFile = new File([audioBlob], 'recording.webm');

								formData.append('audio', audioFile);

								return async ({ update }) => {
									media = [];
									await update();
								};
							}}
							class="flex flex-row justify-between w-full"
						>
							<button
								class="flex h-10 flex-row items-center justify-center gap-x-4 rounded-full px-4 text-text-4 duration-200 hover:scale-105 {isRecording
									? 'bg-green-500'
									: 'bg-red-500'}"
								onclick={handleToggleRecording}
								type="button"
							>
								<Fa icon={faMicrophone} />
								{isRecording ? 'End Recording' : 'Start Recording'}
							</button>

							<button
								class="flex flex-row gap-x-4 justify-center items-center px-4 h-10 bg-emerald-500 rounded-full duration-200 hover:scale-105 disabled:bg-green-300 text-text-4"
								type="submit"
								disabled={media.length === 0 && !isRecording}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
