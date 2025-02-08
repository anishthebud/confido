<script lang="ts">
	import { formatCurrency, sameDay } from '$lib/utils';
	import { LineChart } from 'layerchart';
	import { onMount } from 'svelte';
	let { transactions, currency = 'USD' } = $props();

	interface BalanceDate {
		date: Date;
		balance: number;
	}

	let balanceHistory: BalanceDate[] = $state([]);

	let tickDates: Date[] = $state([]);

	onMount(() => {
		const firstDate = new Date(transactions[0].date);
		const lastDate = new Date(transactions[transactions.length - 1].date);

		const totalDays = Math.floor(
			(lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
		);
		const interval = Math.ceil(totalDays / 10);

		for (let i = 0; i <= 9; i++) {
			let date = new Date(firstDate);
			date.setDate(date.getDate() + interval * i);
			tickDates.push(date);
		}

		const currDate = firstDate;
		let currTransactionIndex = 0;

		while (currDate.getTime() <= lastDate.getTime()) {
			let exists = false;
			while (sameDay(new Date(transactions[currTransactionIndex].date), currDate)) {
				exists = true;
				if (currTransactionIndex == transactions.length - 1) {
					balanceHistory.push({
						date: new Date(currDate.getTime()),
						balance: transactions[currTransactionIndex].balance
					});
					break;
				}
				currTransactionIndex++;
			}
			if (currTransactionIndex != transactions.length - 1) {
				balanceHistory.push({
					date: new Date(currDate.getTime()),
					balance: transactions[currTransactionIndex - 1].balance
				});
			}
			if (!exists) {
				balanceHistory.push({
					date: new Date(currDate.getTime()),
					balance: balanceHistory[balanceHistory.length - 1].balance
				});
			}
			currDate.setDate(currDate.getDate() + 1);
		}
	});
</script>

<div class="rounded border bg-bg-2 p-6">
	<div class="flex flex-col gap-3">
		<h5>Balance History</h5>
	</div>
	<div class="flex h-64 w-full items-center justify-center">
		<LineChart
			data={balanceHistory}
			x="date"
			y="balance"
			series={[{ key: 'balance', color: '#3B82F6' }]}
			props={{
				grid: { class: 'stroke-text-3/20 stroke-1' },
				xAxis: {
					class: 'fill-text-3',
					ticks: tickDates,
					format: (d: Date) => d.toLocaleDateString()
				},
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
			padding={{ right: 50, left: 50, bottom: 30, top: 40 }}
			tooltip={{
				mode: 'voronoi'
			}}
		/>
	</div>
</div>
