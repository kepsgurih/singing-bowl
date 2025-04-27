<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { confirmClass } from '$lib/stores/classConfirm';

	let loading = $state(true);
    
	onMount(() => {
		if (confirmClass) {
			goto(`/confirm/${$confirmClass}`).then(() => {
				loading = false;
			});
		} else {
			loading = false;
		}
	});
</script>

{#if loading}
	<p>Loading...</p>
{/if}
