<script lang="ts">
	import CanvasCalendar from './canvascalendar.svelte';
	import { goto } from '$app/navigation';
	import { calendarEvents } from './eventStore.svelte';

	type thing = {
		time: Date;
		name: string;
	};

	type recurringEvent = {
		alarm?: boolean;
		name: string;
		color: string;
		time: Date;
		repeat: string;
	};

	let recurringEvents: recurringEvent[] = [];
	let newEvent = '';
	let selectedTime = '08:00';
	let selectedColor = '#3b82f6';
	let repeat = 'daily';
	let view = 'calendar'; // Switch between "calendar" and "recurring"


	function addRecurringEvent() {
		if (newEvent.trim() !== '') {
			const [hours, minutes] = selectedTime.split(':');
			const date = new Date();
			date.setMinutes(Number(minutes));
			date.setHours(Number(hours));

			recurringEvents = [
				...recurringEvents,
				{ time: date, name: newEvent, color: selectedColor, repeat, alarm: false }
			];
			newEvent = '';
		}
	}


</script>

<div class="container">
	<div class="switch">
		<button on:click={() => (view = 'calendar')} class:active={view === 'calendar'}
			>Daily View</button
		>
		<button on:click={() => (view = 'recurring')} class:active={view === 'recurring'}
			>Recurring Events</button
		>
	</div>

	{#if view === 'calendar'}
		<CanvasCalendar />
		<div class="input-bar">
			<button on:click={() => goto("create-event")}>✓</button>
			<button on:click={() => goto("create-event")}>+</button>
		</div>
	{:else}
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
			<input type="text" placeholder="Recurring event..." bind:value={newEvent} />
			<select bind:value={repeat}>
				<option value="daily">Daily</option>
				<option value="weekly">Weekly</option>
			</select>
			<input type="color" bind:value={selectedColor} />
			<button on:click={addRecurringEvent}>+</button>
		</div>
	{/if}
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
</style>
