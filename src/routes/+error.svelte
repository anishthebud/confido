<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="flex flex-col min-h-screen bg-gradient-to-b from-gray-400 to-white">
	<div class="flex flex-col flex-grow justify-center items-center w-full">
		<div class="flex flex-col gap-y-2 items-center">
			<h3 class="">{page.error?.message}</h3>
			<h4 class="">We're working on fixing this</h4>
		</div>
	</div>
</main>
