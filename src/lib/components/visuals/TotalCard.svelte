<script lang="ts">
	import { formatCurrency } from '$lib/utils';
	let { message, amount, color, currency = 'USD' } = $props();
</script>

<div class="rounded border bg-bg-2 p-3">
	<div class="flex h-full flex-col items-center justify-center text-center">
		<h5
			class={color === 'green'
				? 'text-green-500'
				: color === 'red'
					? 'text-red-500'
					: 'text-blue-500'}
		>
			{formatCurrency(amount, currency)}
		</h5>
		<p class="text-xs">Total {message}</p>
	</div>
</div>
