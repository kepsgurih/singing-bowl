<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
	<h2 class="text-2xl font-bold mb-8 text-center">Create New Link</h2>

	<form method="POST" class="space-y-6">
		<input name={'name'} placeholder="Name" class="input" />
		<input name={'username'} placeholder="Username" class="input" />
		<input name={'url'} placeholder="URL" class="input" />
		<input name={'icon'} placeholder="Icon" class="input" />
		<input type="number" name={'order'} placeholder="Order" class="input" />

		<button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500"
			>Save</button
		>
	</form>
</div>

<style>
	.input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db; /* Tailwind's border-gray-300 */
		border-radius: 0.75rem; /* Tailwind's rounded-xl */
		outline: none;
		background-color: #f9fafb; /* Tailwind's bg-gray-50 */
	}
	.input:focus {
		box-shadow: 0 0 0 2px #93c5fd; /* Tailwind's focus:ring-blue-300 */
	}
</style>
