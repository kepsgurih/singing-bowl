<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    let id = '';
    let label = '';
    let order = 0;
  
    onMount(() => {
      const unsubscribe = page.subscribe((p) => {
        id = p.params.id;
        fetchGroupSchedule();
      });
      return () => unsubscribe();
    });

    const fetchGroupSchedule = async () => {
      const response = await fetch('/api/setup/groupschedule');
      const result: { success: boolean; data: { id: string; label: string; order: number }[] } = await response.json();
      if (result.success) {
        const found = result.data.find((g: { id: string; label: string; order: number }) => g.id === id);
        if (found) {
          label = found.label;
          order = found.order;
        }
      }
    };
  
    const updateGroup = async () => {
      const response = await fetch(`/api/setup/groupschedule/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label, order }),
      });
      const result = await response.json();
      if (result.success) {
        goto('/dashboard/groupschedule');
      } else {
        alert('Gagal update Group');
      }
    };
  </script>
  
  <div class="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
    <h2 class="text-2xl font-bold mb-8 text-center">Edit Group</h2>
  
    <form on:submit|preventDefault={updateGroup} class="space-y-6">
      <input bind:value={label} placeholder="Group Label" class="input" />
      <input type="number" bind:value={order} placeholder="Order" class="input" />
  
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">Update</button>
    </form>
  </div>