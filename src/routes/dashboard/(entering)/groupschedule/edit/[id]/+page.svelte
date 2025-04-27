<script lang="ts">
  export let data : {
    group: {
      id: string;
      label: string;
    }
  }
  </script>
  
  <div class="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
    <h2 class="text-2xl font-bold mb-8 text-center">Edit Group</h2>
  
    <form action="?/edit" method="POST" class="space-y-6">
      <input bind:value={data.group.label} name="label" placeholder="Group Label" class="input" />
  
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">Update</button>
    </form>
  </div>