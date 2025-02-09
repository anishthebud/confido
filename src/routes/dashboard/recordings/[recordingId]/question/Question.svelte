<script lang="ts">
	import { faMicrophone, faPause, faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	let {
		cid,
		text,
		form_name,
		on_record
	}: { form_name: string; cid: string; text: string; on_record: () => void } = $props();

	let input: HTMLInputElement | undefined = $state();
	let audio: HTMLAudioElement | undefined = $state();

	let media = $state([] as Blob[]);
	let mediaRecorder: MediaRecorder | null = null;

	let isPlaying: boolean = $state(false);

	onMount(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.ondataavailable = (e) => {
				if (e.data && e.data.size > 0) {
					media.push(e.data);
				}
			};

			mediaRecorder.onstop = (e) => {
				const audioBlob = new Blob(media, { type: 'audio/webm' });
				const file = new File([audioBlob], `${form_name}.webm`, { type: 'audio/webm' });
				const dataTransfer = new DataTransfer();
				dataTransfer.items.add(file);
				if (input) {
					input.files = dataTransfer.files;
				}
				on_record();
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

	function handleTogglePlaying() {
		if (isPlaying) {
			audio?.pause();
			isPlaying = false;
		} else {
			audio?.play();
			isPlaying = true;
		}
	}

	let percentage: number = $state(0);

	function handleTimeUpdate() {
		if (audio) {
			percentage = (audio.currentTime / audio.duration) * 100;
		}
		if (percentage == 100) {
			isPlaying = false;
		}
	}
</script>

<div class="flex flex-col gap-y-4">
	<div class="relative h-1 w-full bg-border/40">
		<div class="absolute h-full bg-blue-500 duration-500" style="width: {percentage}%"></div>
	</div>
	<p>{text}</p>
	<div class="flex items-center justify-between">
		<button
			type="button"
			onclick={handleTogglePlaying}
			class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white duration-200 hover:bg-blue-600"
		>
			<Fa icon={isPlaying ? faPause : faPlay} />
		</button>

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
	</div>
</div>
<input type="file" name={form_name} bind:this={input} hidden />
<audio
	src="https://gateway.pinata.cloud/ipfs/{cid}"
	bind:this={audio}
	ontimeupdate={handleTimeUpdate}
></audio>
