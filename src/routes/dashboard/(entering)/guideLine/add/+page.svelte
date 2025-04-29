<script lang="ts">
    import RichTextEditor from '$lib/components/RichTextEditor.svelte';
    
    export let data: {
     config: {
       title: string;
       description: string;
     };
    };
   
    let descriptionText = data.config.description || '';
    
    function handleDescriptionChange(event: CustomEvent) {
      descriptionText = event.detail.value;
    }
   </script>
   
   <div class="w-full px-4 sm:px-6 md:px-8 py-8">
     <div class="bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-lg p-6 sm:p-8 md:w-4/5 lg:w-3/5 mx-auto">
       <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">Guideline Settings</h2>
       
       <form method="POST" enctype="multipart/form-data" class="space-y-5 sm:space-y-6">
         <div class="form-group">
           <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
           <input
             id="title"
             name="title"
             type="text"
             bind:value={data.config.title}
             placeholder="Enter title"
             class="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all"
           />
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