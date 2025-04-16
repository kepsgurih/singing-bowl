<script>
	import { MapPin, Phone, Mail, Clock } from 'lucide-svelte';

	let formData = {
		name: '',
		email: '',
		phone: '',
		message: ''
	};

	function handleSubmit() {
		// Handle form submission here
		console.log('Form submitted:', formData);
	}
</script>

<div class="container mx-auto px-4 py-16">
	<div class="text-center mb-16">
		<h1 class="text-4xl font-bold text-[#134e4a] mb-4 font-playfair">Hubungi Kami</h1>
		<p class="text-[#0f766e] max-w-2xl mx-auto">
			Kami siap membantu Anda menemukan kedamaian dan keseimbangan melalui sound healing
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-12">
		<div>
			<div class="bg-white rounded-xl shadow-lg p-8">
				<h2 class="text-2xl font-semibold text-[#134e4a] mb-6 font-playfair">Informasi Kontak</h2>
				<div class="space-y-6">
					<div class="flex items-start gap-4">
						<Phone class="w-6 h-6 text-[#0d9488] mt-1" />
						<div>
							<h3 class="font-semibold text-[#134e4a]">Telepon</h3>
							<p class="text-gray-600">+62 851 7329 7559</p>
						</div>
					</div>
					<div class="flex items-start gap-4">
						<Mail class="w-6 h-6 text-[#0d9488] mt-1" />
						<div>
							<h3 class="font-semibold text-[#134e4a]">Email</h3>
							<p class="text-gray-600">info@vickya.com</p>
						</div>
					</div>
					<div class="flex items-start gap-4">
						<MapPin class="w-6 h-6 text-[#0d9488] mt-1" />
						<div>
							<h3 class="font-semibold text-[#134e4a]">Alamat</h3>
							<p class="text-gray-600">
								Harvest City, Cluster Edelweiss<br />
								Blok EB 11 No. 10, Cipenjo, Cileungsi<br />
								Kab. Bogor, Jawa Barat
							</p>
						</div>
					</div>
					<div class="flex items-start gap-4">
						<Clock class="w-6 h-6 text-[#0d9488] mt-1" />
						<div>
							<h3 class="font-semibold text-[#134e4a]">Jam Operasional</h3>
							<p class="text-gray-600">
								Senin - Jumat: 09.00 - 20.00<br />
								Sabtu: 10.00 - 18.00<br />
								Minggu: 10.00 - 15.00
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div>
			<div class="bg-white rounded-xl shadow-lg p-8">
				<h2 class="text-2xl font-semibold text-[#134e4a] mb-6 font-playfair">Kirim Pesan</h2>
				<form on:submit|preventDefault={handleSubmit} class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
						<textarea
							id="message"
							bind:value={formData.message}
							rows="4"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
							required
						></textarea>
					</div>
					<button
						type="submit"
						class="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-3 rounded-lg transition-colors font-medium"
					>
						Kirim Pesan
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	/* Font classes are already defined in the layout file */
</style> 