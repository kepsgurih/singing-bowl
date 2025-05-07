<script lang="ts">
	import { goto } from '$app/navigation';
	import { safeHTML } from '$lib/utils/safeHTML';

	export let data: {
		config: {
			name: string;
			description: string;
			avatar: string;
		};
	};
</script>


{#if data && data.config}
	<div class="max-w-md mx-auto p-8 mt-12 bg-white rounded-3xl shadow-md text-center space-y-6">
		<div>
			<img
				src={data.config.avatar}
				alt="Avatar"
				class="w-28 h-28 mx-auto rounded-full object-cover border-4 border-blue-100 shadow-sm"
			/>
		</div>
		<div>
			<h1 class="text-2xl font-bold text-gray-800">{data.config.name}</h1>
      {#if data.config.description }
			<div class="mt-2 text-gray-600 text-sm">{@html safeHTML(data.config.description)}</div>
      {/if}
		</div>
		<button
			on:click={() => goto('/dashboard/settings/new')}
			class="mt-4 inline-block bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded-full transition"
		>
			Ubah
		</button>
	</div>
{:else}
	<div class="max-w-md mx-auto p-8 mt-12 bg-white rounded-3xl shadow-md text-center space-y-6">
		<p class="text-gray-500">Config belum tersedia.</p>
		<button
			on:click={() => goto('/dashboard/settings/new')}
			class="mt-4 inline-block bg-rose-600 hover:bg-rose-500 text-white px-6 py-2 rounded-full transition"
		>
			Buat Config Baru
		</button>
	</div>
{/if}
