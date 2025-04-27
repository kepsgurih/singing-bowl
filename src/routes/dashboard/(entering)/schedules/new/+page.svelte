<script lang="ts">
  export let data: {
    groups: {
      id: string;
      label: string;
    }[];
  };
</script>

<div class="w-full p-4 md:p-6 lg:p-8">
  <div class="bg-white rounded-2xl shadow-md p-6 md:p-8">
    <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">Tambah Schedule</h2>

    <form method="POST" class="space-y-6">
      <div>
        <label for="label" class="block mb-2 text-sm font-medium">Label</label>
        <input 
          id="label" 
          name="label" 
          type="text" 
          class="w-full p-3 border rounded-lg bg-gray-50" 
          placeholder="Nama Schedule" 
          required
        />
      </div>

      <div>
        <label for="duration" class="block mb-2 text-sm font-medium">Durasi (Menit)</label>
        <input 
          id="duration" 
          name="duration" 
          type="number" 
          class="w-full p-3 border rounded-lg bg-gray-50" 
          placeholder="Durasi"
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
          required 
        />
      </div>

      <div>
        <label for="groupId" class="block mb-2 text-sm font-medium">Group</label>
        <select 
          id="groupId" 
          name="groupId" 
          class="w-full p-3 border rounded-lg bg-gray-50"
          required
        >
          <option value="">Pilih Group</option>
          {#each data.groups as group}
            <option value={group.id}>{group.label}</option>
          {/each}
        </select>
      </div>

      <div class="space-y-4">
        <label for="descriptions" class="block mb-2 text-sm font-medium">Descriptions</label>
        
        <div id="descriptions-list" class="space-y-4">
          <div class="flex gap-2 items-center">
            <input
              type="text"
              id="descriptions" 
              name="descriptions"
              class="flex-1 p-3 border rounded-lg bg-gray-50"
              placeholder="Deskripsi Schedule"
              required
            />
          </div>
        </div>

        <button 
          type="button" 
          on:click={() => {
            const list = document.getElementById('descriptions-list')!;
            const div = document.createElement('div');
            div.className = 'flex gap-2 items-center';
            div.innerHTML = `
              <input type="text" name="descriptions" class="flex-1 p-3 border rounded-lg bg-gray-50" placeholder="Deskripsi Schedule" required />
              <button type="button" class="bg-rose-500 text-white px-3 py-2 rounded-lg hover:bg-rose-600" onclick="this.parentElement.remove()">Hapus</button>
            `;
            list.appendChild(div);
          }}
          class="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Tambah Deskripsi
        </button>
      </div>

      <button 
        type="submit" 
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-6"
      >
        Simpan
      </button>
    </form>
  </div>
</div>
