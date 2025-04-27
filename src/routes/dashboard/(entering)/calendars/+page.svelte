<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    interface Calendar {
      id: string;
      date: string;
      time: string;
      kelas: string;
      status: string;
      schedule: {
        label: string;
      };
    }

    export let data: {
    calendar: Calendar[];
    }
  </script>
  
  <div class="mt-4 p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold font-nanum">Calendars</h1>
      <button on:click={() => goto('/dashboard/calendars/new')} class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Tambah Calendar
      </button>
    </div>
  
    <div class="overflow-x-auto rounded-lg shadow font-kan">
      <table class="w-full text-left table-auto">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-4">Tanggal</th>
            <th class="p-4">Jam</th>
            <th class="p-4">Kelas</th>
            <th class="p-4">Status</th>
            <th class="p-4">Schedule</th>
            <th class="p-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each data.calendar as c}
            <tr class="border-t">
              <td class="p-4">{new Date(c.date).toLocaleDateString()}</td>
              <td class="p-4">{c.time}</td>
              <td class="p-4">{c.kelas}</td>
              <td class="p-4 capitalize">{c.status}</td>
              <td class="p-4">{c.schedule?.label}</td>
              <td class="p-4 flex gap-2">
                <button on:click={() => goto(`/dashboard/calendars/edit/${c.id}`)} class="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500">
                  Edit
                </button>
                <form method="POST">
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Hapus
                  </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  