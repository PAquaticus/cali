<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>


<div>
	{@render children()}
</div>

<style>
	div {
		min-width: 100%;
		background-color: blue;
	}
</style>
