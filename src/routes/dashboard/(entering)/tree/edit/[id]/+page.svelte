<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    let id = '';
    let name = '';
    let username = '';
    let url = '';
    let icon = '';
    let order = 0;
  
    onMount(() => {
      const unsubscribe = page.subscribe((p) => {
        id = p.params.id;
        fetchLinktreeData();
      });
      return () => unsubscribe();
    });

    const fetchLinktreeData = async () => {
      const response = await fetch(`/api/setup/linktree`);
      const result = await response.json();
      if (result.success) {
        const found = result.data.find((l: { id: string; name: string; username: string; url: string; icon: string; order: number }) => l.id === id);
        if (found) {
          name = found.name;
          username = found.username;
          url = found.url;
          icon = found.icon;
          order = found.order;
        }
      }
    };
  
    const updateLink = async () => {
      const response = await fetch(`/api/setup/linktree/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, url, icon, order }),
      });
      const result = await response.json();
      if (result.success) {
        goto('/dashboard/tree');
      } else {
        alert('Gagal update link');
      }
    };
  </script>
  
  <div class="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
    <h2 class="text-2xl font-bold mb-8 text-center">Edit Link</h2>
  
    <form on:submit|preventDefault={updateLink} class="space-y-6">
      <input bind:value={name} placeholder="Name" class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
      <input bind:value={username} placeholder="Username" class="input" />
      <input bind:value={url} placeholder="URL" class="input" />
      <input bind:value={icon} placeholder="Icon" class="input" />
      <input type="number" bind:value={order} placeholder="Order" class="input" />
  
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">Update</button>
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
  