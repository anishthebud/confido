<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { theme } from '$lib/shared';

	let { audioStream, isRecording } = $props();

	let canvas: HTMLCanvasElement;
	let audioContext: AudioContext | null = null;
	let analyser: AnalyserNode | null = null;
	let animationFrame: number;
	let dpr = $state(1);

	onMount(() => {
		dpr = window.devicePixelRatio || 1;
		setupCanvas();
	});

	function setupCanvas() {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		const ctx = canvas.getContext('2d')!;
		ctx.scale(dpr, dpr);
	}

	$effect(() => {
		if (audioStream && isRecording) {
			setupAudioAnalysis();
		} else {
			cleanup();
		}
	});

	function setupAudioAnalysis() {
		audioContext = new AudioContext();
		analyser = audioContext.createAnalyser();
		const source = audioContext.createMediaStreamSource(audioStream!);

		analyser.fftSize = 4096;
		analyser.smoothingTimeConstant = 0.8;

		source.connect(analyser);

		draw();
	}

	function draw() {
		if (!analyser || !canvas) return;

		const ctx = canvas.getContext('2d')!;
		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		const rect = canvas.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		analyser.getByteTimeDomainData(dataArray);

		ctx.fillStyle = theme.value === 'dark' ? 'rgb(45, 45, 50)' : 'rgb(254, 254, 254)';
		ctx.fillRect(0, 0, width, height);

		ctx.lineWidth = 2 / dpr;
		ctx.strokeStyle = theme.value === 'dark' ? 'rgb(200, 200, 200)' : 'rgb(100, 100, 100)';
		ctx.beginPath();

		const sliceWidth = width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * height) / 2;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.lineTo(width, height / 2);
		ctx.stroke();

		animationFrame = requestAnimationFrame(draw);
	}

	function cleanup() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
		if (audioContext) {
			audioContext.close();
			audioContext = null;
		}
		analyser = null;
	}

	onDestroy(cleanup);
</script>

<canvas bind:this={canvas} class="h-12 w-full rounded bg-bg-1" style="image-rendering: crisp-edges;"
></canvas>
