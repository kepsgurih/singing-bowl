<script>
	import { MapPin, Phone } from 'lucide-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-gradient-to-b from-[#f0fdfa] to-[#f6f7f5] font-poppins">
	<header class="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-[#ccfbf1]">
		<div class="container mx-auto px-4 py-4 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<img src="/singing-bowl.png" class="h-6 w-6" alt="singing bowl" />
				<span class="text-xl font-semibold text-[#115e59] font-playfair">Vickya</span>
			</div>
			<nav class="hidden md:flex items-center gap-8">
				<a href="/" class="text-[#0f766e] hover:text-[#134e4a] transition-colors"> Beranda </a>
				<a href="/layanan" class="text-[#0f766e] hover:text-[#134e4a] transition-colors">
					Layanan
				</a>
				<a href="/testimoni" class="text-[#0f766e] hover:text-[#134e4a] transition-colors">
					Testimoni
				</a>
				<a href="/kontak" class="text-[#0f766e] hover:text-[#134e4a] transition-colors">
					Kontak
				</a>
			</nav>
			<!-- svelte-ignore event_directive_deprecated -->
			<button
				on:click={() => (window.location.href = '/auth/login')}
				class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-lg transition-colors font-medium"
			>
				Daftar Sekarang
			</button>
		</div>
	</header>
	{@render children()}
	<footer id="contact" class="bg-[#134e4a] text-white py-12 px-4">
		<div class="container mx-auto max-w-6xl">
			<div class="grid md:grid-cols-3 gap-8">
				<div>
					<div class="flex items-center gap-2 mb-4">
						<img src="/singing-bowl.png" class="h-6 w-6" alt="singing bowl" />
						<span class="text-xl font-semibold text-white font-playfair">Vickya</span>
					</div>
					<p class="text-[#5eead4] max-w-xs">
						Menyediakan layanan sound healing profesional untuk membantu Anda menemukan keseimbangan
						dan kedamaian batin.
					</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-4 text-white font-playfair">Kontak</h3>
					<div class="space-y-3">
						<p class="flex items-center gap-2">
							<Phone class="h-5 w-5 text-[#5eead4]" />
							<span>+62 851 7329 7559</span>
						</p>
						<p class="flex items-center gap-2">
							<MapPin class="h-5 w-5 text-[#5eead4]" />
							<span
								>Harvest City, Cluster Edelweiss <br />Blok EB 11 No. 10, Cipenjo, Cileungsi<br /> Kab.
								Bogor, Jawa Barat</span
							>
						</p>
					</div>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-4 text-white font-playfair">Jam Operasional</h3>
					<div class="space-y-2">
						<p>Senin - Jumat: 09.00 - 20.00</p>
						<p>Sabtu: 10.00 - 18.00</p>
						<p>Minggu: 10.00 - 15.00</p>
					</div>
				</div>
			</div>
			<div class="border-t border-[#115e59] mt-8 pt-8 text-center text-[#5eead4]">
				<p>&copy; {new Date().getFullYear()} Kepsgurih. Hak Cipta Dilindungi.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		font-family: 'Poppins', sans-serif;
	}

	.font-playfair {
		font-family: 'Playfair Display', serif;
	}
</style>
