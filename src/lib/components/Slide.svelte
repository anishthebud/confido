<script lang="ts">
	let { slide } = $props();
	let containerDiv: HTMLDivElement;
	let baseSize = $state(0);

	// Update base size when container dimensions change
	function updateBaseSize(node: HTMLDivElement) {
		const observer = new ResizeObserver(() => {
			baseSize = Math.min(node.offsetWidth, node.offsetHeight) / 100;
		});

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div
	class="relative h-full w-full"
	style="background-color: {slide.background.color}"
	bind:this={containerDiv}
	use:updateBaseSize
>
	<div
		class="absolute w-full"
		style:left="{slide.content.title.position.x}%"
		style:top="{slide.content.title.position.y}%"
		style:color={slide.content.title.color}
		style:font-size="{(slide.content.title.font_size * baseSize) / 4}px"
	>
		{slide.content.title.text}
	</div>

	{#each slide.content.elements as element (element.order)}
		<div
			class="absolute"
			style:left="{element.position.x}%"
			style:top="{element.position.y}%"
			style:width="{element.style.width}%"
			style:height="{element.style.height}%"
		>
			{#if element.type === 'text' && element.content.title}
				<div
					style:color={element.style.color || 'inherit'}
					style:font-size="{((element.style.font_size || 16) * baseSize) / 4}px"
				>
					{element.content.title}
				</div>
			{:else if element.type === 'image' && element.content.image_url}
				<img
					src={element.content.image_url}
					alt={element.content.alt_text || ''}
					class="h-full w-full object-contain"
				/>
			{/if}
		</div>
	{/each}
</div>
