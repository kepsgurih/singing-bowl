<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
  
    interface Group {
      id: string;
      label: string;
    }
  
    let label = '';
    let duration = 0;
    let price = 0;
    let groupId = '';
  
    let groups: Group[] = [];
    const id = get(page).params.id;
  
    const fetchSchedule = async () => {
      const res = await fetch(`/api/setup/schedule/${id}`);
      const data = await res.json();
      if (data.success) {
        label = data.data.label;
        duration = data.data.duration;
        price = data.data.price;
        groupId = data.data.groupId;
      }
    };
  
    const fetchGroups = async () => {
      const res = await fetch('/api/setup/groupschedule');
      const data = await res.json();
      if (data.success) {
        groups = data.data;
      }
    };
  
    onMount(() => {
      fetchGroups();
      fetchSchedule();
    });
  
    const updateSchedule = async () => {
      const res = await fetch(`/api/setup/schedule/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label, duration, price, groupId })
      });
      const data = await res.json();
      if (data.success) {
        goto('/dashboard/schedules');
      } else {
        alert('Gagal mengupdate schedule');
      }
    };
  </script>
  
  <div class="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-2xl">
    <h2 class="text-2xl font-bold mb-6 text-center">Edit Schedule</h2>
  
    <form on:submit|preventDefault={updateSchedule} class="space-y-6">
      <div>
        <label for="label" class="block mb-2 text-sm font-medium">Label</label>
        <input id="label" bind:value={label} type="text" class="w-full p-3 border rounded-lg bg-gray-50" placeholder="Nama Schedule" />
      </div>
  
      <div>
        <label for="duration" class="block mb-2 text-sm font-medium">Duration (Menit)</label>
        <input id="duration" bind:value={duration} type="number" class="w-full p-3 border rounded-lg bg-gray-50" />
      </div>
  
      <div>
        <label for="price" class="block mb-2 text-sm font-medium">Harga</label>
        <input id="price" bind:value={price} type="number" class="w-full p-3 border rounded-lg bg-gray-50" />
      </div>
  
      <div>
        <label for="group" class="block mb-2 text-sm font-medium">Group</label>
        <select id="group" bind:value={groupId} class="w-full p-3 border rounded-lg bg-gray-50">
          <option value="">Pilih Group</option>
          {#each groups as group}
            <option value={group.id}>{group.label}</option>
          {/each}
        </select>
      </div>
  
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Update</button>
    </form>
  </div>
  