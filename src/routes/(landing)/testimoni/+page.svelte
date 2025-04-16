<script>
	import { Star } from 'lucide-svelte';

	const testimonials = [
		{
			name: 'Sarah Wijaya',
			role: 'Pengusaha',
			image: 'https://i.pravatar.cc/300?img=1',
			content: 'Sesi sound healing dengan Vickya benar-benar mengubah hidup saya. Saya merasa lebih tenang dan fokus setelah setiap sesi. Rekomendasi banget!',
			rating: 5
		},
		{
			name: 'Budi Santoso',
			role: 'Karyawan',
			image: 'https://i.pravatar.cc/300?img=2',
			content: 'Sebagai seseorang yang sering mengalami stres di tempat kerja, sound healing membantu saya menemukan keseimbangan dan ketenangan batin.',
			rating: 5
		},
		{
			name: 'Dewi Putri',
			role: 'Ibu Rumah Tangga',
			image: 'https://i.pravatar.cc/300?img=3',
			content: 'Saya mengalami kesulitan tidur selama bertahun-tahun. Setelah mengikuti sesi sound healing, kualitas tidur saya meningkat secara signifikan.',
			rating: 5
		},
		{
			name: 'Rudi Hartono',
			role: 'Atlet',
			image: 'https://i.pravatar.cc/300?img=4',
			content: 'Sound healing membantu saya dalam pemulihan setelah latihan intensif. Tubuh saya terasa lebih rileks dan nyaman.',
			rating: 5
		},
		{
			name: 'Linda Sari',
			role: 'Mahasiswa',
			image: 'https://i.pravatar.cc/300?img=5',
			content: 'Sebagai mahasiswa yang sering mengalami kecemasan, sound healing memberikan ketenangan yang saya butuhkan untuk fokus belajar.',
			rating: 5
		},
		{
			name: 'Ahmad Fauzi',
			role: 'Pegawai Negeri',
			image: 'https://i.pravatar.cc/300?img=6',
			content: 'Setelah rutin mengikuti sesi sound healing, saya merasa lebih produktif di kantor dan hubungan dengan keluarga semakin harmonis.',
			rating: 5
		}
	];
</script>

<div class="container mx-auto px-4 py-16">
	<div class="text-center mb-16">
		<h1 class="text-4xl font-bold text-[#134e4a] mb-4 font-playfair">Testimoni Klien</h1>
		<p class="text-[#0f766e] max-w-2xl mx-auto">
			Lihat apa yang dikatakan klien kami tentang pengalaman mereka dengan layanan sound healing kami
		</p>
	</div>

	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each testimonials as testimonial}
			<div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
				<div class="flex items-center gap-4 mb-4">
					<img
						src={testimonial.image}
						alt={testimonial.name}
						class="w-16 h-16 rounded-full object-cover"
					/>
					<div>
						<h3 class="font-semibold text-[#134e4a] font-playfair">{testimonial.name}</h3>
						<p class="text-sm text-[#0f766e]">{testimonial.role}</p>
					</div>
				</div>
				<div class="flex gap-1 mb-4">
					{#each Array(testimonial.rating) as _}
						<Star class="w-5 h-5 text-yellow-400 fill-current" />
					{/each}
				</div>
				<p class="text-gray-600">"{testimonial.content}"</p>
			</div>
		{/each}
	</div>

	<div class="mt-16 text-center">
		<h2 class="text-2xl font-semibold text-[#134e4a] mb-4 font-playfair">Siap untuk Mengalami Transformasi?</h2>
		<p class="text-[#0f766e] mb-6">
			Bergabunglah dengan ratusan klien yang telah merasakan manfaat sound healing
		</p>
		<a
			href="#contact"
			class="inline-block bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-3 rounded-lg transition-colors font-medium"
		>
			Hubungi Kami
		</a>
	</div>
</div>

<style>
	/* Font classes are already defined in the layout file */
</style>
