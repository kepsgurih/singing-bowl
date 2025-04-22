<script>
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col items-center bg-gradient-to-r from-violet-200 to-pink-200">
	{@render children()}

	<footer class="mt-auto py-8 text-xs text-gray-400">
		<p>&copy; {new Date().getFullYear()} Kepsgurih. All rights reserved.</p>
	</footer>
</div>
