<script lang="ts">
  import { writable } from 'svelte/store';

  export let data: {
    schedule: {
      id: string;
      label: string;
      duration: number;
      price: number;
      groupId: string;
      description: string[];  // Array deskripsi
    };
    groups: any[];
  };

  // Gunakan writable store untuk menyimpan deskripsi
  const descriptions = writable(data.schedule.description);

  // Fungsi untuk menambah deskripsi baru ke store
  const addDescription = () => {
    descriptions.update((descList) => [...descList, ""]); // Menambah elemen kosong untuk deskripsi baru
  };

  // Fungsi untuk menghapus deskripsi berdasarkan index
  const removeDescription = (index: number) => {
    descriptions.update((descList) => descList.filter((_, i) => i !== index)); // Menghapus deskripsi dari store
  };
</script>

<div class="w-full p-4 md:p-6 lg:p-8">
  <div class="bg-white rounded-2xl shadow-md p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">Edit Schedule</h2>

    <form method="POST" action="?/update" class="space-y-6">
      <div>
        <label for="label" class="block mb-2 text-sm font-medium">Label</label>
        <input 
          id="label" 
          name="label" 
          type="text" 
          class="w-full p-3 border rounded-lg bg-gray-50" 
          placeholder="Nama Schedule" 
          value={data.schedule.label}
          required
        />
      </div>

      <div>
        <label for="duration" class="block mb-2 text-sm font-medium">Duration (Menit)</label>
        <input 
          id="duration" 
          name="duration" 
          type="number" 
          class="w-full p-3 border rounded-lg bg-gray-50" 
          placeholder="Durasi" 
          value={data.schedule.duration}
          required 
        />
      </div>

      <div>
        <label for="price" class="block mb-2 text-sm font-medium">Harga</label>
        <input 
          id="price" 
          name="price" 
          type="number" 
          class="w-full p-3 border rounded-lg bg-gray-50" 
          placeholder="Harga"
          value={data.schedule.price}
          required 
        />
      </div>

      <div>
        <label for="groupId" class="block mb-2 text-sm font-medium">Group</label>
        <select 
          id="groupId" 
          name="groupId" 
          class="w-full p-3 border rounded-lg bg-gray-50" 
          value={data.schedule.groupId}
          required
        >
          <option value="">Pilih Group</option>
          {#each data.groups as group}
            <option value={group.id}>{group.label}</option>
          {/each}
        </select>
      </div>

      <div class="space-y-4">
        <label for="description-0" class="block mb-2 text-sm font-medium">Descriptions</label>

        {#each $descriptions as desc, index}
          <div class="flex gap-2 items-center">
            <input
              type="text"
              name="descriptions" 
              class="flex-1 p-3 border rounded-lg bg-gray-50"
              placeholder="Deskripsi Schedule"
              bind:value={$descriptions[index]}
              required
            />
            <button 
              type="button" 
              class="bg-rose-500 text-white px-3 py-2 rounded-lg hover:bg-rose-600"
              on:click={() => removeDescription(index)}
            >
              Hapus
            </button>
          </div>
        {/each}

        <button 
          type="button" 
          class="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          on:click={addDescription}
        >
          + Tambah Deskripsi
        </button>
      </div>

      <button 
        type="submit" 
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-6"
      >
        Update
      </button>
    </form>
  </div>
</div>
