<script lang="ts">
	import { faMicrophone, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
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

<div class="flex flex-col gap-y-4">
	<p>{text}</p>
	<div class="flex flex-row justify-between">
		<button
			type="button"
			onclick={() => audio?.play()}
			class="text-2xl text-blue-500 hover:text-blue-700"
		>
			<Fa icon={faPlayCircle} />
		</button>

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
	</div>
</div>
<input type="file" name={form_name} bind:this={input} hidden />
<audio src="https://gateway.pinata.cloud/ipfs/{cid}" bind:this={audio}></audio>
