<script lang="ts">
  import { goto } from '$app/navigation';

  export let data: {
    schedules: {
      id: string;
      label: string;
      duration: number;
      price: number;
      group: {
        label: string;
      } | null;
    }[]
  };
</script>

<div class="w-full p-4 md:p-6 lg:p-8">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <h1 class="text-2xl md:text-3xl font-bold font-nanum">Schedules</h1>
    <button 
      on:click={() => goto('/dashboard/schedules/new')} 
      class="bg-blue-600 text-white text-sm md:text-base px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Tambah Schedule
    </button>
  </div>

  <div class="overflow-x-auto rounded-xl shadow-md bg-white font-kan">
    <table class="min-w-full text-left text-sm md:text-base">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-4 whitespace-nowrap">Label</th>
          <th class="p-4 whitespace-nowrap">Durasi (Menit)</th>
          <th class="p-4 whitespace-nowrap">Harga</th>
          <th class="p-4 whitespace-nowrap">Group</th>
          <th class="p-4 whitespace-nowrap">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each data.schedules as s}
          <tr class="border-t">
            <td class="p-4">{s.label}</td>
            <td class="p-4">{s.duration}</td>
            <td class="p-4">Rp {s.price.toLocaleString('id-ID')}</td>
            <td class="p-4">{s.group?.label}</td>
            <td class="p-4">
              <div class="flex flex-col md:flex-row gap-2">
                <button 
                  on:click={() => goto(`/dashboard/schedules/edit/${s.id}`)} 
                  class="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500"
                >
                  Edit
                </button>
                <form method="POST" action="?/delete" on:submit|preventDefault={async (e) => {
                  if (confirm('Yakin ingin hapus schedule ini?')) {
                    if (e.target) {
                      await (e.target as HTMLFormElement).submit();
                    }
                  }
                }}>
                  <input type="hidden" name="id" value={s.id} />
                  <button type="submit" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Hapus
                  </button>
                </form>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
