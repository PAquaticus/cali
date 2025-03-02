<script lang="ts">
	import { onMount } from 'svelte';

	type CalendarTask = {
		pushNotification: boolean;
		name: string;
		startTime: Date;
	};

	type CalendarEvent = {
		reoccuring: boolean;
		pushNotification: boolean;
		name: string;
		startTime: Date;
		endTime: Date;
	};

	let canvas: HTMLCanvasElement | null;
	let ctx: CanvasRenderingContext2D | null;
	let scrollContainer: HTMLElement | null;

	const start = new Date();
	start.setHours(16, 0);

	const end = new Date();
	end.setHours(17, 0);

	const events: CalendarEvent[] = [
		{ reoccuring: false, pushNotification: false, name: 'foo', startTime: start, endTime: end }
	];

	onMount(() => {
		canvas = document.getElementById('calendarCanvas') as HTMLCanvasElement;
		if (!canvas) {
			throw Error('No Canvas');
		}

		ctx = canvas.getContext('2d');
		if (!ctx) {
			throw Error('Canvas has no xontext');
		}
		drawCalendar();
		canvas.addEventListener('click', handleCanvasClick);

		if (!scrollContainer) {
			throw Error('Scrollcontainer is not ready yet');
		}
		scrollContainer.scrollTop = 300;
		// Set the scroll position
	});

	$effect(() => {
		resizeCanvas();
	});

	function resizeCanvas() {
		if (canvas) {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			drawCalendar();
		}
	}

	function drawCalendar() {
		if (!canvas || !ctx) {
			throw 'initialization error = canvas or ctx not present during draw';
		}
		const currentCanvas = canvas;
		const currentCtx = ctx;

		const startHour = 0;
		const endHour = 24;
		const cellHeight = currentCanvas.height / endHour;
		const cellWidth = currentCanvas.width;
		const numHours = endHour - startHour;

		// Clear the currentCanvas
		currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);

		// Draw the grid and hour labels
		for (let hour = startHour; hour < endHour; hour++) {
			const y = hour * cellHeight;
			currentCtx.strokeStyle = '#ddd';
			currentCtx.lineWidth = 1;
			currentCtx.beginPath();
			currentCtx.moveTo(0, y);
			currentCtx.lineTo(cellWidth, y);
			currentCtx.stroke();

			// Draw hour labels
			currentCtx.fillStyle = '#fff';
			currentCtx.font = '14px Arial';
			currentCtx.textAlign = 'left';
			currentCtx.fillText(`${hour.toString().padStart(2, '0')}:00`, 10, y + 15);
		}

		// Draw events
		events.forEach((event) => {
			const startMinutes = event.startTime.getHours() * 60 + event.startTime.getMinutes();
			const startY = (startMinutes / 60) * cellHeight;
			const duration = (event.endTime - event.startTime) / (60 * 1000);
			const height = (duration / 60) * cellHeight;

			currentCtx.fillStyle = '#ff6347'; // Tomato color for events
			currentCtx.fillRect(60, startY + 5, cellWidth - 70, height - 10);

			currentCtx.fillStyle = '#000';
			currentCtx.textAlign = 'left';
			currentCtx.fillText(event.name, 70, startY + height / 2 + 5);

			// Store event details for click detection
			event.x = 60;
			event.y = startY + 5;
			event.width = cellWidth - 70;
			event.height = height - 10;
		});
	}

	function handleCanvasClick(event) {
		if (!canvas) {
			throw Error('No Canvas');
		}
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		events.forEach((event) => {
			if (
				x >= event.x &&
				x <= event.x + event.width &&
				y >= event.y &&
				y <= event.y + event.height
			) {
				alert(`Clicked on event: ${event.name}`);
			}
		});
	}
</script>

<div bind:this={scrollContainer} class="scrollable-container">
	<canvas id="calendarCanvas"></canvas>
</div>

<style>
	canvas {
		width: 100%;
		height: 1200px;
	}

	.scrollable-container {
		width: 100%;
		height: 100%;
		background-color: #1e1e1e; /* Set background color to black */
	}

	canvas {
		background-color: #1e1e1e; /* Set canvas background color to black */
	}
</style>
