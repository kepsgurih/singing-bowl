<script lang="ts">
  export let data: {
  link: {
    id: string;
    name: string;
    username: string;
    url: string;
    icon: string;
    order: number;
  };}
  </script>
  
  <div class="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg mt-12">
    <h2 class="text-2xl font-bold mb-8 text-center">Edit Link</h2>
  
    <form class="space-y-6" method="POST" action="/dashboard/tree/edit/{data.link.id}">
      <input name="name" bind:value={data.link.name} placeholder="Name" class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
      <input name="username" bind:value={data.link.username} placeholder="Username" class="input" />
      <input name="url" bind:value={data.link.url} placeholder="URL" class="input" />
      <input name="icon" bind:value={data.link.icon} placeholder="Icon" class="input" />
      <input name="order" type="number" bind:value={data.link.order} placeholder="Order" class="input" />
  
      <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">Update</button>
    </form>
  </div>
  
  <style>
    .input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db; /* Tailwind's border-gray-300 */
      border-radius: 0.75rem; /* Tailwind's rounded-xl */
      outline: none;
      background-color: #f9fafb; /* Tailwind's bg-gray-50 */
    }
    .input:focus {
      box-shadow: 0 0 0 2px #93c5fd; /* Tailwind's focus:ring-blue-300 */
    }
  </style>
  