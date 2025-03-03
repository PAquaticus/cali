<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { clearCalendarEvents } from '../eventStore.svelte';

	// State for push notification permission
	let pushPermission = 'default';
	let isPushEnabled = false;

	// Check if push notifications are supported
	const isPushSupported = () => {
		try {
			return 'serviceWorker' in navigator && 'PushManager' in window;
		} catch {}
	};

	// Function to check current permission status
	const checkPushPermission = async () => {
		if (!isPushSupported()) return;

		try {
			// Get the current permission state
			pushPermission = Notification.permission;
			isPushEnabled = pushPermission === 'granted';
		} catch (error) {
			console.error('Error checking push notification permission:', error);
		}
	};

	// Function to request push notification permission
	const requestPushPermission = async () => {
		if (!isPushSupported()) {
			alert('Push notifications are not supported by your browser');
			isPushEnabled = false;
			return;
		}

		try {
			// Request permission
			const permission = await Notification.requestPermission();
			pushPermission = permission;
			isPushEnabled = permission === 'granted';

			if (permission === 'denied') {
				alert(
					'You have denied push notification permissions. Please enable them in your browser settings if you wish to receive notifications.'
				);
				isPushEnabled = false;
			}
		} catch (error) {
			console.error('Error requesting push notification permission:', error);
			isPushEnabled = false;
		}
	};

	// Handle checkbox change
	const handlePushToggle = async () => {
		if (!isPushEnabled) {
			await requestPushPermission();
		} else {
			// Note: We can't programmatically revoke permissions
			// Just show a message explaining how to disable permissions manually
			alert('To disable push notifications, please adjust your browser settings.');
		}
	};

	// Check permissions when component mounts
	onMount(() => {
		checkPushPermission();
	});
</script>

<div class="settings-container">
	<button class="back" on:click={() => goto('/')}>back</button>
	<h1>Settings</h1>

	<section class="settings-section">
		<h2>Permissions</h2>

		<div class="permission-item">
			<div class="permission-header">
				<label for="push-toggle" class="permission-label">
					<input
						type="checkbox"
						id="push-toggle"
						bind:checked={isPushEnabled}
						on:change={handlePushToggle}
						disabled={!isPushSupported()}
					/>
					<span>Push Notifications</span>
				</label>
			</div>

			<p class="permission-description">
				{#if !isPushSupported()}
					Your browser doesn't support push notifications.
				{:else if pushPermission === 'granted'}
					You'll receive timely updates about important events and messages.
				{:else if pushPermission === 'denied'}
					Push notifications are currently blocked. To enable them, you'll need to update your
					browser settings.
				{:else}
					Enable notifications to stay updated with important alerts and messages in real-time, even
					when you're not actively using the app.
				{/if}
			</p>

			{#if pushPermission === 'denied'}
				<div class="permission-help">
					<p>To enable notifications in your browser settings:</p>
					<ol>
						<li>Click the lock or info icon in your browser's address bar</li>
						<li>Find "Notifications" in the site settings</li>
						<li>Change the setting from "Block" to "Allow"</li>
					</ol>
				</div>
			{/if}
		</div>
	</section>

	<button on:click={() => clearCalendarEvents()} class="clear-button">Clear Storage</button>
</div>

<style>
	.settings-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.settings-section {
		margin-bottom: 2rem;
		background-color: #fff;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #eee;
	}

	.permission-item {
		margin-bottom: 1rem;
	}

	.permission-header {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.permission-label {
		display: flex;
		align-items: center;
		font-weight: 500;
		font-size: 1.1rem;
		cursor: pointer;
	}

	.permission-label input {
		margin-right: 0.5rem;
		width: 18px;
		height: 18px;
	}

	.permission-description {
		color: #666;
		margin-left: 1.8rem;
		font-size: 0.95rem;
		line-height: 1.4;
	}

	.permission-help {
		margin-top: 0.8rem;
		padding: 0.8rem;
		background-color: #f8f9fa;
		border-radius: 4px;
		font-size: 0.9rem;
		color: #555;
	}

	.permission-help ol {
		margin: 0.5rem 0 0 1.5rem;
		padding: 0;
	}

	.permission-help li {
		margin-bottom: 0.3rem;
	}

	.clear-button {
		width: 100%;
		background-color: red;
		cursor: pointer;
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
