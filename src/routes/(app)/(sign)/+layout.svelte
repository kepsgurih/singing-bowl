<script lang="ts">
	import { goto } from '$app/navigation';
	import { loadingSession, userSession, accessToken } from '$lib/stores/auth';

	// ambil children dari props
	let { children } = $props();

	// Reaktif statement untuk memeriksa kondisi
	$effect(() => {
		if ($userSession) {
			goto('/confirm');
		}
	});
</script>

<svelte:head>
	<title>Authorization Vickyaaa</title>
</svelte:head>
{#if $loadingSession}
	<div class="text-center justify-center align-center m-auto">
		<div class="font-nanum font-2xl">Loading Session</div>
	</div>
{:else if !$userSession}
	<div class="text-center justify-center align-center m-auto">
		<div class="font-nanum font-2xl">Session Not Found</div>
	</div>
{:else}
	{@render children()}
{/if}
