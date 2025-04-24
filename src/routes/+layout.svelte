<script>
	import '../app.css';
	let { children } = $props();
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
