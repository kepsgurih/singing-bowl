<script lang="ts">
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';
  
  export let data: {
   config: {
     name: string;
     description: string;
     avatar: string;
   };
  };
 
  let descriptionText = data.config.description || '';
  
  function handleDescriptionChange(event: CustomEvent) {
    descriptionText = event.detail.value;
  }
 </script>
 
 <div class="w-full px-4 sm:px-6 md:px-8 py-8">
   <div class="bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-lg p-6 sm:p-8 md:w-4/5 lg:w-3/5 mx-auto">
     <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">Config Settings</h2>
     
     <form method="POST" enctype="multipart/form-data" class="space-y-5 sm:space-y-6">
       <div class="form-group">
         <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
         <input
           id="name"
           name="name"
           type="text"
           bind:value={data.config.name}
           placeholder="Enter your name"
           class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all"
         />
       </div>
       
       <div class="form-group">
         <label for="avatar" class="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
         <div class="flex items-center space-x-4">
           {#if data.config.avatar}
             <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
               <img src={data.config.avatar} alt="Current avatar" class="w-full h-full object-cover" />
             </div>
           {/if}
           <div class="flex-1">
             <label class="relative flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 bg-gray-50 cursor-pointer transition-all">
               <input type="file" name="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
               <span class="text-sm text-gray-600">Choose an image or drag and drop</span>
             </label>
           </div>
         </div>
       </div>
       
       <div class="form-group">
         <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
         
         <!-- Using RichTextEditor Component -->
         <RichTextEditor 
           value={descriptionText} 
           placeholder="Write a short description"
           minHeight="120px"
           on:change={handleDescriptionChange}
         />
         
         <!-- Hidden textarea for form submission -->
         <textarea 
           id="description" 
           name="description" 
           value={descriptionText} 
           class="hidden"
         ></textarea>
       </div>
       
       <button
         type="submit"
         class="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all"
       >
         Save Config
       </button>
     </form>
   </div>
 </div>