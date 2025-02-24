<script lang="ts">
	import '../app.css';
	let { children } = $props();

	// handle the beforeinstallprompt event
	const beforeInstallPrompt = (e: any) => {
		// prevent the install dialog from appearing too early
		//e.preventDefault();

		// store the event for later use
		//window.deferredPrompt = e;

		console.log('foo');

		e.prompt();
	};
</script>

<svelte:window on:beforeinstallprompt={beforeInstallPrompt} />

<div>
	{@render children()}
</div>

<style>
	div {
		min-width: 100%;
		background-color: blue;
	}
</style>
