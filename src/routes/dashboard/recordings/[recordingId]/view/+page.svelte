<script lang="ts">
	import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
	import { Arc, Chart, Group, Svg, Text } from 'layerchart';
	import Fa from 'svelte-fa';

	let { data } = $props();

	let recording = $derived(data.recording[0]);
	const colors = {
		high: '#22C55E',
		medium: '#EAB308',
		low: '#EF4444'
	};
	let recordingScore = $derived(
		recording?.recording_score?.pacing +
			recording?.recording_score?.clarity +
			recording?.recording_score?.delivery +
			recording?.recording_score?.engagement
	);

	let questionScore = $derived(
		recording?.question_score?.depth +
			recording?.question_score?.clarity +
			recording?.question_score?.relevance
	);

	let color = $derived(
		recordingScore > 33 ? colors.high : recordingScore > 16 ? colors.medium : colors.low
	);

	let color2 = $derived(
		questionScore > 20 ? colors.high : questionScore > 10 ? colors.medium : colors.low
	);

	let color3 = $derived(
		questionScore + recordingScore > 66
			? colors.high
			: questionScore + recordingScore > 33
				? colors.medium
				: colors.low
	);

	let isPlaying = $state(false);

	let audio: HTMLAudioElement | undefined = $state();

	function handleTogglePlaying() {
		if (isPlaying) {
			audio?.pause();
			isPlaying = false;
		} else {
			audio?.play();
			isPlaying = true;
		}
	}

	let percentage = $state(0);

	function handleTimeUpdate() {
		if (audio) {
			percentage = (audio.currentTime / audio.duration) * 100;
		}
	}
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<h4>Recording Analysis</h4>
	</div>

	<div class="flex flex-col gap-6">
		<div class="p-6 w-full rounded border bg-bg-2">
			<div class="flex gap-x-6 items-center h-full">
				<button
					type="button"
					onclick={handleTogglePlaying}
					class="flex justify-center items-center w-9 h-9 text-white bg-blue-500 rounded-full duration-200 hover:bg-blue-600"
				>
					<Fa icon={isPlaying ? faPause : faPlay} />
				</button>
				<div class="relative w-full h-1 bg-border/40">
					<div class="absolute h-full bg-blue-500" style="width: {percentage}%"></div>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-3 gap-6">
			<div class="p-6 rounded border bg-bg-2">
				<div class="flex flex-col gap-3">
					<h5>Recording Score</h5>
					<div class="flex -mt-14 -mb-32 w-full h-80">
						<Chart>
							<Svg center>
								<Group y={16}>
									<Arc
										value={(recordingScore * 100) / 50}
										range={[-90, 90]}
										outerRadius={90}
										innerRadius={70}
										cornerRadius={4}
										fill={color}
										track={{ class: 'fill-gray-500/10' }}
									>
										<Text
											value={Math.round(recordingScore) + '/50'}
											textAnchor="middle"
											verticalAnchor="end"
											fill={color}
											class="text-4xl font-bold fill-text-1"
										/>
									</Arc>
								</Group>
							</Svg>
						</Chart>
					</div>
					<div class="flex flex-col gap-y-1 justify-center text-center">
						<p>{recording?.recording_score?.comments}</p>
					</div>
				</div>
			</div>
			<div class="p-6 rounded border bg-bg-2">
				<div class="flex flex-col gap-3">
					<h5>Questions Score</h5>
					<div class="flex -mt-14 -mb-32 w-full h-80">
						<Chart>
							<Svg center>
								<Group y={16}>
									<Arc
										value={(questionScore * 100) / 30}
										range={[-90, 90]}
										outerRadius={90}
										innerRadius={70}
										cornerRadius={4}
										fill={color2}
										track={{ class: 'fill-gray-500/10' }}
									>
										<Text
											value={Math.round(questionScore) + '/30'}
											textAnchor="middle"
											verticalAnchor="end"
											fill={color2}
											class="text-4xl font-bold fill-text-1"
										/>
									</Arc>
								</Group>
							</Svg>
						</Chart>
					</div>
					<div class="flex flex-col gap-y-1 justify-center text-center">
						<p>{recording?.question_score?.comments}</p>
					</div>
				</div>
			</div>
			<div class="p-6 rounded border bg-bg-2">
				<div class="flex flex-col gap-3">
					<h5>Total Score</h5>
					<div class="flex -mt-14 -mb-32 w-full h-80">
						<Chart>
							<Svg center>
								<Group y={16}>
									<Arc
										value={((questionScore + recordingScore) * 100) / 80}
										range={[-90, 90]}
										outerRadius={90}
										innerRadius={70}
										cornerRadius={4}
										fill={color3}
										track={{ class: 'fill-gray-500/10' }}
									>
										<Text
											value={Math.round(questionScore + recordingScore) + '/100'}
											textAnchor="middle"
											verticalAnchor="end"
											fill={color3}
											class="text-4xl font-bold fill-text-1"
										/>
									</Arc>
								</Group>
							</Svg>
						</Chart>
					</div>
					<div class="flex flex-col gap-y-1 justify-center text-center text-text-3">
						<div class="flex justify-between">
							<span class="font-semibold text-text-1">Presentation Clarity</span>
							<span>{recording?.recording_score?.clarity}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-semibold text-text-1">Delivery</span>
							<span>{recording?.recording_score?.delivery}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-semibold text-text-1">Pacing</span>
							<span>{recording?.recording_score?.pacing}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-semibold text-text-1">Engagement</span>
							<span>{recording?.recording_score?.engagement}</span>
						</div>

						<div class="my-2 border-t border-border"></div>

						<!-- Question Scores -->
						<div class="flex justify-between">
							<span class="font-semibold text-text-1">Question Clarity</span>
							<span>{recording?.question_score?.clarity}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-semibold text-text-1">Question Depth</span>
							<span>{recording?.question_score?.depth}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-semibold text-text-1">Relevance</span>
							<span>{recording?.question_score?.relevance}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="p-6 w-full rounded border bg-bg-2">
			<div class="flex flex-col gap-3">
				<h5>Transcription</h5>
				<p>{recording?.transcript}</p>
			</div>
		</div>
	</div>
</div>

<audio
	src="https://gateway.pinata.cloud/ipfs/{recording?.audio_cid}"
	bind:this={audio}
	ontimeupdate={handleTimeUpdate}
></audio>
