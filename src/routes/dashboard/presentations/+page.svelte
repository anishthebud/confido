<script lang="ts">
	import { Input } from '$lib/components';
	import TextArea from '$lib/components/ui/TextArea.svelte';

	let presentations: [{ thing: number }] = [{ thing: 5 }];
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<h4>Presentations</h4>
	</div>

	<div class="flex flex-col gap-4">
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex flex-col gap-y-4">
				<Input label="Topic" placeholder="Ex: Animals, Star Wars, Anime" />
				<TextArea
					label="Description"
					placeholder="Ex: The background should be black and the text should be green."
				/>
				<button class="btn-primary self-end px-3">Submit</button>
			</div>
		</div>
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex h-[660px] flex-col gap-y-4 overflow-hidden rounded border">
				<table class="w-full divide-border">
					<thead>
						<tr>
							<th>Thing</th>
						</tr>
					</thead>
					<tbody>
						{#each presentations as presentation}
							<tr>
								<td>{presentation.thing}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
