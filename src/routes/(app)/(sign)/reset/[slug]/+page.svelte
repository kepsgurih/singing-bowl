<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let loading = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center w-full font-kan">
	<div class="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
		<h1 class="text-2xl font-bold mb-2 text-center font-gummy">Reset Password</h1>

		<p class="text-sm text-gray-600 mb-6 text-center font-kan">
			Enter your new password below and retype it to confirm.
		</p>
		{#if form?.errorMessage}
			<div class="bg-red-200 text-red-500 p-3 text-center rounded shadow-md mb-3 text-sm font-kan">
				{form?.errorMessage}
			</div>
		{/if}
		<form
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
					>New Password</label
				>
				<input
					disabled={loading}
					type="password"
					id="password"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					name="password"
					placeholder="Enter new password"
					required
				/>
			</div>
			<div class="mb-5">
				<label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900"
					>Retype Password</label
				>
				<input
					disabled={loading}
					type="password"
					id="confirm-password"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					name="confirmPassword"
					placeholder="Retype new password"
					required
				/>
			</div>
			<button
				type="submit"
				disabled={loading}
				class="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition"
			>
				{#if loading}
					Loading...
				{:else}
					Reset Password
				{/if}
			</button>
		</form>
	</div>
</div>
