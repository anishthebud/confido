<script lang="ts">
	let { accountDetails, fileName, valid } = $props();

	const formatDate = (dateStr: string) => {
		const [day, month, year] = dateStr.split('-');
		const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<div class="rounded border bg-bg-2 p-6">
	<div class="flex h-full flex-col gap-3">
		<h5>Analysis Details</h5>
		<div class="flex h-full flex-col gap-y-1">
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">Validity:</span>
				{#if valid}
					<span class="-my-1 rounded bg-green-500/10 p-1 font-bold text-green-500">Valid</span>
				{:else}
					<span class="rounded bg-red-500/10 px-1 font-bold text-red-500">Invalid</span>
				{/if}
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">File Name:</span>
				<span class="truncate">{fileName}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">Account Number:</span
				>
				<span class="truncate">{accountDetails.accountNumber}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[140px] truncate text-left font-medium text-text-2">Customer Name:</span>
				<span class="truncate">{accountDetails.customerName}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">Opening Date:</span>
				<span class="truncate"
					>{accountDetails.openingDate ? accountDetails.openingDate : 'Unknown'}</span
				>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">From:</span>
				<span class="truncate">{formatDate(accountDetails.period.from)}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">To:</span>
				<span class="truncate">{formatDate(accountDetails.period.to)}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">Currency:</span>
				<span class="truncate">{accountDetails.currency}</span>
			</p>
		</div>
	</div>
</div>
