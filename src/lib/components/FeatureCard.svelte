<script>
	let { icon, title, description } = $props();
</script>

<div class="rounded bg-bg-2 p-6 shadow-md">
	<div
		class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400/10 text-blue-600"
	>
		{@html icon.svg}
	</div>
	<h3 class="mb-2 text-xl font-semibold text-text-2">{title}</h3>
	<p>{description}</p>
</div>
