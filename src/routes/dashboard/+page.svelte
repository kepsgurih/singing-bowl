<script lang="ts">
	let { form } = $props();
	let loading = false;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to your account" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center w-full">
	<div class="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
		<h1 class="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
		<p class="text-sm text-gray-600 mb-6 text-center">Hello! Good to see you again</p>

		<form action="?/login" method="POST">
			<div class="mb-5">
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
				<input
					type="email"
					id="email"
					name="email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="john.doe@gmail.com"
					required
				/>
			</div>
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
					>Your password</label
				>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="**********"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition"
			>
				{loading ? 'Loading...' : 'Sign In'}
			</button>

			{#if form?.invalid}
				<p class="text-center text-red-700 font-xs mt-10">Username and password is required.</p>
			{/if}

			{#if form?.credentials}
				<p class="text-center text-red-700 font-xs mt-10">
					You have entered the wrong credentials.
				</p>
			{/if}
		</form>
	</div>
</div>
