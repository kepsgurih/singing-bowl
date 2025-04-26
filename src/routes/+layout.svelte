<script>
	import '../app.css';
	let { children } = $props();
	import posthog from 'posthog-js'
import { browser } from '$app/environment';
import { onMount } from 'svelte';

onMount(() => {
  if (browser) {
    posthog.init(
      'phc_C1EJZkDlXSEi6F1dfRdoSeVCVvUWd69SCtjd11UoMHk',
      {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      }
    )
  }
});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		type="text/css"
		href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
	/>
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</svelte:head>
{@render children()}
