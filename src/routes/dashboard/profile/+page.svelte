<script lang="ts">
	import { Calendar, Chart, LineChart, Svg, Tooltip } from 'layerchart';
	import type { PageProps } from './$types';
	import { BADGES, type BadgeType } from '$lib/badges/badges';
	import { startOfYear, endOfYear, eachDayOfInterval } from 'date-fns';

	let { data }: PageProps = $props();

	let user = $derived(data.user);

	const firstDayOfYear = startOfYear(new Date());
	const lastDayOfYear = endOfYear(new Date());

	const earnedBadges = $derived(
		Object.entries(data.badges).flatMap(([k, v]) => (v ? [BADGES[k as BadgeType][v]] : []))
	);

	const days = eachDayOfInterval({
		start: firstDayOfYear,
		end: lastDayOfYear
	});

	const calendarData = days.map((date) => {
		const dateStr = date.toISOString().split('T')[0];
		return {
			date: dateStr,
			value: data.scoreItems.filter(
				(item) => new Date(item.created_at).toISOString().split('T')[0] === dateStr
			).length
		};
	});
</script>

<div class="min-h-screen">
	<div class="mx-auto space-y-6">
		<!-- Header Section -->
		<div class="mb-8 mt-8 flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<div
					class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-4xl text-white"
				>
					{String(data.scoreItems.length).padStart(2, '0')}
				</div>
				<div class="flex flex-col">
					<h1 class="text-3xl font-bold text-text-1">{user?.user_metadata?.display_name}</h1>
					<p>{data.users_name}</p>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded border bg-bg-2 p-6">
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
					<h5>Total Presentations</h5>
				</div>
				<div class="text-3xl font-bold text-purple-600">{data.scoreItems.length}</div>
			</div>

			<div class="rounded border bg-bg-2 p-6">
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
					<h5>Average Score</h5>
				</div>
				<div class="text-3xl font-bold text-yellow-600">{data.averageScore}</div>
				<p class="text-text-3">Out of 100</p>
			</div>

			<div class="rounded border bg-bg-2 p-6">
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
					<h5>Badges Earned</h5>
				</div>
				<div class="text-3xl font-bold text-blue-600">
					{Object.entries(data.badges).filter(([_, v]) => !!v).length}
				</div>
				<p>Total Achievements</p>
			</div>
		</div>

		<!-- Performance Graph -->
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex flex-col gap-y-3">
				<h5>Presentation Performance</h5>
				{#if data.scoreItems.length == 0}
					<p>No Presentations Completed</p>
				{:else}
					<div class="h-[300px] p-4">
						<LineChart
							data={data.scoreItems ?? []}
							x="created_at"
							y="score"
							series={[{ key: 'score', color: '#8b5cf6' }]}
							props={{
								grid: { class: 'stroke-text-3/20 stroke-1' },
								xAxis: { class: 'fill-text-3' },
								yAxis: { class: 'fill-text-3' },
								tooltip: {
									root: {
										class: 'bg-bg-2 border text-text-3'
									}
								}
							}}
							padding={{ right: 40, left: 40, bottom: 30, top: 40 }}
							tooltip={{ mode: 'voronoi' }}
						/>
					</div>
				{/if}
			</div>
		</div>

		<!-- Badges Section -->
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex flex-col gap-y-3">
				<h5>Earned Badges</h5>
				{#if earnedBadges.length == 0}
					<p>No badges earned</p>
				{:else}
					<div class="grid grid-cols-2 gap-4 md:grid-cols-5">
						{#each earnedBadges as badge}
							<div
								class="flex flex-col items-center rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 p-4 transition-colors hover:from-purple-100 hover:to-blue-100"
							>
								<img src={badge.imageUrl} alt={badge.description} />
								<div class="text-center text-sm font-medium text-gray-700">{badge.name}</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<div class="rounded border bg-bg-2 p-6">
			<div class="flex flex-col gap-y-3">
				<h5>Activity Calendar</h5>
				<div class="flex h-[200px] items-center justify-center overflow-hidden rounded p-4">
					<Chart
						data={calendarData ?? []}
						x="date"
						c="value"
						cDomain={[0, 1, 2, 3, 4]}
						cRange={['#f4f4f5', '#c084fc', '#a855f7', '#9333ea', '#7e22ce']}
						let:tooltip
						padding={{ top: 20, right: 20, bottom: 20, left: -5 }}
					>
						<Svg>
							<Calendar
								start={firstDayOfYear}
								end={lastDayOfYear}
								{tooltip}
								cellSize={16}
								monthPath
								cellPadding={2}
								class="fill-transparent stroke-border/60"
							/>
						</Svg>

						<Tooltip.Root class="rounded border bg-bg-2 text-text-3" let:data>
							<Tooltip.Header class="text-text-1"
								>{new Date(data.date).toLocaleDateString()}</Tooltip.Header
							>

							{#if data.value != null}
								<Tooltip.List>
									<Tooltip.Item
										label="value"
										value={data.value}
										format="integer"
										valueAlign="right"
									/>
								</Tooltip.List>
							{:else}
								<Tooltip.List>
									<Tooltip.Item label="value" value="0" format="integer" valueAlign="right" />
								</Tooltip.List>
							{/if}
						</Tooltip.Root>
					</Chart>
				</div>
			</div>
		</div>
	</div>
</div>
