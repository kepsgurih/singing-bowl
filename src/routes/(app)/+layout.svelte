<script>
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col items-center bg-gradient-to-r from-violet-200 to-pink-200">
	{@render children()}

	<footer class="mt-auto py-8 text-xs text-gray-400 text-center">
		<p>&copy; 2025 Kepsgurih. All rights reserved.</p>
		<div class="mt-4 space-x-4">
			<a href="/dashboard" class="text-gray-500 hover:text-gray-700 underline">
				Panel
			</a>
		</div>
	</footer>
</div>
