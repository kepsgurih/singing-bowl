<script lang="ts">
	import { goto } from '$app/navigation';

	// ambil children dari props
	let { children } = $props();
</script>

<svelte:head>
	<title>Authorization Vickyaaa</title>
</svelte:head>

{@render children()}
