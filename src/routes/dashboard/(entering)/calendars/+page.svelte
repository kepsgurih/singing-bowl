<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  interface Calendar {
    id: string;
    date: string;
    time: string;
    kelas: string;
    disable: boolean;
    status: string;
    schedule: {
      label: string;
    };
  }
  export let form : {
    message: string;
    success: boolean;
  }
  export let data: {
    calendar: Calendar[];
  }
  let filterQuery = '';
  let filteredCalendars = data.calendar;

  $: filteredCalendars = data.calendar.filter(c => 
    new Date(c.date).toLocaleDateString().includes(filterQuery) || 
    c.kelas.toLowerCase().includes(filterQuery.toLowerCase()) || 
    c.status.toLowerCase().includes(filterQuery.toLowerCase()) || 
    c.time.includes(filterQuery) || 
    (c.schedule?.label || '').toLowerCase().includes(filterQuery.toLowerCase())
  );
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
   
    {#if  form?.message && !form.success}
      <div class="mb-4 p-4 bg-rose-400 text-rose-800 rounded-lg">
        <strong>{form?.message}</strong>
      </div>
    {/if}
    {#if form?.success}
      <div class="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
        <strong>{form?.message}</strong>
      </div>
    {/if}

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 font-nanum">Calendars</h1>
      <button
        on:click={() => goto('/dashboard/calendars/new')}
        class="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200 flex items-center gap-2 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Tambah Calendar
      </button>
    </div>


    <!-- Filter Section -->
    <div class="mb-6">
      <input
        type="text"
        placeholder="Cari berdasarkan tanggal, kelas, atau status..."
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        bind:value={filterQuery}
      />
    </div>

    <!-- Mobile Card View (visible on small screens) -->
    <div class="grid grid-cols-1 gap-4 sm:hidden font-kan">
      {#each filteredCalendars as c}
        <div class="{c.disable? "bg-rose-300 border-rose-200": "bg-white border-gray-100"} rounded-xl shadow-sm overflow-hidden border">
          <div class="p-4 border-b {c.disable ? "border-rose-800 bg-rose-600 text-white" :"border-gray-100 bg-gray-50 text-gray-500"} flex justify-between items-center">
            <div>
              <h3 class="font-semibold {c.disable ? "text-white": "text-ggray-800"}">{new Date(c.date).toLocaleDateString()}</h3>
              <p class="text-sm ">{c.time}</p>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
              {c.status === 'available' ? 'bg-green-100 text-green-800' : 
               c.status === 'booked' ? 'bg-blue-100 text-blue-800' : 
               c.status === 'canceled' ? 'bg-red-100 text-red-800' : 
               'bg-gray-100 text-gray-800'}">
              {c.status}
            </span>
          </div>
          <div class="p-4 space-y-2 {c.disable ? "text-white" : "text-gray-500 border-b border-gray-100"}">
            <div class="flex justify-between">
              <span>Kelas</span>
              <span class="font-medium">{c.kelas}</span>
            </div>
            <div class="flex justify-between">
              <span>Schedule</span>
              <span class="font-medium">{c.schedule?.label || '-'}</span>
            </div>
          </div>
          <div class="p-4 {c.disable ?"bg-rose-600 border-gray-800":"bg-gray-50 border-gray-100 "} border-t flex gap-2">
            <button
              on:click={() => goto(`/dashboard/calendars/edit/${c.id}`)}
              class="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
            >
              Edit
            </button>
            <form 
              method="POST"
              class="flex-1"
            >
              <input type="hidden" name="id" value={c.id} />
              <button 
                type="submit" 
                class="w-full {c.disable ? "bg-green-500 hover:bg-green-600" : "bg-rose-500 hover:bg-rose-600"} text-white py-2 rounded-lg transition-colors text-sm font-medium"
              >
                {c.disable ? 'Enable' : 'Disable'}
              </button>
            </form>
          </div>
        </div>
      {/each}
      
      {#if filteredCalendars.length === 0}
        <div class="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900">Belum ada calendar</h3>
          <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan jadwal baru</p>
          <button
            on:click={() => goto('/dashboard/calendars/new')}
            class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200 text-sm font-medium"
          >
            Tambah Calendar
          </button>
        </div>
      {/if}
    </div>

    <!-- Table View (visible on larger screens) -->
    <div class="hidden sm:block overflow-hidden rounded-xl shadow-md bg-white font-kan">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each filteredCalendars as c}
              <tr class="{c.disable ? "bg-red-900 opacity-60 text-white" : "bg-gray-50"} transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold">{new Date(c.date).toLocaleDateString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{c.time}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{c.kelas}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    {c.status === 'available' ? 'bg-green-100 text-green-800' : 
                     c.status === 'booked' ? 'bg-blue-100 text-blue-800' : 
                     c.status === 'canceled' ? 'bg-red-100 text-red-800' : 
                     'bg-gray-100 text-gray-800'}">
                    {c.status}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{c.schedule?.label || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex gap-2">
                    <button
                      on:click={() => goto(`/dashboard/calendars/edit/${c.id}`)}
                      class="bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600 transition-colors text-xs"
                    >
                      Edit
                    </button>
                    <form method="POST">
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="bool" value={c.disable} />
                      <button 
                        type="submit" 
                        class="{c.disable? "bg-green-600" : "bg-rose-500"} text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors text-xs"
                      >
                        {c.disable ? 'Enable' : 'Disable'}
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
      {#if filteredCalendars.length === 0}
        <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900">Belum ada calendar</h3>
          <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan jadwal baru</p>
          <button
            on:click={() => goto('/dashboard/calendars/new')}
            class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tambah Calendar
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>