<script lang="ts">
	import Fa from 'svelte-fa';

	let {
		name = '',
		value = $bindable(),
		placeholder = '',
		label = '',
		required = false,
		minlength = 0,
		maxlength = 524288,
		disabled = false,
		readonly = false,
		className = '',
		error = '',
		icon = null
	} = $props();
</script>

<div class="relative flex w-full flex-col gap-y-1.5 {className}">
	{#if icon}
		<div class="absolute left-2 top-1/2 -translate-y-1/2 transform">
			<Fa {icon} class="text-text-3" />
		</div>
	{/if}
	{#if label}
		<label for={name} class="text-xs font-medium text-text-2 peer-hover:text-palette-green"
			>{label}</label
		>
	{/if}
	<textarea
		id={name}
		{name}
		{placeholder}
		{required}
		{minlength}
		{maxlength}
		{disabled}
		{readonly}
		bind:value
		class="{icon
			? 'px-8'
			: 'px-2'} peer h-32 resize-none rounded border-2 bg-bg-1 py-1 text-sm text-text-2 outline-none ring-offset-bg-2 duration-200 placeholder:text-sm focus:ring-2 focus:ring-text-3/30 focus:ring-offset-1"
	></textarea>
	{#if error}
		<span class="text-palette-red text-xs">{error}</span>
	{/if}
</div>
