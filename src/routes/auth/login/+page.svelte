<script>
	let formData = {
		email: '',
		password: ''
	};

	function handleSubmit() {
		// Handle login submission here
		console.log('Login submitted:', formData);
	}
</script>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div class="text-center">
			<div class="flex justify-center mb-4">
				<img src="/singing-bowl.png" class="h-16 w-16 animate-pulse" alt="singing bowl" />
			</div>
			<h2 class="text-3xl font-bold text-[#134e4a] font-playfair">Selamat Datang Kembali</h2>
			<p class="mt-2 text-sm text-[#0f766e]">
				Atau
				<a href="/auth/register" class="font-medium text-[#0d9488] hover:text-[#0f766e]">daftar akun baru</a>
			</p>
		</div>
		<div class="mt-8 bg-white/80 backdrop-blur-sm py-8 px-4 shadow-lg rounded-xl sm:px-10">
			<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={formData.email}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							bind:value={formData.password}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 text-[#0d9488] focus:ring-[#0d9488] border-gray-300 rounded"
						/>
						<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Ingat saya </label>
					</div>

					<div class="text-sm">
						<!-- svelte-ignore a11y_invalid_attribute -->
						<a href="#" class="font-medium text-[#0d9488] hover:text-[#0f766e]"> Lupa password? </a>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0d9488] hover:bg-[#0f766e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d9488] transition-colors duration-200"
					>
						Masuk
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	/* Font classes are already defined in the layout file */
</style> 