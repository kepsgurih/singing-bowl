<script lang="ts">
  import { goto } from '$app/navigation';
  export let data: {
    schedules: {
      id: string;
      label: string;
      duration: number;
      price: number;
      disable: boolean;
      group: {
        label: string;
      } | null;
    }[],
  };
  export let form: {
    success: boolean;
    message: string;
  };


  let filterQuery = '';

$: filteredSchedules = data.schedules.filter((s) => {
  const query = filterQuery.toLowerCase();
  return (
    s.label.toLowerCase().includes(query) ||
    s.duration.toString().includes(query) ||
    (s.group?.label?.toLowerCase() || '').includes(query)
  );
});
</script>
<div class="min-h-screen bg-gray-50">
  {#if form?.success}
  <p class="bg-green-600 text-white rounded text-center p-2">{form.message}</p>
{/if}

{#if form?.message && !form?.success}
  <p class="bg-red-600 text-white rounded text-center p-2">{form.message}</p>
{/if}


  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 font-nanum">Schedules</h1>
      <button
        on:click={() => goto('/dashboard/schedules/new')}
        class="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200 flex items-center gap-2 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Tambah Schedule
      </button>
    </div>

    <!-- Filter Section -->
    <div class="mb-6">
      <input
        type="text"
        placeholder="Cari berdasarkan nama, durasi, atau grup"
        bind:value={filterQuery}
        class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <!-- Mobile Card View (visible on small screens) -->
    <div class="grid grid-cols-1 gap-4 sm:hidden font-kan">
      {#each filteredSchedules as s}
        <div class="{s.disable ? "bg-rose-300 opacity-60 border-rose-600" : "bg-white border-gray-100"} rounded-xl shadow-sm overflow-hidden border">
          <div class="p-4 border-b { s.disable ? "bg-rose-300 border-rose-500" : "bg-gray-200 border-gray-100" }">
            <h3 class="font-semibold text-gray-800">{s.label}</h3>
          </div>
          <div class="p-4 space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">Durasi</span>
              <span class="font-medium">{s.duration} Menit</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Harga</span>
              <span class="font-medium">Rp {s.price.toLocaleString('id-ID')}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Group</span>
              <span class="font-medium">{s.group?.label || '-'}</span>
            </div>
          </div>
          <div class="p-4 {s.disable ? "bg-rose-500 border-rose-500 ": "bg-gray-50 border-gray-100 "} border-t flex gap-2">
            <button
              on:click={() => goto(`/dashboard/schedules/edit/${s.id}`)}
              class="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
            >
              Edit
            </button>
            <form 
              method="POST" 
              action="?/delete" 
              class="flex-1"
              on:submit|preventDefault={async (e) => {
                if (confirm('Yakin ingin hapus schedule ini?')) {
                  if (e.target) {
                    await (e.target as HTMLFormElement).submit();
                  }
                }
              }}
            >
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="bool" value={s.disable} />
              <button 
                type="submit" 
                class="w-full {s.disable ? "bg-green-500 hover:bg-green-600" : "bg-rose-500 hover:bg-rose-600"} text-white py-2 rounded-lg transition-colors text-sm font-medium"
              >
                {s.disable ? 'Aktifkan' : 'Disable'}
              </button>
            </form>
          </div>
        </div>
      {/each}
    </div>

    <!-- Table View (visible on larger screens) -->
    <div class="hidden sm:block overflow-hidden rounded-xl shadow-md bg-white font-kan">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durasi (Menit)</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each filteredSchedules as s}
              <tr class="transition-colors {s.disable ? 'opacity-50 bg-red-400 text-white' : 'text-gray-600 hover:bg-gray-50 '}">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold">{s.label}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{s.duration}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">Rp {s.price.toLocaleString('id-ID')}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{s.group?.label || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex gap-2">
                    <button
                      on:click={() => goto(`/dashboard/schedules/edit/${s.id}`)}
                      class="bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600 transition-colors text-xs"
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
                      <input type="hidden" name="bool" value={s.disable} />
                      <button 
                        type="submit" 
                        class="{s.disable ? "bg-green-800": "bg-rose-500"} text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors text-xs"
                      >
                        {s.disable ? 'Aktifkan' : 'Disable'}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      {#if data.schedules.length === 0}
        <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900">Belum ada jadwal</h3>
          <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan jadwal baru</p>
          <button
            on:click={() => goto('/dashboard/schedules/new')}
            class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tambah Schedule
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>