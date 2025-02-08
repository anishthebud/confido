<script lang="ts">
	import { Text, PieChart } from 'layerchart';
	import { formatCurrency } from '$lib/utils';
	import type { BillInsight } from '$lib/types';
	import { onMount } from 'svelte';
	let { billInsights, currency = 'USD' } = $props();

	interface BillCategory {
		type: string;
		totalAverageAmount: number;
	}

	let billsByCategory: BillCategory[] = $state([
		{ type: 'Electricity', totalAverageAmount: 0 },
		{ type: 'Water', totalAverageAmount: 0 },
		{ type: 'Internet', totalAverageAmount: 0 },
		{ type: 'Gas', totalAverageAmount: 0 },
		{ type: 'Credit Card', totalAverageAmount: 0 },
		{ type: 'Phone', totalAverageAmount: 0 },
		{ type: 'Rent', totalAverageAmount: 0 },
		{ type: 'Salary', totalAverageAmount: 0 },
		{ type: 'Subscription', totalAverageAmount: 0 },
		{ type: 'Other', totalAverageAmount: 0 }
	]);

	const frequencyFactors = {
		Weekly: 4,
		Monthly: 1,
		Quarterly: 1 / 3,
		'Half-yearly': 1 / 6,
		Yearly: 1 / 12
	};

	let highest: BillCategory = $state({ type: '', totalAverageAmount: 0 });
	let total: number = $state(0);
	let percentage: string = $state('0');

	onMount(() => {
		billInsights?.forEach((bill: BillInsight) => {
			const category = billsByCategory.find((cat) => cat.type === bill.type);
			const factor = frequencyFactors[bill.frequency];
			if (category) {
				category.totalAverageAmount += Number(bill.averageAmount * factor);
			}
		});

		billsByCategory = billsByCategory.filter((cat) => cat.totalAverageAmount > 0);

		highest = billsByCategory.reduce((max, bill) =>
			bill.totalAverageAmount > max.totalAverageAmount ? bill : max
		);
		total = billsByCategory.reduce((sum, bill) => sum + bill.totalAverageAmount, 0);
		percentage = ((highest.totalAverageAmount / total) * 100).toFixed(1);
	});

	const colors = [
		'#2E86C1',
		'#E74C3C',
		'#27AE60',
		'#8E44AD',
		'#F39C12',
		'#16A085',
		'#D35400',
		'#2C3E50',
		'#C0392B',
		'#7D3C98'
	];
</script>

<div class="rounded border bg-bg-2 p-6">
	<div class="flex flex-col gap-3">
		<h5>Bills By Category</h5>
		<div class="flex h-56 w-full">
			<PieChart
				data={billsByCategory}
				key="type"
				value="totalAverageAmount"
				outerRadius={100}
				innerRadius={80}
				cornerRadius={4}
				padAngle={0.02}
				renderContext="svg"
				cRange={colors}
				props={{
					tooltip: {
						root: { class: 'bg-bg-2 border text-text-3' },
						item: {
							format: (value: number) => formatCurrency(value, currency)
						}
					}
				}}
				><svelte:fragment slot="aboveMarks">
					<Text
						value={formatCurrency(
							billsByCategory.reduce((acc: number, curr) => acc + curr.totalAverageAmount, 0),
							currency
						)}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-text-2 text-xl font-bold"
					/>
					<Text
						value="Avg Monthly Bill"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-text-3 text-xs"
						dy={20}
					/>
				</svelte:fragment>
			</PieChart>
		</div>
		{#if billsByCategory.length > 0}
			<p class="text-center">
				<span class="font-semibold text-text-2">
					{highest.type}
				</span>
				is the highest monthly bill, accounting for
				<span class="font-semibold text-text-2">{percentage}%</span> of total monthly bills.
			</p>
		{/if}
	</div>
</div>
