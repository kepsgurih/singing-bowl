<script lang="ts">
	import { goto } from '$app/navigation';
	export let data: {
		config: {
			title: string;
			description: string;
		};
	};
</script>

<div>
	<button
		onclick={() => goto('/dashboard/benefit/add')}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8">Edit</button
	>

	<h1 class="text-2xl font-semibold text-gray-800">{data.config.title}</h1>
	<div class="text-sm text-gray-600">
		{@html data.config.description}
	</div>
</div>
