<script lang="ts">
	import { goto } from "$app/navigation";

	let eventName: string = '';
	let selectedTime: string = '';
</script>

<input class="w-full" type="text" placeholder="Add Something" bind:value={eventName} />
<input
	class="w-fit"
	id="appointment-time"
	type="time"
	name="appointment-time"
	bind:value={selectedTime}
/>

<button class="submit" on:click={() => goto('/')}>✓</button>

<style>
	input[type='time'],
	input[type='text'],
	select,
	input[type='color'] {
		padding: 0.6rem;
		background: var(--input-bg);
		margin-left: 0.3rem;
		border: 1px solid var(--input-border);
		border-radius: 8px;
		color: var(--text-color);
		outline: none;
		font-size: 1rem;
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

	.submit {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
	}

	input[type='text']:focus,
	select:focus {
		border-color: var(--accent-blue);
	}
</style>
