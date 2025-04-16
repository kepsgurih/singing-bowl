<script>
	import '../../app.css';
</script>

<div class="min-h-screen bg-gradient-to-br from-[#f0fdfa] to-[#ccfbf1]">
	<slot />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

	:global(.font-playfair) {
		font-family: 'Playfair Display', serif;
	}
</style> 