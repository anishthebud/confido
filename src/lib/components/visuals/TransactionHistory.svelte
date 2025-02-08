<script lang="ts">
	import { formatCurrency, sameDay } from '$lib/utils';
	import { BarChart } from 'layerchart';
	import { onMount } from 'svelte';
	let { transactions, currency = 'USD' } = $props();

	interface TransactionDate {
		date: Date;
		deposit: number;
		withdrawal: number;
	}

	let transactionHistory: TransactionDate[] = $state([]);

	console.log(transactions);

	let tickInterval = $state(0);

	onMount(() => {
		const firstDate = new Date(transactions[0].date);
		const lastDate = new Date(transactions[transactions.length - 1].date);

		const totalDays = Math.floor(
			(lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
		);
		tickInterval = Math.ceil(totalDays / 10);

		const currDate = firstDate;
		let currTransactionIndex = 0;

		while (currDate.getTime() <= lastDate.getTime()) {
			let deposits = 0;
			let withdrawals = 0;
			while (
				currTransactionIndex < transactions.length &&
				sameDay(new Date(transactions[currTransactionIndex].date), currDate)
			) {
				const amount = transactions[currTransactionIndex].amount;
				if (amount > 0) {
					deposits += Number(amount);
				} else {
					withdrawals += Number(amount);
				}
				currTransactionIndex++;
			}
			transactionHistory.push({
				date: new Date(currDate.getTime()),
				deposit: deposits,
				withdrawal: withdrawals
			});
			currDate.setDate(currDate.getDate() + 1);
		}
	});
</script>

<div class="rounded border bg-bg-2 p-6">
	<div class="flex flex-col gap-3">
		<h5>Transactions History</h5>
	</div>

	<div class="flex h-64 w-full items-center justify-center">
		<BarChart
			data={transactionHistory}
			x="date"
			y={['deposit', (d: TransactionDate) => d.withdrawal]}
			series={[
				{ key: 'deposit', color: '#22C55E' },
				{ key: 'withdrawal', color: '#EF4444' }
			]}
			padding={{ right: 50, left: 50, bottom: 30, top: 30 }}
			props={{
				bars: { class: 'stroke-transparent', radius: 0 },
				grid: { class: 'stroke-text-3/20 stroke-1' },
				xAxis: {
					class: 'fill-text-3',
					ticks: tickInterval,
					format: (d: Date) => d.toLocaleDateString()
				},
				highlight: { area: { class: 'fill-neutral-500/10' } },
				yAxis: {
					class: 'fill-text-3',
					format: (value: number) => formatCurrency(value, currency)
				},
				tooltip: {
					root: { class: 'bg-bg-2 border text-text-3' },
					item: {
						format: (value: number) => formatCurrency(value, currency)
					}
				}
			}}
			tooltip={{
				mode: 'voronoi'
			}}
		/>
	</div>
</div>
