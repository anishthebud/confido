<script lang="ts">
	import { formatCurrency } from '$lib/utils';

	let { loanPayments, currency = 'USD' } = $props();
</script>

<div class="h-full overflow-hidden rounded border bg-bg-2 p-6">
	<div class="flex h-full flex-col gap-3">
		<h5>Loan Payments</h5>
		{#if loanPayments.length > 0}
			<div class="flex h-full w-full flex-col gap-y-4 overflow-scroll rounded border">
				<table>
					<thead>
						<tr>
							<th>Frequency</th>
							<th>Lender</th>
							<th>EMI Amount</th>
							<th>Total Paid</th>
							<th>Last Paid</th>
						</tr>
					</thead>
					<tbody>
						{#each loanPayments as loanPayment}
							<tr>
								<td>{loanPayment.frequency}</td>
								<td>{loanPayment.lender}</td>
								<td
									><span class="font-bold">
										{formatCurrency(Number(loanPayment.emiAmount), currency)}
									</span></td
								>
								<td
									><span class="font-bold">
										{formatCurrency(Number(loanPayment.totalPaid), currency)}
									</span></td
								>
								<td>
									{new Date(loanPayment.lastPaidDate).toLocaleDateString()}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<p>The bank statement does not have any identifiable loan payments.</p>
		{/if}
	</div>
</div>
