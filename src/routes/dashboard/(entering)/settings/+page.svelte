<script lang="ts">
	import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  interface ConfigData {
    name: string;
    avatar: string;
    description: string;
  }

  let configData: ConfigData | null = null;

  const fetchConfig = async () => {
    const response = await fetch('/api/setup/setting');
    const result = await response.json();
    if (result.success) {
      configData = result.data;
    } else {
      configData = null;
    }
  };

  onMount(() => {
    fetchConfig();
  });
</script>

{#if configData}
  <div class="max-w-md mx-auto p-8 mt-12 bg-white rounded-3xl shadow-md text-center space-y-6">
    <div>
      <img 
        src={configData.avatar} 
        alt="Avatar" 
        class="w-28 h-28 mx-auto rounded-full object-cover border-4 border-blue-100 shadow-sm"
      />
    </div>
    <div>
      <h1 class="text-2xl font-bold text-gray-800">{configData.name}</h1>
      <p class="mt-2 text-gray-600 text-sm">{configData.description}</p>
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
