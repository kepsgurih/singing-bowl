<script lang="ts">
	import { rupiahFormat } from "$lib/helper/rupiahFormat";

    export let data :any
</script>

<table class="table-auto w-full border-collapse border border-gray-300">
    <thead>
        <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">Class</th>
            <th class="border border-gray-300 px-4 py-2">Price</th>
            <th class="border border-gray-300 px-4 py-2">Full Name</th>
            <th class="border border-gray-300 px-4 py-2">Phone</th>
            <th class="border border-gray-300 px-4 py-2">Reason</th>
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
            </tr>
        {/each}
    </tbody>
</table>
