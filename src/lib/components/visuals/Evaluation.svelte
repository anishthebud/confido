<script lang="ts">
	import { Arc, Chart, Svg, Text, Group } from 'layerchart';
	let { evaluation, overview } = $props();

	const colors = {
		high: '#22C55E',
		medium: '#EAB308',
		low: '#EF4444'
	};

	const statuses = {
		high: 'High',
		medium: 'Moderate',
		low: 'Low'
	};

	const messages = {
		high: {
			title: 'High Loan Approval Likelihood',
			text: 'Strong financial profile. Regular income, healthy account balance, and good payment history suggest high loan approval probability.'
		},
		medium: {
			title: 'Moderate Loan Approval Likelihood',
			text: 'Mixed financial indicators. Some stability in income and payments, but areas for improvement exist.'
		},
		low: {
			title: 'Low Loan Approval Likelihood',
			text: 'Multiple risk factors identified. Irregular income, high existing debt, or payment issues may affect loan approval.'
		}
	};

	let color = evaluation > 66 ? colors.high : evaluation > 33 ? colors.medium : colors.low;
	let status = evaluation > 66 ? statuses.high : evaluation > 33 ? statuses.medium : statuses.low;
	let message = evaluation > 66 ? messages.high : evaluation > 33 ? messages.medium : messages.low;
</script>

<div class="rounded border bg-bg-2 p-6">
	<div class="flex flex-col gap-3">
		<h5>Evaluation</h5>
		<div class="-mb-12 flex h-40 w-full">
			<Chart>
				<Svg center>
					<Group y={16}>
						<Arc
							value={evaluation}
							range={[-90, 90]}
							outerRadius={90}
							innerRadius={70}
							cornerRadius={4}
							fill={color}
							track={{ class: 'fill-gray-500/10' }}
						>
							<Text
								value={Math.round(evaluation) + '%'}
								textAnchor="middle"
								verticalAnchor="end"
								fill={color}
								class="text-4xl font-bold"
							/>
						</Arc>
					</Group>
				</Svg>
			</Chart>
		</div>
		<div class="flex flex-col justify-center gap-y-1 text-center">
			<h6 class="text-text-2">{message.title}</h6>
			<p>{overview}</p>
		</div>
	</div>
</div>
