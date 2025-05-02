<script lang="ts">
  import { rupiahFormat } from "$lib/helper/rupiahFormat";
  export let data: any;
</script>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 font-nanum">Bookings</h1>
    </div>

    <!-- Table View (visible on larger screens) -->
    <div class="hidden md:block overflow-hidden rounded-xl shadow-md bg-white font-kan">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each data.book as booking}
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.calendar.schedule.label}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {#if booking.calendar.schedule.price === 0}
                  Free
                  {:else if booking.calendar.schedule.price === 123}
                  Pay as you wish
                  {:else}
                  {rupiahFormat(booking.calendar.schedule.price)}
                  {/if}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.calendar.kelas}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user.fullName}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user.phone || 'N/A'}</td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{booking.reason || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <form action="?" method="POST">
                    <input type="hidden" name="id" value={booking.id} />
                    <button 
                      type="button" 
                      class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors text-xs flex items-center space-x-1"
                      on:click={(event) => {
                        if (confirm('Are you sure you want to cancel this booking?')) {
                          const target = event?.target as HTMLElement | null;
                          const form = target?.closest('form');
                          form?.submit();
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Cancel Booking</span>
                    </button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      {#if data.book.length === 0}
        <div class="flex flex-col items-center justify-center py-12 px-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900">No bookings found</h3>
          <p class="mt-1 text-sm text-gray-500">There are currently no bookings in the system</p>
        </div>
      {/if}
    </div>

    <!-- Mobile Card View (visible on small screens) -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
      {#each data.book as booking}
        <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <div>
              <h3 class="font-semibold text-gray-800">{booking.user.fullName}</h3>
              <p class="text-sm text-gray-500">{booking.user.phone || 'N/A'}</p>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {booking.calendar.schedule.label}
            </span>
          </div>
          
          <div class="p-4 space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-500">Price</span>
              <span class="font-medium">{booking.calendar.schedule.price ? rupiahFormat(booking.calendar.schedule.price): 'Free'}</span>
            </div>
            
            {#if booking.reason}
              <div class="pt-2 border-t border-gray-100">
                <p class="text-sm text-gray-500 mb-1">Reason:</p>
                <p class="text-gray-700">{booking.reason}</p>
              </div>
            {/if}
          </div>
          
          <div class="p-4 bg-gray-50 border-t border-gray-100">
            <form action="?" method="POST" class="w-full">
              <input type="hidden" name="id" value={booking.id} />
              <button 
                type="button" 
                class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                on:click={(event) => {
                  if (confirm('Are you sure you want to cancel this booking?')) {
                    const target = event?.target as HTMLElement | null;
                    const form = target?.closest('form');
                    form?.submit();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Booking
              </button>
            </form>
          </div>
        </div>
      {/each}
      
      {#if data.book.length === 0}
        <div class="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900">No bookings found</h3>
          <p class="mt-1 text-sm text-gray-500">There are currently no bookings in the system</p>
        </div>
      {/if}
    </div>
  </div>
</div>