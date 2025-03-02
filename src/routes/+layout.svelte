<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>


<div>
	{@render children()}
</div>

<style>
	:root {
		--bg-color: #1e1e1e;
		--card-bg: #2a2a2a;
		--text-color: #f5f5f5;
		--input-bg: #333;
		--input-border: #444;
		--accent-blue: #3b82f6;
		--hover-blue: #2563eb;
	}

	div {
		min-width: 100%;
        min-height: 100vh;
		background: var(--bg-color);
	}
</style>
