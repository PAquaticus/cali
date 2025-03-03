<script lang="ts">
	import CanvasCalendar from './canvascalendar.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="container">
	<div class="switch">
		<button class:active={true}>Daily View</button>
		<button on:click={() => goto('reocurring-events')}>Recurring</button>
		<button on:click={() => goto('settings')}>Settings</button>
	</div>

	<CanvasCalendar />
	<div class="input-bar">
		<button on:click={() => goto('create-event')}>✓</button>
		<button on:click={() => goto('create-event')}>+</button>
	</div>
</div>

<style>
	.container {
		position: fixed;
		top: 0;
		height: 100vh;
		min-height: 100vh;
		min-width: 100%;
		max-width: 100%;
		overflow-y: scroll;
		background: var(--bg-color);
		color: var(--text-color);
		padding: 1rem;
	}

	.switch {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.switch button {
		background: var(--card-bg);
		color: var(--text-color);
		border: 1px solid var(--input-border);
		padding: 0.5rem 1rem;
		margin: 0 0.5rem;
		cursor: pointer;
		border-radius: 6px;
	}

	.switch button.active {
		background: var(--accent-blue);
		color: white;
	}

	.input-bar {
		position: fixed;
		bottom: 1rem;
		display: flex;
		padding-right: 2rem;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
	}

	button {
		margin-left: 0.5rem;
		padding: 0.6rem 1rem;
		background: var(--accent-blue);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.2rem;
		cursor: pointer;
		transition: background 0.3s;
	}

	button:hover {
		background: var(--hover-blue);
	}

</style>
