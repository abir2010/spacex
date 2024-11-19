<script>
	import Chart from '../components/Chart.svelte';
	import Header from '../components/Header.svelte';
	import Map from '../components/Map.svelte';
	import Table from '../components/Table.svelte';
	let { data } = $props();

	let selectedStatus = $state('');
</script>

<svelte:head>
	<title>SpaceX | Home</title>
	<meta name="description" content="SpaceX" />
</svelte:head>

<section>
	<Header />
	<div class="mt-[50px] block w-full grid-cols-5 justify-between gap-10 lg:grid lg:px-[100px]">
		<Table {data} {selectedStatus} />
		<div class="col-span-2">
			<Map {data} />
			<Chart {data} />
		</div>
	</div>
</section>

<style>
</style>
