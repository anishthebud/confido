<script lang="ts">
	import { LineChart } from 'layerchart';

	let { data } = $props();
	let user = $derived(data.user);
	const currentDateTime = '2022-10-15';
	console.log(user);
</script>

<div class="flex flex-col gap-y-6">
	<div class="flex flex-col gap-y-4">
		<div class="flex items-center gap-x-2">
			<h4>
				Welcome <span class="text-blue-500">
					{user?.user_metadata?.display_name ?? 'Guest'}
				</span>
			</h4>
		</div>
		<p>{user?.email}</p>
	</div>
	<div class="mx-auto max-w-6xl space-y-6">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<div class="mb-4 flex items-center space-x-2">
					<svg
						class="h-6 w-6 text-purple-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9v-3m0 0-3-3m3 3 3-3" />
					</svg>
					<h3 class="font-semibold">Total Presentations</h3>
				</div>
				<div class="text-3xl font-bold text-purple-600">{(data.badges ?? []).length}</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<div class="mb-4 flex items-center space-x-2">
					<svg
						class="h-6 w-6 text-yellow-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M12 15l-2 5l9-13h-4l2-5l-9 13h4z" />
					</svg>
					<h3 class="font-semibold">Average Score</h3>
				</div>
				<div class="text-3xl font-bold text-yellow-600">{data.averageScore}</div>
				<p class="text-gray-600">Out of 100</p>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-sm">
				<div class="mb-4 flex items-center space-x-2">
					<svg
						class="h-6 w-6 text-blue-500"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M3 15a4 4 0 0 0 4 4h9a5 5 0 0 0 5-5c0-2-2-3-3-3s-3 1-3 3" />
					</svg>
					<h3 class="font-semibold">Badges Earned</h3>
				</div>
				<div class="text-3xl font-bold text-blue-600">{(data.badges ?? []).length}</div>
				<p class="text-gray-600">Total Achievements</p>
			</div>
		</div>

		<div class="rounded-lg bg-bg-2 p-6 shadow-sm">
			<h3 class="mb-4 font-semibold">Presentation Performance</h3>
			<div class="h-[300px] p-4">
				<LineChart
					data={data.scoreItems ?? []}
					x="created_at"
					y="score"
					series={[{ key: 'score', color: '#8b5cf6' }]}
					props={{
						grid: { class: 'stroke-text-3/20 stroke-1' },
						xAxis: {
							class: 'fill-text-3'
						},
						yAxis: {
							class: 'fill-text-3'
						},
						tooltip: {
							root: {
								class: 'bg-bg-2 border text-text-3'
							}
						}
					}}
					padding={{ right: 50, left: 50, bottom: 30, top: 40 }}
					tooltip={{
						mode: 'voronoi'
					}}
				/>
			</div>
		</div>

		<!-- Badges Section -->
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h3 class="mb-4 font-semibold">Earned Badges</h3>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-5">
				{#each data.badges ?? [] as badge}
					<div
						class="flex flex-col items-center rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 p-4 transition-colors hover:from-purple-100 hover:to-blue-100"
					>
						<div class="mb-2 text-4xl">{badge.image_url}</div>
						<div class="text-center text-sm font-medium text-gray-700">{badge.name}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
