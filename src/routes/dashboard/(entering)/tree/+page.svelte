<script lang="ts">
    import { goto } from '$app/navigation';
  
    export let data : {
      links: {
        id: string; name: string; username: string; url: string
      }[]
    }
  
    const deleteLink = async (id: string) => {
      if (confirm('Yakin mau hapus?')) {
        await fetch(`/api/setup/linktree/${id}`, { method: 'DELETE' });
      }
    };
  
  </script>
  
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold font-nanum">LinkTree List</h1>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500" on:click={() => goto('/dashboard/tree/new')}>
        + New Link
      </button>
    </div>
  
    <div class="space-y-4 font-kan">
      {#each data.links as link}
        <div class="items-center p-4 bg-white rounded-lg shadow-sm">
          <div>
            <p class="font-semibold">{link.name}</p>
            <p class="text-gray-500 text-sm">@{link.username}</p>
            <a href={link.url} target="_blank" class="text-blue-500 text-sm w-[200px]">{link.url}</a>
          </div>
          <div class="flex gap-2 mt-4">
            <button on:click={() => goto(`/dashboard/tree/edit/${link.id}`)} class="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
              Edit
            </button>
            <form method="POST" class="inline">
              <input type="hidden" name="id" value={link.id} />

            <button type="submit" class="bg-rose-600 px-3 py-1 rounded text-white hover:bg-rose-500">
              Delete
            </button>
          </form>
          </div>
        </div>
      {/each}
    </div>
  </div>
  