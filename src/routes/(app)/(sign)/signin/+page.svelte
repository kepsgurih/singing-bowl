<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }:PageProps = $props();
	let loading = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center w-full">
	<div class="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
		<h1 class="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
		<p class="text-sm text-gray-600 mb-6 text-center">Hello! Good to see you again</p>

		<form action="?/login" method="POST" use:enhance={() => {
			loading = true;
			return ({ update }) => {
				update({ invalidateAll: true }).finally(async () => { 
					loading = false;
				});
			};
		}}>
			<div class="mb-5">
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
				<input
				disabled={loading}
					type="email"
					id="email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					name="email"
					placeholder="john.doe@gmail.com"
					required
				/>
			</div>
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
					>Your password</label
				>
				<input
				disabled={loading}
					type="password"
					id="password"
					placeholder="**********"
					name="password"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
					Sign In
				{/if}
			</button>
		</form>

		{#if form?.invalid}
				<p class="text-center text-red-700 font-xs my-10">Username and password is required.</p>
			{/if}

			{#if form?.credentials}
				<p class="text-center text-red-700 font-xs my-10">
					You have entered the wrong credentials.
				</p>
			{/if}

		<p class="text-center text-sm mt-4">
			Don't have an account? <button
				onclick={() => goto('/register')}
				class="text-blue-500 hover:underline">Register</button
			>
		</p>
	</div>
</div>
