<script lang="ts">
    import { onMount } from 'svelte';
	import StartToastifyInstance from 'toastify-js';
  
    let name = '';
    let avatar = '';
    let description = '';
  
    const fetchConfig = async () => {
      const response = await fetch('/api/setup/setting');
      const result = await response.json();
      if (result.success && result.data) {
        name = result.data.name || '';
        avatar = result.data.avatar || '';
        description = result.data.description || '';
      }
    };
  
    const saveConfig = async () => {
      const response = await fetch('/api/setup/setting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, avatar, description }),
      });
  
      const result = await response.json();
      if (result.success) {
        StartToastifyInstance({
            text:'Config berhasil di simpan',
            duration: 4000
        }).showToast()
        window.location.href = '/dashboard/settings'
      } else {
        StartToastifyInstance({
            text:'Config gagal di simpan',
            duration: 4000
        }).showToast()
      }
    };
  
    onMount(() => {
      fetchConfig();
    });
  </script>
  
  <div class="max-w-lg mx-auto p-8 bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-lg mt-12">
    <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">Config Settings</h2>
    
    <form on:submit|preventDefault={saveConfig} class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input 
          id="name"
          type="text" 
          bind:value={name} 
          placeholder="Enter your name" 
          class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
        />
      </div>
  
      <div>
        <label for="avatar" class="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
        <input 
          id="avatar"
          type="text" 
          bind:value={avatar} 
          placeholder="Enter avatar URL" 
          class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
        />
      </div>
  
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea 
          id="description"
          bind:value={description} 
          placeholder="Write a short description" 
          rows="4"
          class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
        ></textarea>
      </div>
  
      <button 
        type="submit" 
        class="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-all"
      >
        Save Config
      </button>
    </form>
  </div>
  