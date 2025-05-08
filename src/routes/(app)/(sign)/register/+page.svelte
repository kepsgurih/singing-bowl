<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	interface Form {
		errorMessage?: string;
	}

	let { form }: { form: Form } = $props();
	let loading = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center w-full mt-4 md:mt-10">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-md p-6 mx-4">
		<h1 class="text-2xl font-bold mb-2 text-center">Register Account</h1>
		<p class="text-sm text-gray-600 mb-6 text-center">
			Before you get started let's create your account
		</p>

		<form
			action="?register"
			method="POST"
			use:enhance={() => {
				loading = true;
				return ({ update }) => {
					update({ invalidateAll: true }).finally(async () => {
						loading = false;
					});
				};
			}}
		>
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
					>Display Name</label
				>
				<input
					type="text"
					id="fullName"
					name="fullName"
					disabled={loading}
					placeholder="John Doe"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>
			<div class="mb-5">
				<label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
				<input
					id="phone"
					type="text"
					name="phone"
					disabled={loading}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>

			<!-- Email -->
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
				<input
					type="text"
					id="email"
					name="email"
					disabled={loading}
					placeholder="john.doe@gmail.com"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>

			<div class="mb-5">
				<label for="instagram" class="block mb-2 text-sm font-medium text-gray-900"
					>Instagram <span class="italic">{'(Optional)'}</span></label
				>
				<input
					id="instagram"
					type="text"
					name="ig"
					disabled={loading}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>

			<!-- Password -->
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					disabled={loading}
					placeholder="**********"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>

			<!-- Confirm Password -->
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
					>Confirm Password</label
				>
				<input
					id="confirmPassword"
					type="password"
					name="confirmPassword"
					disabled={loading}
					placeholder="**********"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>

			<!-- Phone -->
			{#if form?.errorMessage}
				<div class="text-center text-sm font-kan text-red-600 bg-rose-100 py-4 rounded-lg mb-4">
					{form.errorMessage}
				</div>
			{/if}
			<!-- Submit -->
			<button
				type="submit"
				disabled={loading}
				class="bg-rose-600 hover:bg-rose-700 w-full py-3 text-white rounded-xl shadow"
			>
				{loading ? 'Loading...' : 'Register'}
			</button>
		</form>

		<p class="text-center text-sm mt-4">
			Already have an account? <button
				onclick={() => goto('/signin')}
				class="text-blue-500 hover:underline">Login</button
			>
		</p>
	</div>
</div>
