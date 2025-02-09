<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input, TextArea } from '$lib/components';
	import { page } from '$app/state';
	import { formatDistance } from 'date-fns';

	let { data } = $props();

	let presentations = $derived(data.presentations);

	let topic = '';
	let description = '';

	let loading: boolean = $state(false);

	$effect(() => {
		if (page.form?.submitting) {
			loading = true;
		} else {
			loading = false;
		}
	});
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<h4>Presentations</h4>
	</div>

	<div class="flex flex-col gap-4">
		<div class="p-6 rounded border bg-bg-2">
			<form method="POST" class="flex flex-col gap-y-4">
				<Input
					value={topic}
					name="topic"
					label="Topic"
					placeholder="Ex: Animals, Star Wars, Anime"
				/>
				<TextArea
					value={description}
					name="description"
					label="Description"
					placeholder="Ex: The background should be black and the text should be green."
				/>
				<button disabled={loading} class="self-end px-3 btn-primary" type="submit">Submit</button>
			</form>
		</div>
		<div class="p-6 rounded border bg-bg-2">
			<div class="flex overflow-hidden flex-col gap-y-4 rounded border h-[448px]">
				<table class="w-full divide-border">
					<thead>
						<tr>
							<th>Topic</th>
							<th>Description</th>
							<th>Created</th>
							<th># Slides</th>
							<th># Recordings</th>
						</tr>
					</thead>
					<tbody>
						{#each presentations as presentation}
							<tr
								class="duration-200 cursor-pointer hover:bg-neutral-400/10"
								onclick={() => goto(`/dashboard/presentations/${presentation.id}`)}
							>
								<td>{presentation.topic}</td>
								<td>{presentation.description}</td>
								<td
									>{formatDistance(new Date(presentation.created_at), new Date(), {
										addSuffix: true
									})}</td
								>
								<td>{presentation.slides.length}</td>
								<td>{presentation.recording.length}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
