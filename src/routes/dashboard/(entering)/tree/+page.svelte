<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    let linkTrees: { id: string; name: string; username: string; url: string }[] = [];
  
    const fetchLinks = async () => {
      const response = await fetch('/api/setup/linktree');
      const result = await response.json();
      if (result.success) {
        linkTrees = result.data;
      }
    };
  
    const deleteLink = async (id: string) => {
      if (confirm('Yakin mau hapus?')) {
        await fetch(`/api/setup/linktree/${id}`, { method: 'DELETE' });
        fetchLinks();
      }
    };
  
    onMount(() => {
      fetchLinks();
    });
  </script>
  
  <div class="max-w-4xl mx-auto p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">LinkTree List</h1>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500" on:click={() => goto('/dashboard/tree/new')}>
        + New Link
      </button>
    </div>
  
    <div class="space-y-4">
      {#each linkTrees as link}
        <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div>
            <p class="font-semibold">{link.name}</p>
            <p class="text-gray-500 text-sm">@{link.username}</p>
            <a href={link.url} target="_blank" class="text-blue-500 text-sm w-[200px]">{link.url}</a>
          </div>
          <div class="flex gap-2">
            <button on:click={() => goto(`/dashboard/tree/edit/${link.id}`)} class="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
              Edit
            </button>
            <button on:click={() => deleteLink(link.id)} class="bg-rose-600 px-3 py-1 rounded text-white hover:bg-rose-500">
              Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
  