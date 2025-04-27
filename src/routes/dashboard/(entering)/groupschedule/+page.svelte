<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    let groups: { id: string; label: string; order: number }[] = [];
  
    const fetchGroups = async () => {
      const response = await fetch('/api/setup/groupschedule');
      const result = await response.json();
      if (result.success) {
        groups = result.data;
      }
    };
  
    const deleteGroup = async (id: string) => {
      if (confirm('Yakin mau hapus Group ini?')) {
        await fetch(`/api/setup/groupschedule/${id}`, { method: 'DELETE' });
        fetchGroups();
      }
    };
  
    onMount(() => {
      fetchGroups();
    });
  </script>
  
  <div class="max-w-4xl mx-auto p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Group Schedule List</h1>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500" on:click={() => goto('/dashboard/groupschedule/new')}>
        + New Group
      </button>
    </div>
  
    <div class="space-y-4">
      {#each groups as group}
        <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <div>
            <p class="font-semibold">{group.label}</p>
            <p class="text-gray-500 text-sm">Order: {group.order}</p>
          </div>
          <div class="flex gap-2">
            <button on:click={() => goto(`/dashboard/groupschedule/edit/${group.id}`)} class="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
              Edit
            </button>
            <button on:click={() => deleteGroup(group.id)} class="bg-rose-600 px-3 py-1 rounded text-white hover:bg-rose-500">
              Delete
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
  