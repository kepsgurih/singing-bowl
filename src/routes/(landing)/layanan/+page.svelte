<script>
	import { Music, Clock, MapPin, ArrowRight, Phone, Users } from 'lucide-svelte';

	let services = [
		{
			id: 'harmoni-anak',
			name: 'Harmoni Anak',
			description:
				'Sesi khusus untuk anak-anak yang membantu meningkatkan fokus, kreativitas, dan ketenangan. Dirancang dengan pendekatan yang menyenangkan.',
			duration: '45 menit',
			participants: 'Maksimal 5 anak (usia 6-12 tahun)',
			location: 'Studio kami',
			price: 'Rp 350.000',
			icon: 'child'
		},
		{
			id: 'resonansi-digital',
			name: 'Resonansi Digital',
			description:
				'Sesi online yang membawa pengalaman sound healing ke rumah Anda. Nikmati getaran harmonis singing bowl melalui perangkat audio berkualitas tinggi.',
			duration: '60 menit',
			location: 'Zoom atau Google Meet',
			price: 'Rp 250.000',
			icon: 'digital'
		},
		{
			id: 'sentuhan-pribadi',
			name: 'Sentuhan Pribadi',
			description:
				'Sesi one-on-one yang disesuaikan dengan kebutuhan spesifik Anda. Fokus pada area yang membutuhkan penyembuhan dan keseimbangan.',
			duration: '60 menit',
			location: 'Studio kami atau kunjungan ke rumah',
			price: 'Rp 500.000',
			icon: 'personal'
		},
		{
			id: 'perjalanan-mendalam',
			name: 'Perjalanan Mendalam',
			description:
				'Sesi pribadi yang lebih panjang untuk pengalaman penyembuhan yang mendalam. Termasuk konsultasi dan teknik pernapasan.',
			duration: '120 menit',
			location: 'Studio kami (lingkungan premium)',
			price: 'Rp 850.000',
			icon: 'deep'
		},
		{
			id: 'harmoni-kelompok',
			name: 'Harmoni Kelompok',
			description:
				'Pengalaman healing bersama dalam kelompok kecil. Rasakan energi kolektif yang memperkuat efek penyembuhan.',
			duration: '90 menit',
			participants: 'Maksimal 8 peserta',
			location: 'Studio kami',
			price: 'Rp 300.000',
			icon: 'group'
		},
		{
			id: 'pasangan-harmonis',
			name: 'Pasangan Harmonis',
			description:
				'Sesi khusus untuk pasangan yang ingin meningkatkan koneksi dan keselarasan. Sempurna untuk anniversary atau momen spesial.',
			duration: '90 menit',
			location: 'Studio kami (ruangan premium)',
			price: 'Rp 750.000',
			icon: 'couple'
		},
		{
			id: 'korporat-mindful',
			name: 'Korporat Mindful',
			description:
				'Program khusus untuk perusahaan yang ingin meningkatkan kesejahteraan karyawan dan produktivitas tim.',
			duration: '3-4 jam (disesuaikan)',
			participants: 'Hingga 20 peserta',
			location: 'Kantor Anda atau venue pilihan',
			price: 'Hubungi Kami',
			icon: 'corporate'
		},
		{
			id: 'retret-transformasi',
			name: 'Retret Transformasi',
			description:
				'Program retret selama 2 hari yang menggabungkan sound healing, meditasi, dan teknik pernapasan untuk transformasi mendalam.',
			duration: '2 hari (menginap)',
			participants: 'Maksimal 12 peserta',
			location: 'Villa eksklusif di Puncak/Bali',
			price: 'Rp 4.500.000',
			icon: 'retreat'
		}
	];
</script>

<svelte:head>
	<title>Vickya - Layanan Sound Healing</title>
	<meta name="description" content="Temukan berbagai layanan sound healing kami yang dirancang untuk memberikan pengalaman penyembuhan yang unik dan transformatif." />
	<meta property="og:title" content="Vickya - Layanan Sound Healing" />
	<meta property="og:description" content="Temukan berbagai layanan sound healing kami yang dirancang untuk memberikan pengalaman penyembuhan yang unik dan transformatif." />
	<meta property="og:image" content="https://www.theohmstore.co/cdn/shop/articles/Untitled_design_17.png" />
	<meta property="og:url" content="https://vickya.com" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Vickya" />
</svelte:head>

<main class="py-16 px-4">
	<div class="container mx-auto max-w-6xl">
		<div class="text-center mb-16">
			<h1 class="text-4xl font-bold text-[#134e4a] mb-4">Layanan Kami</h1>
			<p class="text-lg text-[#0f766e] max-w-2xl mx-auto">
				Temukan layanan sound healing yang tepat untuk kebutuhan Anda. Setiap sesi dirancang untuk
				memberikan pengalaman penyembuhan yang unik dan transformatif.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service}
				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h2 class="text-xl font-semibold text-[#134e4a] mb-2">{service.name}</h2>
					<p class="text-[#0f766e] mb-3">{service.description}</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>{service.duration}</span>
					</div>
					{#if service.participants}
						<div class="flex items-center gap-2 text-[#0d9488] mb-1">
							<Users class="h-4 w-4" />
							<span>{service.participants}</span>
						</div>
					{/if}
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>{service.location}</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">{service.price}</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-16 text-center">
			<a
				href="/auth/register"
				class="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium px-6 py-3 rounded-lg transition-colors"
			>
				Daftar Sekarang
				<ArrowRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</main>
