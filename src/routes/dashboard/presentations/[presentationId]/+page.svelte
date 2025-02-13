<script lang="ts">
	import Slide from '$lib/components/Slide.svelte';
	import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import type { PageProps } from './$types.js';
	import { enhance } from '$app/forms';
	import { AudioWave } from '$lib/components/';

	let { data }: PageProps = $props();
	let presentation = $derived(data.presentation);

	let slideIndex: number = $state(0);

	let media = $state([] as Blob[]);
	let mediaRecorder: MediaRecorder | null = null;
	let audioStream: MediaStream | null = $state(null);

	onMount(async () => {
		try {
			audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(audioStream);
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

	let loading: boolean = $state(false);
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
						class="overflow-hidden rounded cursor-pointer aspect-video h-[440px]"
					>
						<Slide slide={presentation.slides[slideIndex]} />
					</button>
					<div class="grid grid-cols-4 gap-3">
						{#each presentation.slides.slice(0, 4) as slide, i}
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
			<div class="p-6 w-full rounded border bg-bg-2">
				<div class="flex flex-col gap-y-3">
					<h5>Talking Points</h5>
					<p class="h-[560px] overflow-y-scroll">
						{presentation.explanation}
					</p>
				</div>
			</div>
		</div>
		<div class="flex gap-4 justify-between">
			<div class="p-3 w-full rounded border bg-bg-2">
				<AudioWave {audioStream} {isRecording} />
			</div>
			<div class="p-3 w-1/3 rounded border bg-bg-2">
				<form
					method="post"
					enctype="multipart/form-data"
					use:enhance={({ formData }) => {
						if (media.length === 0) return;
						loading = true;

						const audioBlob = new Blob(media, { type: 'audio/webm' });
						const audioFile = new File([audioBlob], 'recording.webm');

						formData.append('audio', audioFile);

						return async ({ update }) => {
							loading = false;
							media = [];
							await update();
						};
					}}
					class="flex gap-x-3 justify-between items-center w-full h-full"
				>
					<button
						class="flex h-8 cursor-pointer items-center gap-x-2 rounded px-3 text-sm font-semibold text-white duration-200 {isRecording
							? 'bg-red-500 hover:bg-red-400'
							: 'bg-green-500 hover:bg-green-400'}"
						onclick={handleToggleRecording}
						type="button"
					>
						<Fa icon={faMicrophone} />
						{isRecording ? 'End Recording' : 'Start Recording'}
					</button>

					<button
						class="px-3 btn-secondary"
						type="submit"
						disabled={media.length == 0 || isRecording || loading}
					>
						{#if loading}
							<svg class="h-5 w-5 animate-spin text-text-3" viewBox="0 0 24 24">
								<path
									class="fill-current"
									d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
									opacity=".25"
								/>
								<path
									class="fill-current"
									d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
								/>
							</svg>
						{:else}
							Submit
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
