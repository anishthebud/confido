<script lang="ts">
	import { page } from '$app/state';
	import Fa from 'svelte-fa';

	import {
		faClipboardQuestion,
		faComments,
		faMicrophone,
		faPersonChalkboard,
		faRightFromBracket,
		faUser
	} from '@fortawesome/free-solid-svg-icons';
	import { fly } from 'svelte/transition';
	let { handleLogout, name, email } = $props();

	let yPosition: string = $state('2rem');

	$effect(() => {
		yPosition = (() => {
			const path = page.url.pathname;
			if (path.includes('/dashboard/profile')) return '0px';
			if (path.includes('/dashboard/recordings')) return '44px';
			if (path.includes('/dashboard/presentations')) return '97px';
			return '0px';
		})();
	});
</script>

<div
	class="fixed z-40 mt-14 h-[calc(100%-56px)] w-48 border-r bg-bg-2"
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
			<hr class="h-[1px] w-full bg-border" />

			<div class="relative flex flex-col gap-y-2">
				<div
					class="absolute right-0 h-9 w-1 rounded-l bg-blue-400 duration-300"
					style="top: {yPosition}"
				></div>
				<a
					href="/dashboard/profile"
					class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes(
						'/dashboard/profile'
					)
						? ' bg-blue-400/10 text-blue-400'
						: ' hover:text-text-1'}"><Fa class="w-4" icon={faUser} />Profile</a
				>
				<a
					href="/dashboard/recordings"
					class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes(
						'/dashboard/recordings'
					)
						? ' bg-blue-400/10 text-blue-400'
						: ' hover:text-text-1'}"><Fa class="w-4" icon={faMicrophone} />Recordings</a
				>
				<hr class="h-[1px] w-full bg-border" />
				<a
					href="/dashboard/presentations"
					class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes(
						'/dashboard/presentations'
					)
						? ' bg-blue-400/10 text-blue-400'
						: ' hover:text-text-1'}"><Fa class="w-4" icon={faPersonChalkboard} />Presentations</a
				>
				<!-- <a -->
				<!-- 	href="/dashboard/interviews" -->
				<!-- 	class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes( -->
				<!-- 		'/dashboard/interviews' -->
				<!-- 	) -->
				<!-- 		? ' bg-blue-400/10 text-blue-400' -->
				<!-- 		: ' hover:text-text-1'}"><Fa class="w-4" icon={faClipboardQuestion} />Interviews</a -->
				<!-- > -->
				<!-- <a -->
				<!-- 	href="/dashboard/smalltalk" -->
				<!-- 	class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes( -->
				<!-- 		'/dashboard/smalltalk' -->
				<!-- 	) -->
				<!-- 		? ' bg-blue-400/10 text-blue-400' -->
				<!-- 		: ' hover:text-text-1'}"><Fa class="w-4" icon={faComments} />Smalltalk</a -->
				<!-- > -->
			</div>
		</div>
		<button
			onclick={handleLogout}
			class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 hover:bg-red-400/10 hover:text-red-500"
			><Fa class="w-4" icon={faRightFromBracket} />Logout</button
		>
	</div>
</div>
