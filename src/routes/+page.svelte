<script>
  let events = [];
  let recurringEvents = [];
  let newEvent = "";
  let selectedTime = "08:00";
  let selectedColor = "#3b82f6";
  let repeat = "daily";
  let view = "calendar"; // Switch between "calendar" and "recurring"

  function addEvent() {
    if (newEvent.trim() !== "") {
      events = [...events, { time: selectedTime, text: newEvent }];
      newEvent = "";
    }
  }

  function addRecurringEvent() {
    if (newEvent.trim() !== "") {
      recurringEvents = [
        ...recurringEvents,
        { time: selectedTime, text: newEvent, color: selectedColor, repeat }
      ];
      newEvent = "";
    }
  }

  function formatTime(hour) {
    return `${hour.toString().padStart(2, "0")}:00`;
  }

  function filterRecurringEvents(hour) {
    return recurringEvents.filter(event => event.time === formatTime(hour));
  }
</script>

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

  .container {
    height: 100vh;
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

  .time-slot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem;
    border-bottom: 1px solid var(--input-border);
    transition: background 0.3s;
    cursor: pointer;
    position: relative;
  }

  .time-slot:hover {
    background: var(--input-border);
  }

  .event {
    background: var(--accent-blue);
    color: white;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .event-list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .recurring-bar {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    opacity: 0.7;
  }

  .input-bar {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    background: var(--card-bg);
    padding: 0.8rem;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 400px;
  }

  input[type="text"], select, input[type="color"] {
    flex: 1;
    padding: 0.6rem;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 8px;
    color: var(--text-color);
    outline: none;
    font-size: 1rem;
  }

  input[type="text"]:focus, select:focus {
    border-color: var(--accent-blue);
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

<div class="switch">
  <button on:click={() => view = "calendar"} class:active={view === "calendar"}>Daily View</button>
  <button on:click={() => view = "recurring"} class:active={view === "recurring"}>Recurring Events</button>
</div>

{#if view === "calendar"}
  <div class="container">
    {#each Array(24) as _, i}
      <div class="time-slot" on:click={() => selectedTime = formatTime(i)}>
        <span>{formatTime(i)}</span>
        {#each filterRecurringEvents(i) as event}
          <div class="recurring-bar" style="background: {event.color};"></div>
        {/each}
        <div class="event-list">
          {#each events.filter(e => e.time === formatTime(i)) as event}
            <div class="event">{event.text}</div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="input-bar">
    <input type="text" placeholder="Add an event..." bind:value={newEvent} on:keydown={(e) => e.key === 'Enter' && addEvent()} />
    <button on:click={addEvent}>+</button>
  </div>

{:else}
  <div class="container">
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
  </div>
{/if}
