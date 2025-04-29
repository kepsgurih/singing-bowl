<script lang="ts">
    import { rupiahFormat } from "$lib/helper/rupiahFormat";
   export let data: any;
   
   // Function to handle deletion of booking
   function handleDelete(id: string) {
     // Implementasi fungsi hapus sesuai kebutuhan
     // Contoh: menampilkan konfirmasi dan mengirim request ke server
     if (confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
       console.log('Menghapus booking dengan ID:', id);
       // Di sini Anda bisa menambahkan kode untuk memanggil API hapus
       // Misalnya: await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
       // Dan kemudian refresh data atau update state lokal
     }
   }
   </script>
   
   <!-- Desktop/Tablet View: Traditional Table -->
   <div class="hidden md:block">
     <table class="table-auto w-full border-collapse border border-gray-300">
       <thead>
         <tr class="bg-gray-100">
           <th class="border border-gray-300 px-4 py-2">Class</th>
           <th class="border border-gray-300 px-4 py-2">Price</th>
           <th class="border border-gray-300 px-4 py-2">Full Name</th>
           <th class="border border-gray-300 px-4 py-2">Phone</th>
           <th class="border border-gray-300 px-4 py-2">Reason</th>
           <th class="border border-gray-300 px-4 py-2">Action</th>
         </tr>
       </thead>
       <tbody>
         {#each data.book as booking}
           <tr class="hover:bg-gray-50">
             <td class="border border-gray-300 px-4 py-2">{booking.calendar.schedule.label}</td>
             <td class="border border-gray-300 px-4 py-2">{booking.calendar.schedule.price ? rupiahFormat(booking.calendar.schedule.price): 'Free'}</td>
             <td class="border border-gray-300 px-4 py-2">{booking.user.fullName}</td>
             <td class="border border-gray-300 px-4 py-2">{booking.user.phone || 'N/A'}</td>
             <td class="border border-gray-300 px-4 py-2">{booking.reason || '-'}</td>
             <td class="border border-gray-300 px-4 py-2">
                <form action="?" method="POST">
                  <input type="hidden" name="id" value={booking.id} />
                  <button 
                    type="button" 
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    on:click={(event) => {
                      if (confirm('Are you sure you want to cancel this booking?')) {
                        const target = event?.target as HTMLElement | null;
                        const form = target?.closest('form');
                        form?.submit();
                      }
                    }}
                  >
                    Cancel Booking
                  </button>
             </td>
           </tr>
         {/each}
       </tbody>
     </table>
   </div>
   
   <!-- Mobile View: Card-based Layout -->
   <div class="block md:hidden">
     {#each data.book as booking}
       <div class="mb-4 border border-gray-300 rounded shadow-sm">
         <div class="bg-gray-100 px-4 py-2 font-medium border-b border-gray-300">
           {booking.user.fullName}
         </div>
         <div class="p-4 space-y-2">
           <div class="grid grid-cols-3">
             <span class="font-medium text-gray-600">Class:</span>
             <span class="col-span-2">{booking.calendar.schedule.label}</span>
           </div>
           
           <div class="grid grid-cols-3">
             <span class="font-medium text-gray-600">Price:</span>
             <span class="col-span-2">{booking.calendar.schedule.price ? rupiahFormat(booking.calendar.schedule.price): 'Free'}</span>
           </div>
           
           <div class="grid grid-cols-3">
             <span class="font-medium text-gray-600">Phone:</span>
             <span class="col-span-2">{booking.user.phone || 'N/A'}</span>
           </div>
           
           <div class="grid grid-cols-3">
             <span class="font-medium text-gray-600">Reason:</span>
             <span class="col-span-2">{booking.reason || '-'}</span>
           </div>
           
           <div class="mt-4 flex justify-end">
             <button 
               class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center" 
               on:click={() => handleDelete(booking.id)}
             >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
               </svg>
               Hapus
             </button>
           </div>
         </div>
       </div>
     {/each}
   </div>