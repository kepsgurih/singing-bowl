<script lang="ts">
	import RichTextEditor from "$lib/components/RichTextEditor.svelte";

  export let data: {
    groups: {
      id: string;
      label: string;
    }[];
  };

  let descriptionText = '';
  
  function handleDescriptionChange(event: CustomEvent) {
    descriptionText = event.detail.value;
  }
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
        
        <RichTextEditor
           value={descriptionText} 
           placeholder="Write a short description"
           minHeight="120px"
           on:change={handleDescriptionChange}
         />
         <textarea 
         id="caption" 
         name="caption" 
         value={descriptionText} 
         class="hidden"
       ></textarea>
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
