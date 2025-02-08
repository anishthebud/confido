<script lang="ts">
	import type { Transaction } from '$lib/types';
	import { formatCurrency } from '$lib/utils';
	import { onMount } from 'svelte';

	let { transactions, currency } = $props();

	let totalDeposits: number = $state(0);
	let totalWithdrawals: number = $state(0);

	let averageMonthlyDeposits: number = $state(0);
	let averageMonthlyWithdrawals: number = $state(0);

	onMount(() => {
		totalDeposits = transactions.reduce((acc: number, t: Transaction) => {
			if (t.amount > 0) {
				return acc + 1;
			}
			return acc;
		}, 0);

		totalWithdrawals = transactions.reduce((acc: number, t: Transaction) => {
			if (t.amount < 0) {
				return acc + 1;
			}
			return acc;
		}, 0);

		const firstDate = new Date(transactions[0].date);
		const lastDate = new Date(transactions[transactions.length - 1].date);
		const monthsDiff =
			(lastDate.getFullYear() - firstDate.getFullYear()) * 12 +
			(lastDate.getMonth() - firstDate.getMonth()) +
			1;

		averageMonthlyDeposits = Math.round(totalDeposits / monthsDiff);
		averageMonthlyWithdrawals = Math.round(totalWithdrawals / monthsDiff);
	});
</script>

<div class="h-full overflow-hidden rounded border bg-bg-2 p-6">
	<div class="flex h-full flex-col gap-3">
		<h5>Transactions</h5>
		<div class="flex h-[489.33px] w-full flex-col gap-y-4 overflow-scroll rounded border">
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{#each transactions as transaction}
						<tr>
							<td>{new Date(transaction.date).toLocaleDateString()}</td>
							<td class="max-w-40 truncate whitespace-nowrap">{transaction.description}</td>
							<td
								><span
									class="{transaction.amount > 0 ? 'text-green-500' : 'text-red-500'} font-bold"
								>
									{formatCurrency(transaction.amount, currency)}
								</span></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="flex flex-col gap-y-1">
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2">Total Deposits:</span
				>
				<span class="truncate">{totalDeposits}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2"
					>Total Withdrawals:</span
				>
				<span class="truncate">{totalWithdrawals}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2"
					>Average Monthly Deposits:</span
				>
				<span class="truncate">{averageMonthlyDeposits}</span>
			</p>
			<p class="flex justify-between text-right">
				<span class="min-w-[110px] truncate text-left font-medium text-text-2"
					>Average Monthly Withdrawals:</span
				>
				<span class="truncate">{averageMonthlyWithdrawals}</span>
			</p>
		</div>
	</div>
</div>
