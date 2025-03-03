<script lang="ts">
	import { goto } from '$app/navigation';
	const recurringEvents: any[] = [];
	let newEventName = '';
	let selectedColor = '';
</script>

<button class="back" on:click={() => goto('/')}>back</button>

<h3>Recurring Events</h3>
<div class="recurring-list">
	{#each recurringEvents as event}
		<div class="recurring-item">
			<span>{event.text} ({event.repeat} at {event.time})</span>
			<div class="color-preview" style="background: {event.color};"></div>
		</div>
	{/each}
</div>

<div class="input-bar">
	<input type="text" placeholder="Recurring event..." bind:value={newEventName} />
	<input type="color" bind:value={selectedColor} />
	<button>+</button>
</div>

<style>
	.recurring-list {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.recurring-item {
		background: var(--card-bg);
		padding: 0.8rem;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
	}

	.color-preview {
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}


	input[type='text'] {
		padding: 0.6rem;
		background: var(--input-bg);
		border: 1px solid var(--input-border);
		border-radius: 8px;
		color: var(--text-color);
		outline: none;
		font-size: 1rem;
	}

	.back {
		background: var(--input-bg);
		border-radius: 8px;
		border: 1px solid var(--input-border);
		color: white;
		cursor: pointer;
		font-size: 1.2rem;
		margin-bottom: 2rem;
		padding: 0.6rem 1rem;
		transition: background 0.3s;
	}
</style>
