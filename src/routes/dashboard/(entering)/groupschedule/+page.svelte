<script lang="ts">
  import { goto } from '$app/navigation';

  // let groups: { id: string; label: string; order: number }[] = [];
  interface IGroup {
    id: string;
    label: string;
    order: number;
  }


  // const deleteGroup = async (id: string) => {
  //   if (confirm('Yakin mau hapus Group ini?')) {
  //     await fetch(`/api/setup/groupschedule/${id}`, { method: 'DELETE' });
  //     fetchGroups();
  //   }
  // };

  export let data: {
    groups: IGroup[];
  }

</script>

<div class="w-full">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 font-nanum">Categories</h1>
    <button 
      class="bg-blue-600 text-white text-sm md:text-base px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
      on:click={() => goto('/dashboard/groupschedule/new')}
    >
      + Add New
    </button>
  </div>

  <div class="space-y-4">
    {#each data.groups as group}
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-lg shadow-sm">
        <div>
          <p class="font-semibold text-gray-700 text-base md:text-l font-kan">{group.label}</p>
        </div>
        <div class="flex gap-2 mt-2 md:mt-0">
          <button 
            on:click={() => goto(`/dashboard/groupschedule/edit/${group.id}`)} 
            class="bg-orange-400 text-white text-sm md:text-base px-3 py-1 rounded hover:bg-orange-500 transition-colors"
          >
            Edit
          </button>
          <form method="POST" action="?/delete" on:submit|preventDefault={(e) => {
            if (confirm('Yakin mau hapus Group ini?')) {
              if (e.target) {
                (e.target as HTMLFormElement).submit();
              }
            }
          }}>
            <input type="hidden" name="id" value={group.id} />
            <button 
              type="submit"
              class="bg-rose-600 text-white text-sm md:text-base px-3 py-1 rounded hover:bg-rose-500 transition-colors"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    {/each}
  </div>
</div>
