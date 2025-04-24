<script lang="ts">
	import { goto } from "$app/navigation";
	import { login } from "$lib/services/auth";
	import { accessToken } from "$lib/stores/auth";
	import { z } from "zod";

	let form = {
		email: '',
		password: '',
	}

	let errors: Partial<Record<keyof typeof form, string>> = {};

	const schema = z.object({
		email: z.string().email({ message: "Invalid email" }),
		password: z.string().min(6, { message: "Password must be at least 6 characters" }),
	})


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
            const res = await login(form)
            console.log(res, 'isi')
			if(res){
				accessToken.set(res as string);
				localStorage.setItem('accessToken', res as string);
				window.location.href = '/schedule';
			} else {
				errors['email'] = 'Invalid email or password'
				errors['password'] = 'Invalid email or password'
			}
			// Lanjutkan submit ke server atau logika lainnya
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center w-full">
	<div class="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
		<h1 class="text-2xl font-bold mb-2 text-center">Welcome Back</h1>
        <p class="text-sm text-gray-600 mb-6 text-center">Hello! Good to see you again</p>

		<form on:submit={handleSubmit}>
			<div class="mb-5">
				<label for="email" class="block mb-2 text-sm font-medium text-gray-900"
					>Your email</label
				>
				<input
					type="email"
					id="email"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					bind:value={form.email}
					placeholder="john.doe@gmail.com"
					required
				/>
				{#if errors.email} <p class="text-red-500 text-sm mt-1">{errors.email}</p> {/if}
			</div>
			<div class="mb-5">
				<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
					>Your password</label
				>
				<input
					type="password"
					id="password"
                    placeholder="**********"
					bind:value={form.password}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
				{#if errors.password} <p class="text-red-500 text-sm mt-1">{errors.password}</p> {/if}
			</div>
			<button
				type="submit"
				class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
			>
				Submit
			</button>
		</form>

		<p class="text-center text-sm mt-4">
			Don't have an account? <button on:click={() => goto('/register')} class="text-blue-500 hover:underline">Register</button>
		</p>
	</div>
</div>
