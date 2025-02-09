<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Recording } from '$lib/types.js';

	let { data } = $props();
	let recordings = $derived(data.recordings as unknown as Recording[] | null);

	function calculateTotalScore(recording: Recording): number {
		return Math.round(
			(recording.question_score?.depth ?? 0) +
				(recording.question_score?.clarity ?? 0) +
				(recording.question_score?.relevance ?? 0) +
				(recording.recording_score?.pacing ?? 0) +
				(recording.recording_score?.clarity ?? 0) +
				(recording.recording_score?.delivery ?? 0) +
				((recording.recording_score?.engagement ?? 0) * 100) / 80
		);
	}

	function getScoreColor(score: number): string {
		console.log(score);
		if (score < 33) return 'text-red-500';
		if (score < 66) return 'text-yellow-500';
		return 'text-green-500';
	}
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<h4>Recordings</h4>
	</div>

	<div class="rounded border bg-bg-2 p-6">
		<div class="flex h-[652px] flex-col gap-y-4 overflow-hidden rounded border">
			<table class="w-full divide-border">
				<thead>
					<tr>
						<th>Date</th>
						<th>Presentation Scores</th>
						<th>Presentation Overall</th>
						<th>Answer Scores</th>
						<th>Answer Overall</th>
						<th>Total Score</th>
					</tr>
				</thead>
				<tbody>
					{#each recordings || [] as recording}
						<tr
							class="cursor-pointer duration-200 hover:bg-neutral-400/10"
							onclick={() => goto(`/dashboard/recordings/${recording.id}`)}
						>
							<td>{new Date(recording.created_at).toLocaleDateString()}</td>
							<td
								>{recording.recording_score?.pacing} | {recording.recording_score?.clarity} | {recording
									.recording_score?.delivery} | {recording.recording_score?.engagement}</td
							>
							<td
								>{recording.recording_score?.pacing +
									recording.recording_score?.clarity +
									recording.recording_score?.delivery +
									recording.recording_score?.engagement}</td
							>
							<td
								>{recording.question_score?.depth} | {recording.question_score?.clarity} | {recording
									.question_score?.relevance}</td
							>
							<td
								>{recording.question_score?.depth +
									recording.question_score?.clarity +
									recording.question_score?.relevance}</td
							>
							<td class={getScoreColor(calculateTotalScore(recording))}
								>{calculateTotalScore(recording)}%</td
							>
						</tr>
						<tr
							class="cursor-pointer duration-200 hover:bg-neutral-400/10"
							onclick={() => goto(`/dashboard/recordings/${recording.id}`)}
						>
							<td>{new Date(recording.created_at).toLocaleDateString()}</td>
							<td
								>{recording.recording_score?.pacing}/{recording.recording_score?.clarity}/{recording
									.recording_score?.delivery}/{recording.recording_score?.engagement}</td
							>
							<td
								>{recording.recording_score?.pacing +
									recording.recording_score?.clarity +
									recording.recording_score?.delivery +
									recording.recording_score?.engagement}</td
							>
							<td
								>{recording.question_score?.depth}/{recording.question_score?.clarity}/{recording
									.question_score?.relevance}</td
							>
							<td
								>{recording.question_score?.depth +
									recording.question_score?.clarity +
									recording.question_score?.relevance}</td
							>
							<td
								>{recording.question_score?.depth +
									recording.question_score?.clarity +
									recording.question_score?.relevance +
									recording.recording_score?.pacing +
									recording.recording_score?.clarity +
									recording.recording_score?.delivery +
									recording.recording_score?.engagement +
									20}%</td
							>
						</tr>
						<tr
							class="cursor-pointer duration-200 hover:bg-neutral-400/10"
							onclick={() => goto(`/dashboard/recordings/${recording.id}`)}
						>
							<td>{new Date(recording.created_at).toLocaleDateString()}</td>
							<td
								>{recording.recording_score?.pacing}/{recording.recording_score?.clarity}/{recording
									.recording_score?.delivery}/{recording.recording_score?.engagement}</td
							>
							<td
								>{recording.recording_score?.pacing +
									recording.recording_score?.clarity +
									recording.recording_score?.delivery +
									recording.recording_score?.engagement}</td
							>
							<td
								>{recording.question_score?.depth}/{recording.question_score?.clarity}/{recording
									.question_score?.relevance}</td
							>
							<td
								>{recording.question_score?.depth +
									recording.question_score?.clarity +
									recording.question_score?.relevance}</td
							>
							<td
								>{Math.round(
									recording.question_score?.depth +
										recording.question_score?.clarity +
										recording.question_score?.relevance +
										recording.recording_score?.pacing +
										recording.recording_score?.clarity +
										recording.recording_score?.delivery +
										(recording.recording_score?.engagement * 100) / 80
								)}%</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
