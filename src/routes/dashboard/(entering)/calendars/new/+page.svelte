<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
  
    let date = '';
    let time = '';
    let kelas = '';
    let status = 'Active'; // default
    let scheduleId = '';
  
    let schedules: { id: string; label: string }[] = [];
  
    const fetchSchedules = async () => {
      const res = await fetch('/api/setup/schedule');
      const data = await res.json();
      if (data.success) {
        schedules = data.data;
      }
    };
  
    const createCalendar = async () => {
      const response = await fetch('/api/setup/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, kelas, status, scheduleId }),
      });
      const result = await response.json();
      if (result.success) {
        alert('Calendar berhasil dibuat!');
        goto('/dashboard/calendars');
      } else {
        alert('Gagal membuat calendar!');
      }
    };
  
    onMount(() => {
      fetchSchedules();
    });
  </script>
  
  <div class="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-center">Tambah Calendar</h1>
  
    <form on:submit|preventDefault={createCalendar} class="space-y-6">
      <div>
        <label for="date" class="block mb-2 text-sm font-medium">Tanggal</label>
        <input id="date" type="date" bind:value={date} class="w-full p-3 border rounded-lg" required />
      </div>
  
      <div>
        <label for="time" class="block mb-2 text-sm font-medium">Jam</label>
        <input id="time" type="time" bind:value={time} class="w-full p-3 border rounded-lg" required />
      </div>
  
      <div>
        <label for="kelas" class="block mb-2 text-sm font-medium">Kelas</label>
        <input id="kelas" type="text" bind:value={kelas} placeholder="Nama Kelas" class="w-full p-3 border rounded-lg" required />
      </div>
  
      <div>
        <label for="status" class="block mb-2 text-sm font-medium">Status</label>
        <select id="status" bind:value={status} class="w-full p-3 border rounded-lg">
          <option value="Active">Active</option>
          <option value="Finish">Finish</option>
          <option value="Booked">Booked</option>
        </select>
      </div>
  
      <div>
        <label for="schedule" class="block mb-2 text-sm font-medium">Pilih Schedule</label>
        <select id="schedule" bind:value={scheduleId} class="w-full p-3 border rounded-lg" required>
          <option value="" disabled selected>Pilih Schedule</option>
          {#each schedules as schedule}
            <option value={schedule.id}>{schedule.label}</option>
          {/each}
        </select>
      </div>
  
      <button type="submit" class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
        Simpan
      </button>
    </form>
  </div>
  