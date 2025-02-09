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
			return '70px';
		})();
	});
</script>

<div
	class="fixed z-40 mt-14 h-[calc(100%-56px)] w-48 border-r bg-bg-2"
	transition:fly={{ x: -10, duration: 200 }}
>
	<div class="flex flex-col justify-between items-center py-4 w-full h-full text-text-3">
		<div class="flex relative flex-col gap-y-2 w-full">
			<div class="flex gap-x-2 items-center px-3 pt-2 pb-3 w-full rounded">
				<div class="mt-1 h-5/6 bg-blue-500 rounded aspect-square"></div>
				<div class="flex flex-col">
					<span class="text-sm font-medium text-text-2">{name}</span>
					<span
						class="flex overflow-hidden justify-start w-full leading-3 truncate text-ellipsis text-[10px] text-text-3"
						>{email}
					</span>
				</div>
			</div>
			<hr class="w-full h-[1px] bg-border" />

			<div class="flex relative flex-col gap-y-2">
				<div
					class="absolute right-0 w-1 h-9 bg-blue-400 rounded-l duration-300"
					style="top: {yPosition}"
				></div>
				<a
					href="/dashboard/profile"
					class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes(
						'/dashboard/profile'
					)
						? ' bg-blue-400/10 text-blue-400'
						: ' hover:text-text-1'}"><Fa class="w-4" icon={faUser} />Account</a
				>
				<a
					href="/dashboard/recordings"
					class="flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium duration-200 {page.url.pathname.includes(
						'/dashboard/recordings'
					)
						? ' bg-blue-400/10 text-blue-400'
						: ' hover:text-text-1'}"><Fa class="w-4" icon={faMicrophone} />Recordings</a
				>
				<hr class="w-full h-[1px] bg-border" />
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
			class="flex gap-x-2 items-center py-2 px-4 w-full text-sm font-medium duration-200 hover:text-red-500 hover:bg-red-400/10"
			><Fa class="w-4" icon={faRightFromBracket} />Logout</button
		>
	</div>
</div>
