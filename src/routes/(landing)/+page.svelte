<script>
	import { Music, Clock, MapPin, ArrowRight, Phone, Users } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Vickya - Temukan Ketenangan Melalui Singing Bowl</title>
	<meta name="description" content="Vickya adalah platform untuk menemukan ketenangan melalui singing bowl. Kami menawarkan sesi sound healing yang akan membantu Anda menemukan keseimbangan dan kedamaian batin." />
  <meta property="og:title" content="Vickya - Temukan Ketenangan Melalui Singing Bowl" />
  <meta property="og:description" content="Vickya adalah platform untuk menemukan ketenangan melalui singing bowl. Kami menawarkan sesi sound healing yang akan membantu Anda menemukan keseimbangan dan kedamaian batin." />
  <meta property="og:image" content="https://www.theohmstore.co/cdn/shop/articles/Untitled_design_17.png" />
  <meta property="og:url" content="https://vickya.com" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Vickya" />
</svelte:head>

<main class="flex-1">
	<section class="py-20 px-4">
		<div class="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
			<div class="flex-1 space-y-6">
				<h1 class="text-4xl md:text-5xl font-bold text-[#134e4a] leading-tight">
					Temukan Ketenangan Melalui <span class="text-[#0d9488]">Singing Bowl</span>
				</h1>
				<p class="text-lg text-[#0f766e] max-w-xl">
					Rasakan sensasi penyembuhan melalui getaran suara yang harmonis dari singing bowl. Kami
					menawarkan sesi sound healing yang akan membantu Anda menemukan keseimbangan dan kedamaian
					batin.
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<button
						class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-4 rounded-xl text-lg transition-colors"
					>
						Daftar Sesi
					</button>
					<button
						class="border border-[#5eead4] text-[#0f766e] hover:bg-[#ccfbf1] px-8 py-4 rounded-xl text-lg transition-colors"
					>
						Pelajari Lebih Lanjut
					</button>
				</div>
			</div>
			<div class="flex-1 relative">
				<div class="absolute -top-6 -left-6 w-full h-full bg-[#d5e0d2] rounded-2xl"></div>
				<img
					src="https://www.theohmstore.co/cdn/shop/articles/Untitled_design_17.png"
					alt="Sound Healing Session"
					width={600}
					height={500}
					class="relative rounded-2xl shadow-lg object-cover"
				/>
			</div>
		</div>
	</section>

	<section class="py-16 px-4 bg-white">
		<div class="container mx-auto max-w-6xl">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-[#134e4a] mb-4">Manfaat Sound Healing</h2>
				<p class="text-[#0f766e] max-w-2xl mx-auto">
					Sound healing menggunakan getaran suara singing bowl untuk memperbaiki keseimbangan energi
					dan meningkatkan kesejahteraan fisik dan mental.
				</p>
			</div>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="bg-[#f6f7f5] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div class="w-14 h-14 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-6">
						<Music class="h-7 w-7 text-[#0f766e]" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-3">Reduksi Stres</h3>
					<p class="text-[#0f766e]">
						Getaran suara membantu menenangkan sistem saraf dan mengurangi hormon stres dalam tubuh.
					</p>
				</div>
				<div class="bg-[#f6f7f5] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div class="w-14 h-14 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-6">
						<Music class="h-7 w-7 text-[#0f766e]" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-3">Peningkatan Tidur</h3>
					<p class="text-[#0f766e]">
						Terapi suara membantu menenangkan pikiran dan menciptakan kondisi ideal untuk tidur yang
						lebih nyenyak.
					</p>
				</div>
				<div class="bg-[#f6f7f5] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div class="w-14 h-14 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-6">
						<Music class="h-7 w-7 text-[#0f766e]" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-3">Keseimbangan Emosi</h3>
					<p class="text-[#0f766e]">
						Frekuensi suara tertentu dapat membantu menyeimbangkan emosi dan meningkatkan perasaan
						bahagia.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section id="services" class="py-16 px-4 bg-gradient-to-b from-[#f6f7f5] to-[#f0fdfa]">
		<div class="container mx-auto max-w-6xl">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-[#134e4a] mb-4">Layanan Kami</h2>
				<p class="text-[#0f766e] max-w-2xl mx-auto">
					Kami menawarkan berbagai sesi sound healing dengan singing bowl yang disesuaikan dengan
					kebutuhan Anda.
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Harmoni Anak</h3>
					<p class="text-[#0f766e] mb-3">
						Sesi khusus untuk anak-anak yang membantu meningkatkan fokus, kreativitas, dan
						ketenangan. Dirancang dengan pendekatan yang menyenangkan.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>45 menit</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<Users class="h-4 w-4" />
						<span>Maksimal 5 anak (usia 6-12 tahun)</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Rp 350.000</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Resonansi Digital</h3>
					<p class="text-[#0f766e] mb-3">
						Sesi online yang membawa pengalaman sound healing ke rumah Anda. Nikmati getaran
						harmonis singing bowl melalui perangkat audio berkualitas tinggi.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>60 menit</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>Zoom atau Google Meet</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Rp 250.000</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Sentuhan Pribadi</h3>
					<p class="text-[#0f766e] mb-3">
						Sesi one-on-one yang disesuaikan dengan kebutuhan spesifik Anda. Fokus pada area yang
						membutuhkan penyembuhan dan keseimbangan.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>60 menit</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>Studio kami atau kunjungan ke rumah</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Rp 500.000</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Perjalanan Mendalam</h3>
					<p class="text-[#0f766e] mb-3">
						Sesi pribadi yang lebih panjang untuk pengalaman penyembuhan yang mendalam. Termasuk
						konsultasi dan teknik pernapasan.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>120 menit</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>Studio kami (lingkungan premium)</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Rp 850.000</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Harmoni Kelompok</h3>
					<p class="text-[#0f766e] mb-3">
						Pengalaman healing bersama dalam kelompok kecil. Rasakan energi kolektif yang memperkuat
						efek penyembuhan.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>90 menit</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Users class="h-4 w-4" />
						<span>Maksimal 8 peserta</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>Studio kami</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Rp 300.000</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Pasangan Harmonis</h3>
					<p class="text-[#0f766e] mb-3">
						Sesi khusus untuk pasangan yang ingin meningkatkan koneksi dan keselarasan. Sempurna
						untuk anniversary atau momen spesial.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>90 menit</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>Studio kami (ruangan premium)</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Rp 750.000</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Korporat Mindful</h3>
					<p class="text-[#0f766e] mb-3">
						Program khusus untuk perusahaan yang ingin meningkatkan kesejahteraan karyawan dan
						produktivitas tim.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>3-4 jam (disesuaikan)</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Users class="h-4 w-4" />
						<span>Hingga 20 peserta</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>Kantor Anda atau venue pilihan</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Hubungi Kami</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Info <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div
					class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-[#ccfbf1] group"
				>
					<div
						class="w-12 h-12 bg-[#d5e0d2] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0d9488] transition-colors"
					>
						<Music class="h-6 w-6 text-[#0f766e] group-hover:text-white transition-colors" />
					</div>
					<h3 class="text-xl font-semibold text-[#134e4a] mb-2">Retret Transformasi</h3>
					<p class="text-[#0f766e] mb-3">
						Program retret selama 2 hari yang menggabungkan sound healing, meditasi, dan teknik
						pernapasan untuk transformasi mendalam.
					</p>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Clock class="h-4 w-4" />
						<span>2 hari (menginap)</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-1">
						<Users class="h-4 w-4" />
						<span>Maksimal 12 peserta</span>
					</div>
					<div class="flex items-center gap-2 text-[#0d9488] mb-3">
						<MapPin class="h-4 w-4" />
						<span>Villa eksklusif di Puncak/Bali</span>
					</div>
					<div class="flex justify-between items-center mt-4">
						<span class="text-xl font-bold text-[#134e4a]">Rp 4.500.000</span>
						<button
							class="bg-[#0d9488] hover:bg-[#0f766e] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-colors"
						>
							Pilih <ArrowRight class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>

				<div class="md:col-span-2 lg:col-span-3 mt-8 text-center">
					<button
						class="inline-flex items-center gap-2 bg-[#f0fdfa] hover:bg-[#ccfbf1] text-[#0d9488] font-medium px-6 py-3 rounded-lg border border-[#99f6e4] transition-colors"
						on:click={() => (window.location.href = '/layanan')}
						>
						Lihat Semua Layanan Kami
						<ArrowRight class="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	</section>

	<section id="testimonials" class="py-16 px-4 bg-white">
		<div class="container mx-auto max-w-6xl">
			<div class="text-center mb-16">
				<h2 class="text-3xl font-bold text-[#134e4a] mb-4">Apa Kata Mereka</h2>
				<p class="text-[#0f766e] max-w-2xl mx-auto">
					Pengalaman klien kami setelah mengikuti sesi sound healing.
				</p>
			</div>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="bg-[#f6f7f5] p-8 rounded-xl shadow-sm">
					<div class="flex items-center gap-4 mb-4">
						<div class="w-12 h-12 bg-[#d5e0d2] rounded-full overflow-hidden">
							<img
								src="https://i.pravatar.cc/300"
								alt="Client"
								width={48}
								height={48}
								class="object-cover"
							/>
						</div>
						<div>
							<h4 class="font-semibold text-[#134e4a]">Anita Wijaya</h4>
							<p class="text-sm text-[#0d9488]">Jakarta</p>
						</div>
					</div>
					<p class="text-[#0f766e] italic">
						"Sesi sound healing benar-benar mengubah hidup saya. Saya merasa lebih tenang dan bisa
						tidur lebih nyenyak. Terapis sangat profesional dan suasananya sangat menenangkan."
					</p>
				</div>
				<div class="bg-[#f6f7f5] p-8 rounded-xl shadow-sm">
					<div class="flex items-center gap-4 mb-4">
						<div class="w-12 h-12 bg-[#d5e0d2] rounded-full overflow-hidden">
							<img
								src="https://i.pravatar.cc/300"
								alt="Client"
								width={48}
								height={48}
								class="object-cover"
							/>
						</div>
						<div>
							<h4 class="font-semibold text-[#134e4a]">Budi Santoso</h4>
							<p class="text-sm text-[#0d9488]">Bandung</p>
						</div>
					</div>
					<p class="text-[#0f766e] italic">
						"Awalnya saya skeptis, tapi setelah mencoba sesi kelompok, saya merasakan perubahan yang
						signifikan dalam tingkat stres saya. Sangat direkomendasikan!"
					</p>
				</div>
				<div class="bg-[#f6f7f5] p-8 rounded-xl shadow-sm">
					<div class="flex items-center gap-4 mb-4">
						<div class="w-12 h-12 bg-[#d5e0d2] rounded-full overflow-hidden">
							<img
								src="https://i.pravatar.cc/300"
								alt="Client"
								width={48}
								height={48}
								class="object-cover"
							/>
						</div>
						<div>
							<h4 class="font-semibold text-[#134e4a]">Citra Dewi</h4>
							<p class="text-sm text-[#0d9488]">Surabaya</p>
						</div>
					</div>
					<p class="text-[#0f766e] italic">
						"Sudah 3 bulan rutin mengikuti sesi sound healing dan kualitas hidup saya meningkat
						drastis. Terapis sangat memahami kebutuhan saya dan selalu memberikan pengalaman yang
						menyenangkan."
					</p>
				</div>
			</div>
		</div>
	</section>

	<section id="register" class="py-16 px-4 bg-gradient-to-b from-[#f0fdfa] to-[#f6f7f5]">
		<div class="container mx-auto max-w-4xl">
			<div class="bg-white rounded-2xl shadow-lg overflow-hidden">
				<div class="grid md:grid-cols-2">
					<div class="bg-[#0d9488] p-10 text-white">
						<h2 class="text-3xl font-bold mb-6">Daftar Sekarang</h2>
						<p class="mb-8">
							Mulai perjalanan penyembuhan Anda dengan mendaftar untuk sesi sound healing. Kami akan
							menghubungi Anda untuk konfirmasi jadwal.
						</p>
						<div class="space-y-4">
							<div class="flex items-center gap-3">
								<Phone class="h-5 w-5 text-[#99f6e4]" />
								<span>+62 851 7329 7559</span>
							</div>
							<div class="flex items-center gap-3">
								<MapPin class="h-5 w-5 text-[#99f6e4]" />
								<span
									>Harvest City, Cluster Edelweiss <br />Blok EB 11 No. 10, Cipenjo, Cileungsi<br />
									Kab. Bogor, Jawa Barat</span
								>
							</div>
						</div>
					</div>
					<div class="p-10">
						<form class="space-y-6">
							<div>
								<label for="name" class="block text-sm font-medium text-[#0f766e] mb-1">
									Nama Lengkap
								</label>
								<input
									type="text"
									id="name"
									class="w-full px-4 py-3 rounded-lg border border-[#99f6e4] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
									placeholder="Masukkan nama lengkap"
								/>
							</div>
							<div>
								<label for="email" class="block text-sm font-medium text-[#0f766e] mb-1">
									Email
								</label>
								<input
									type="email"
									id="email"
									class="w-full px-4 py-3 rounded-lg border border-[#99f6e4] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
									placeholder="Masukkan email"
								/>
							</div>
							<div>
								<label for="phone" class="block text-sm font-medium text-[#0f766e] mb-1">
									Nomor Telepon
								</label>
								<input
									type="tel"
									id="phone"
									class="w-full px-4 py-3 rounded-lg border border-[#99f6e4] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
									placeholder="Masukkan nomor telepon"
								/>
							</div>
							<div>
								<label for="service" class="block text-sm font-medium text-[#0f766e] mb-1">
									Pilih Layanan
								</label>
								<select
									id="service"
									class="w-full px-4 py-3 rounded-lg border border-[#99f6e4] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
								>
									<option value="">Pilih jenis layanan</option>
									<option value="harmoni-anak">Harmoni Anak</option>
									<option value="resonansi-digital">Resonansi Digital</option>
									<option value="sentuhan-pribadi">Sentuhan Pribadi</option>
									<option value="perjalanan-mendalam">Perjalanan Mendalam</option>
									<option value="harmoni-kelompok">Harmoni Kelompok</option>
									<option value="pasangan-harmonis">Pasangan Harmonis</option>
									<option value="korporat-mindful">Korporat Mindful</option>
									<option value="retret-transformasi">Retret Transformasi</option>
								</select>
							</div>
							<div>
								<label for="message" class="block text-sm font-medium text-[#0f766e] mb-1">
									Pesan (Opsional)
								</label>
								<textarea
									id="message"
									rows={3}
									class="w-full px-4 py-3 rounded-lg border border-[#99f6e4] focus:outline-none focus:ring-2 focus:ring-[#0d9488]"
									placeholder="Ada pertanyaan atau kebutuhan khusus?"
								></textarea>
							</div>
							<button
								type="submit"
								class="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white py-3 rounded-lg text-lg transition-colors"
							>
								Kirim Pendaftaran
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
