<script lang="ts">
	import { page } from '$app/state';
	import Fa from 'svelte-fa';

	import {
		faClipboardList,
		faFileUpload,
		faRightFromBracket
	} from '@fortawesome/free-solid-svg-icons';
	import { fly } from 'svelte/transition';
	let { handleLogout, name, email } = $props();

	let yPosition: string = $state('2rem');

	$effect(() => {
		yPosition = (() => {
			const path = page.url.pathname;
			// if (path.includes('/dashboard/')) return '70px';
			// if (path.includes('/dashboard/')) return '114px';
			return '85px';
		})();
	});
</script>

<div
	class="fixed mt-14 h-[calc(100%-56px)] w-48 border-r bg-bg-2"
	transition:fly={{ x: -10, duration: 200 }}
>
	<div class="flex h-full w-full flex-col items-center justify-between py-4 text-text-3">
		<div class="relative flex w-full flex-col gap-y-2">
			<div class="flex w-full items-center gap-x-2 rounded px-3 pb-3 pt-2">
				<div class="mt-1 aspect-square h-5/6 rounded bg-blue-500"></div>
				<div class="flex flex-col">
					<span class="text-sm font-medium text-text-2">{name}</span>
					<span
						class="flex w-full justify-start overflow-hidden truncate text-ellipsis text-[10px] leading-3 text-text-3"
						>{email}
					</span>
				</div>
			</div>
			<span class="h-[1px] w-full bg-border"></span>
			<div
				class="absolute right-0 h-9 w-1 rounded-l bg-blue-400 duration-300"
				style="top: {yPosition}"
			></div>
			<a
				href="/dashboard/"
				class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes(
					'/dashboard/'
				)
					? ' bg-blue-400/10 text-blue-400'
					: ' hover:text-text-1'}"><Fa class="w-4" icon={faFileUpload} />Upload</a
			>
			<a
				href="/dashboard/"
				class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes(
					'/dashboard/'
				)
					? ' bg-blue-400/10 text-blue-400'
					: ' hover:text-text-1'}"><Fa class="w-4" icon={faClipboardList} />Statements</a
			>
			<!-- <a
				href="/dashboard/"
				class="flex w-full items-center gap-x-2 rounded px-4 py-2 text-sm font-medium duration-200 {page
					.url.pathname === '/dashboard/'
					? ' text-blue-500'
					: ' hover:text-text-1'}"><Fa class="w-4" icon={faGear} />Settings</a
			> -->
		</div>
		<button
			onclick={handleLogout}
			class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 hover:bg-red-400/10 hover:text-red-500"
			><Fa class="w-4" icon={faRightFromBracket} />Logout</button
		>
	</div>
</div>
