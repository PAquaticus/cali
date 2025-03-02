<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CalendarEvent } from '$lib/types/component-types';
	import { isCalendarEvent } from '$lib/types/component-types';
	import { addCalendarEvent } from '../eventStore.svelte';
	let newEvent: Partial<CalendarEvent> = {};
	let startTime: String = '';
	let endTime: String = '';

	const convertStringToDate = (timeString: String) => {
		const [hours, minutes] = timeString.split(':');
		let newDate = new Date();
		newDate.setHours(Number(hours), Number(minutes));
		return newDate;
	};

	const saveEvent = (newEvent: Partial<CalendarEvent>) => {
		const saveableEvent: Partial<CalendarEvent> = {
			pushNotification: false,
			reoccuring: false,
			...newEvent,
			startTime: convertStringToDate(startTime),
			endTime: convertStringToDate(endTime)
		};

		console.log(saveableEvent, isCalendarEvent(saveableEvent));

		if (isCalendarEvent(saveableEvent)) {
			addCalendarEvent(saveableEvent);
			goto('/');
		}
	};
</script>

<div class="container">
	<button class="back m-2" on:click={() => goto('/')}>back</button>
	<div class="w-full p-2">
		<input class="name-input" type="text" placeholder="Add Something" bind:value={newEvent.name} />
	</div>
	<input
		class="m-2 w-fit"
		id="appointment-time"
		type="time"
		name="appointment-time"
		bind:value={startTime}
	/>
	<input
		class="w-fit"
		id="appointment-time"
		type="time"
		name="appointment-time"
		bind:value={endTime}
	/>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="exampleCheckbox" bind:checked={newEvent.pushNotification}/>
			Send Notification
		</label>
	</div>

	<div class="checkbox">
		<label>
			<input type="checkbox" id="exampleCheckbox" bind:checked={newEvent.reoccuring}/>
			Is reoccuring 
		</label>
	</div>

	<button class="submit" on:click={() => saveEvent(newEvent)}>✓</button>
</div>

<style>
	.name-input {
		width: 100%;
	}

	.checkbox {
		width: fit-content;
		margin: 0.3rem 0 0.6rem 0.5rem;
		padding: 0.5rem 0.5rem 0.5rem 0.3rem;
		background: var(--input-bg);
		border: 1px solid var(--input-border);
		border-radius: 8px;
		color: var(--text-color);
	}

	input[type='time'],
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
		padding: 0.4rem 1rem;
		background: var(--input-bg);
		border: 1px solid var(--input-border);
		margin-bottom: 2rem;
	}

	button {
		padding: 0.6rem 1rem;
		background: var(--accent-blue);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.2rem;
		cursor: pointer;
		transition: background 0.3s;
	}

	.submit {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
	}

	input[type='text']:focus {
		border-color: var(--accent-blue);
	}
</style>
