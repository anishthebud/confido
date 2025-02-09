<script lang="ts">
    import { LineChart } from 'layerchart';
    import { onMount } from 'svelte';

	let { data } = $props();
	const currentDateTime = '2022-10-15';
</script>

<div class="p-8 min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
    <div class="mx-auto space-y-6 max-w-6xl">
        
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center space-x-4">
                <div class="flex justify-center items-center w-24 h-24 text-4xl text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                    {String(data.scoreItems.length).padStart(2, '0')}
                </div>
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">{data.users_name}</h1>
                    <p class="text-sm text-gray-500">Last updated: {currentDateTime}</p>
                </div>
            </div>x
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div class="p-6 bg-white rounded-lg shadow-sm">
                <div class="flex items-center mb-4 space-x-2">
                    <svg class="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9v-3m0 0-3-3m3 3 3-3" />
                    </svg>
                    <h3 class="font-semibold">Total Presentations</h3>
                </div>
                <div class="text-3xl font-bold text-purple-600">{data.scoreItems.length}</div>
            </div>

            <div class="p-6 bg-white rounded-lg shadow-sm">
                <div class="flex items-center mb-4 space-x-2">
                    <svg class="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 15l-2 5l9-13h-4l2-5l-9 13h4z" />
                    </svg>
                    <h3 class="font-semibold">Average Score</h3>
                </div>
                <div class="text-3xl font-bold text-yellow-600">{data.averageScore}</div>
                <p class="text-gray-600">Out of 100</p>
            </div>

            <div class="p-6 bg-white rounded-lg shadow-sm">
                <div class="flex items-center mb-4 space-x-2">
                    <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 15a4 4 0 0 0 4 4h9a5 5 0 0 0 5-5c0-2-2-3-3-3s-3 1-3 3" />
                    </svg>
                    <h3 class="font-semibold">Badges Earned</h3>
                </div>
                <div class="text-3xl font-bold text-blue-600">{data.badges.length}</div>
                <p class="text-gray-600">Total Achievements</p>
            </div>
        </div>

        <!-- Performance Graph -->
        <div class="p-6 bg-white rounded-lg shadow-sm">
            <h3 class="mb-4 font-semibold">Presentation Performance</h3>
            <div class="p-4 h-[300px]">
                <LineChart
                    data={data.scoreItems ?? []}
                    x="created_at"
                    y="score"
                    series={[{ key: 'score', color: '#8b5cf6' }]}
                    props={{
                        grid: { class: 'stroke-gray-200 stroke-1' },
                        xAxis: { class: 'fill-gray-600' },
                        yAxis: { class: 'fill-gray-600' },
                        tooltip: {
                            root: { class: 'bg-white border border-gray-200 shadow-sm rounded p-2 text-sm text-gray-600' }
                        }
                    }}
                    padding={{ right: 50, left: 50, bottom: 30, top: 40 }}
                    tooltip={{ mode: 'voronoi' }}
                />
            </div>
        </div>

        <!-- Badges Section -->
        <div class="p-6 bg-white rounded-lg shadow-sm">
            <h3 class="mb-4 font-semibold">Earned Badges</h3>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
                {#each data.badges ?? [] as badge}
                    <div class="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg transition-colors hover:from-purple-100 hover:to-blue-100">
                        <div class="mb-2 text-4xl">{badge.image_url}</div>
                        <div class="text-sm font-medium text-center text-gray-700">{badge.name}</div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: system-ui, -apple-system, sans-serif;
    }
</style>
