<script>
	import Aksel from '$lib/Aksel.svelte';
</script>

<h1>Aksel showcase</h1>

<!-- <Aksel size={200} />
<Aksel size={100} />
<Aksel />
<Aksel /> -->

<!-- no xmas -->
<Aksel xmasMode />

<style>
	:global(*) {
		font-family: monospace;
		color: #444;
	}
</style>
