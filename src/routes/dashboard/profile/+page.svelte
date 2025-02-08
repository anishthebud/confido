<script lang="ts">
  import { onMount } from 'svelte';
  import { LineChart } from "layerchart";
  
  const currentDateTime = "2025-02-08 21:20:21";
  const currentUser = "nverma61";
  
  const scores = [
    { created_at: new Date("2025-01-08"), score: 75 },
    { created_at: new Date("2024-12-08"), score: 82 },
    { created_at: new Date("2024-11-08"), score: 78 },
    { created_at: new Date("2024-10-08"), score: 85 },
    { created_at: new Date("2024-09-08"), score: 90 },
    { created_at: new Date("2024-08-08"), score: 88 }
  ].sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

  const averageScore = (scores.reduce((sum, item) => sum + Number(item.score), 0) / scores.length).toFixed(1);

  const badges = [
    { id: 1, name: 'First Presentation', icon: '🎯' },
    { id: 2, name: 'Three Presentations', icon: '🎯' },
    { id: 3, name: 'Five Presentations', icon: '🎯' },
    { id: 4, name: '100', icon: '🎯' },
    { id: 5, name: '80', icon: '🎯' }
  ];

  const formatDate = (date: Date) => {
    if (!(date instanceof Date)) return '';
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      year: 'numeric'
    });
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <div class="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-4xl text-white">
          {String(currentUser).slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-800">{currentUser}</h1>
          <p class="text-sm text-gray-500">Last updated: {currentDateTime}</p>
        </div>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center space-x-2 mb-4">
          <svg class="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9v-3m0 0-3-3m3 3 3-3"/>
          </svg>
          <h3 class="font-semibold">Total Presentations</h3>
        </div>
        <div class="text-3xl font-bold text-purple-600">{scores.length}</div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center space-x-2 mb-4">
          <svg class="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 15l-2 5l9-13h-4l2-5l-9 13h4z"/>
          </svg>
          <h3 class="font-semibold">Average Score</h3>
        </div>
        <div class="text-3xl font-bold text-yellow-600">{averageScore}</div>
        <p class="text-gray-600">Out of 100</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center space-x-2 mb-4">
          <svg class="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 15a4 4 0 0 0 4 4h9a5 5 0 0 0 5-5c0-2-2-3-3-3s-3 1-3 3"/>
          </svg>
          <h3 class="font-semibold">Badges Earned</h3>
        </div>
        <div class="text-3xl font-bold text-blue-600">{badges.length}</div>
        <p class="text-gray-600">Total Achievements</p>
      </div>
    </div>

    <!-- Performance Graph -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="font-semibold mb-4">Presentation Performance</h3>
      <div class="h-[300px] p-4">
        <LineChart
          data={scores}
          x="created_at"
          y="score"
          series={[{ key: 'score', color: '#8b5cf6' }]}
          props={{
            grid: { class: 'stroke-gray-200 stroke-1' },
            xAxis: {
              class: 'fill-gray-600',
              format: formatDate
            },
            yAxis: {
              class: 'fill-gray-600'
            },
            tooltip: {
              root: { class: 'bg-white border border-gray-200 shadow-sm rounded p-2 text-sm text-gray-600' }
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
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h3 class="font-semibold mb-4">Earned Badges</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        {#each badges as badge (badge.id)}
          <div 
            class="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors"
          >
            <div class="text-4xl mb-2">{badge.icon}</div>
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