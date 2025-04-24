<script lang="ts">
	import { goto } from '$app/navigation';
	import { register } from '$lib/services/auth';
	import { accessToken } from '$lib/stores/auth';
	import { z } from 'zod';
	import Toastify from 'toastify-js';

	let form = {
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		address: '',
		phone: ''
	};

	let errors: Partial<Record<keyof typeof form, string>> = {};

	const schema = z.object({
		fullName: z.string().min(1, { message: 'Full name is required' }),
		email: z.string().email({ message: 'Invalid email' }),
		password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' })
			.refine((value) => value === form.password, { message: 'Passwords do not match' }),
		address: z.string().min(1, { message: 'Address is required' }),
		phone: z.string().regex(/^\d+$/, { message: 'Phone number must be a number' })
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const result = schema.safeParse(form);

		if (!result.success) {
			errors = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0] as keyof typeof form;
				errors[field] = issue.message;
			}
		} else {
			errors = {};
			const res = await register(form);
			console.log(res, 'isi');
			if (res?.success) {
				accessToken.set(res.data as string);
				localStorage.setItem('accessToken', res.data as string);
				goto('/schedule');
			} else {
				Toastify({
					text: res?.message,
					duration: 4000,
					style: {
						background: 'linear-gradient(to right, #FDAE61, #d7191c)'
					}
				}).showToast();
			}
			// Lanjutkan submit ke server atau logika lainnya
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center w-full mt-10">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
		<h1 class="text-2xl font-bold mb-2 text-center">Register Account</h1>
		<p class="text-sm text-gray-600 mb-6 text-center">
			Before you get started let's create your account
		</p>

		<form on:submit={handleSubmit}>
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
					>Display Name</label
				>
				<input
					type="text"
					id="fullName"
					bind:value={form.fullName}
					placeholder="John Doe"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
				{#if errors.fullName}
					<p class="text-red-500 text-sm mt-1">test error</p>
				{/if}
			</div>

			<!-- Email -->
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
				<input
					type="text"
					id="email"
					bind:value={form.email}
					placeholder="john.doe@gmail.com"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
				{#if errors.email}
					<p class="text-red-500 text-sm mt-1">{errors.email}</p>
				{/if}
			</div>

			<!-- Password -->
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
				<input
					id="password"
					type="password"
					bind:value={form.password}
					placeholder="**********"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
				{#if errors.password}<p class="text-red-500 text-sm mt-1">{errors.password}</p>{/if}
			</div>

			<!-- Confirm Password -->
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
					>Confirm Password</label
				>
				<input
					id="confirmPassword"
					type="password"
					bind:value={form.confirmPassword}
					placeholder="**********"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
				{#if errors.confirmPassword}<p class="text-red-500 text-sm mt-1">
						{errors.confirmPassword}
					</p>{/if}
			</div>

			<!-- Address -->
			<div class="mb-4">
				<label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
				<textarea
					id="address"
					bind:value={form.address}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				>
					{form.address.replace(/<br \/>/g, '\n')}
				</textarea>
				{#if errors.address}<p class="text-red-500 text-sm mt-1">{errors.address}</p>{/if}
			</div>

			<!-- Phone -->
			<div class="mb-5">
				<label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
				<input
					id="phone"
					type="text"
					bind:value={form.phone}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
				{#if errors.phone}<p class="text-red-500 text-sm mt-1">{errors.phone}</p>{/if}
			</div>

			<!-- Submit -->
			<button
				type="submit"
				class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
			>
				Register
			</button>
		</form>

		<p class="text-center text-sm mt-4">
			Already have an account? <button on:click={() => goto('/signin')} class="text-blue-500 hover:underline">Login</button>
		</p>
	</div>
</div>
