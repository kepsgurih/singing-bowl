<script lang="ts">
    import { goto } from '$app/navigation';
  
    let label = '';
    let order = 0;
  
    const createGroup = async () => {
      const response = await fetch('/api/setup/groupschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label, order }),
      });
      const result = await response.json();
      if (result.success) {
        goto('/dashboard/groupschedule');
      } else {
        alert('Gagal membuat Group');
      }
    };
  </script>
  
  <div class="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
    <h2 class="text-2xl font-bold mb-8 text-center">Create Group</h2>
  
    <form on:submit|preventDefault={createGroup} class="space-y-6">
      <input bind:value={label} placeholder="Group Label" class="input" />
      <input type="number" bind:value={order} placeholder="Order" class="input" />
      
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">Save</button>
    </form>
  </div>