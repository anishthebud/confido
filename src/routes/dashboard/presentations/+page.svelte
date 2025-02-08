<script lang="ts">
	import { goto } from '$app/navigation';
	import { Input, TextArea } from '$lib/components';
	import { page } from '$app/state';

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
		<div class="rounded border bg-bg-2 p-6">
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
				<button disabled={loading} class="btn-primary self-end px-3" type="submit">Submit</button>
			</form>
		</div>
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex h-[448px] flex-col gap-y-4 overflow-hidden rounded border">
				<table class="w-full divide-border">
					<thead>
						<tr>
							<th>Topic</th>
							<th>Description</th>
							<th>Created At</th>
							<th>Number of Slides</th>
							<th>Number of Recordings</th>
						</tr>
					</thead>
					<tbody>
						{#each presentations as presentation}
							<tr
								class="cursor-pointer duration-200 hover:bg-neutral-400/10"
								onclick={() => goto(`/dashboard/presentations/${presentation.id}`)}
							>
								<td>{presentation.topic}</td>
								<td>{presentation.description}</td>
								<td>{new Date(presentation.created_at).toLocaleDateString()}</td>
								<td>{presentation.slides.length}</td>
								<td>0</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
