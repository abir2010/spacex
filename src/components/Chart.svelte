<script>
	import { Card, Chart } from 'flowbite-svelte';

	let { data } = $props();
	let { data: allData, error, loading } = data;

	const success_rate = (success, attempt) => {
		return Number(((success / attempt) * 100).toFixed(2));
	};
	let seriesData = allData.map((item) => {
		if (item.successful_landings !== 0)
			return success_rate(item.successful_landings, item.attempted_landings);
		else return 0;
	});
	let seriesName = allData.map((item) => item.full_name);

	const options = {
		series: seriesData,
		colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],
		chart: {
			height: 222,
			width: '100%',
			type: 'donut'
		},
		stroke: {
			colors: ['transparent'],
			lineCap: ''
		},
		legend: {
			show: false // Add this line to hide the legend
		},
		labels: seriesName,
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: 20
						},
						total: {
							showAlways: true,
							show: true,
							label: 'Landing Pads',
							fontFamily: 'Inter, sans-serif',
							formatter: function (w) {
								return allData.length;
							}
						},
						value: {
							show: true,
							fontFamily: 'Inter, sans-serif',
							offsetY: -20,
							formatter: function (value) {
								return value + 'k';
							}
						}
					},
					size: '80%'
				}
			}
		},
		grid: {
			padding: {
				top: -2
			}
		},
		dataLabels: {
			enabled: false
		}
	};
</script>

<Card size class="">
	<div class="flex w-full items-start justify-between">
		<div class="flex-col items-center">
			<div class="mb-1 flex items-center">
				<h5 class="text-md me-1 font-bold leading-none text-gray-900 dark:text-white">
					Successful Rate Chart
				</h5>
			</div>
		</div>
	</div>

	<Chart {options} class="py-6" />
</Card>
