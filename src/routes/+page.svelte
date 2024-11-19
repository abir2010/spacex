<script>
	import Chart from '../components/Chart.svelte';
	import Header from '../components/Header.svelte';
	import Map from '../components/Map.svelte';
	import Table from '../components/Table.svelte';
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Header />
	<div class="mt-[50px] justify-between gap-10 lg:flex lg:px-[100px]">
		<Table {data} />
		<div class="flex w-full flex-col gap-4">
			<Map {data} />
			<Chart {data} />
		</div>
	</div>
</section>

<style>
</style>
