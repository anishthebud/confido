<script lang="ts">
	import { Text, PieChart } from 'layerchart';
	import { formatCurrency } from '$lib/utils';
	import type { BillInsight } from '$lib/types';
	import { onMount } from 'svelte';
	let { billInsights, currency = 'USD' } = $props();

	interface BillProvider {
		provider: string;
		averageAmount: number;
	}

	let billsByProvider: BillProvider[] = $state([]);

	const frequencyFactors = {
		Weekly: 4,
		Monthly: 1,
		Quarterly: 1 / 3,
		'Half-yearly': 1 / 6,
		Yearly: 1 / 12
	};

	let highest: BillProvider = $state({ provider: '', averageAmount: 0 });
	let total: number = $state(0);
	let percentage: string = $state('0');

	onMount(() => {
		billInsights?.forEach((bill: BillInsight) => {
			const factor = frequencyFactors[bill.frequency];
			billsByProvider.push({
				provider: bill.provider,
				averageAmount: bill.averageAmount * factor
			});
		});

		highest = billsByProvider.reduce((max, bill) =>
			bill.averageAmount > max.averageAmount ? bill : max
		);
		total = billsByProvider.reduce((sum, bill) => sum + bill.averageAmount, 0);
		percentage = ((highest.averageAmount / total) * 100).toFixed(1);
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
		<h5>Bills By Providers</h5>
		<div class="flex h-56 w-full">
			<PieChart
				data={billsByProvider}
				key="provider"
				value="averageAmount"
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
							billsByProvider.reduce((acc: number, curr) => acc + curr.averageAmount, 0),
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
		{#if billsByProvider.length > 0}
			<p class="text-center">
				<span class="font-semibold text-text-2">
					{highest.provider}
				</span>
				is the highest monthly expense, accounting for
				<span class="font-semibold text-text-2">{percentage}%</span> of total monthly bills.
			</p>
		{/if}
	</div>
</div>
