<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    interface Schedule {
      id: string;
      label: string;
      duration: number;
      price: number;
      group: {
        label: string;
      };
    }
  
    let schedules: Schedule[] = [];
  
    const fetchSchedules = async () => {
      const res = await fetch('/api/setup/schedule');
      const data = await res.json();
      if (data.success) {
        schedules = data.data;
      }
    };
  
    onMount(() => {
      fetchSchedules();
    });
  
    const deleteSchedule = async (id: string) => {
      if (confirm('Yakin ingin hapus schedule ini?')) {
        await fetch(`/api/setup/schedule/${id}`, {
          method: 'DELETE'
        });
        fetchSchedules(); // refresh list
      }
    };
  </script>
  
  <div class="max-w-5xl mx-auto mt-12 p-6">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Schedules</h1>
      <button on:click={() => goto('/dashboard/schedules/new')} class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Tambah Schedule
      </button>
    </div>
  
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="w-full text-left table-auto">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-4">Label</th>
            <th class="p-4">Duration (Menit)</th>
            <th class="p-4">Harga</th>
            <th class="p-4">Group</th>
            <th class="p-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each schedules as s}
            <tr class="border-t">
              <td class="p-4">{s.label}</td>
              <td class="p-4">{s.duration}</td>
              <td class="p-4">Rp {s.price.toLocaleString('id-ID')}</td>
              <td class="p-4">{s.group?.label}</td>
              <td class="p-4 flex gap-2">
                <button on:click={() => goto(`/dashboard/schedules/edit/${s.id}`)} class="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500">
                  Edit
                </button>
                <button on:click={() => deleteSchedule(s.id)} class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Hapus
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  