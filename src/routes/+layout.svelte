<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins&display=swap');
	main {
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
	}
</style>
