<script lang="ts">
	import { page } from '$app/state';
	import Fa from 'svelte-fa';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

	type Segment = {
		name: string;
		href: string;
	};

	let loading: boolean = $state(true);

	let segments: Segment[] = $state([]);

	$effect(() => {
		segments = page.url.pathname
			.split('/')
			.filter(Boolean)
			.map((segment, index, array) => ({
				name: segment.charAt(0).toUpperCase() + segment.slice(1),
				href: '/' + array.slice(0, index + 1).join('/')
			}));
		loading = false;
	});
</script>

<nav class="mb-2.5 flex" aria-label="Breadcrumb">
	{#if loading}
		<div class="h-5"></div>
	{:else}
		<ol class="flex items-center gap-x-2 text-sm">
			{#each segments as segment, i}
				<li class="flex items-center gap-x-1">
					<a
						href={segment.href}
						class="flex items-center rounded text-sm duration-200 {i === segments.length - 1
							? 'font-semibold text-text-2'
							: 'text-text-3 hover:text-blue-500 hover:underline'}"
						aria-current={i === segments.length - 1 ? 'page' : undefined}
					>
						{segment.name}
					</a>
					{#if i !== segments.length - 1}
						<Fa size="sm" icon={faChevronRight} class="text-text-3" />
					{/if}
				</li>
			{/each}
		</ol>
	{/if}
</nav>
