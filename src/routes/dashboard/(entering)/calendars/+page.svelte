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
  
    let calendars: Calendar[] = [];
  
    const fetchCalendars = async () => {
      const res = await fetch('/api/setup/calendar');
      const data = await res.json();
      if (data.success) {
        calendars = data.data;
      }
    };
  
    onMount(() => {
      fetchCalendars();
    });
  
    const deleteCalendar = async (id: string) => {
      if (confirm('Yakin mau hapus calendar ini?')) {
        await fetch(`/api/setup/calendar/${id}`, {
          method: 'DELETE'
        });
        fetchCalendars();
      }
    };
  </script>
  
  <div class="max-w-6xl mx-auto mt-12 p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Calendars</h1>
      <button on:click={() => goto('/dashboard/calendars/new')} class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Tambah Calendar
      </button>
    </div>
  
    <div class="overflow-x-auto rounded-lg shadow">
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
          {#each calendars as c}
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
                <button on:click={() => deleteCalendar(c.id)} class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  