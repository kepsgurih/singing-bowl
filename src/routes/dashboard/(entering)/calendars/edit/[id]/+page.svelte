<script lang="ts">
	export let data: {
		calendar: {
			id: string;
			date: any;
			time: string;
			kelas: string;
			status: string;
			scheduleId: string;
		};
		schedules: Array<{ id: string; label: string }>;
	};
	let formattedDate = new Date(data.calendar.date).toISOString().split('T')[0];

	$: formattedDate = new Date(data.calendar.date).toISOString().split('T')[0];
	$: data.calendar.date = new Date(formattedDate).toISOString();
</script>

<div class="mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md">
	<h1 class="text-2xl font-bold mb-6 text-center">Edit Calendar</h1>

	<form method="POST" class="space-y-6">
		<div>
			<label for="date" class="block mb-2 text-sm font-medium">Tanggal</label>
			<input
				id="date"
				name="date"
				bind:value={formattedDate}
				type="date"
				class="w-full p-3 border rounded-lg"
				required
			/>
		</div>

		<div>
			<label for="time" class="block mb-2 text-sm font-medium">Jam</label>
			<input
				id="time"
				name="time"
				type="time"
				bind:value={data.calendar.time}
				class="w-full p-3 border rounded-lg"
				required
			/>
		</div>

		<div>
			<label for="kelas" class="block mb-2 text-sm font-medium">Location</label>
			<input
				id="kelas"
				name="kelas"
				type="text"
				bind:value={data.calendar.kelas}
				class="w-full p-3 border rounded-lg"
				required
			/>
		</div>

		<div>
			<label for="status" class="block mb-2 text-sm font-medium">Status</label>
			<select
				id="status"
				name="status"
				bind:value={data.calendar.status}
				class="w-full p-3 border rounded-lg"
			>
				<option value="Active">Active</option>
				<option value="Finish">Finish</option>
				<option value="Booked">Booked</option>
			</select>
		</div>

		<div>
			<label for="scheduleId" class="block mb-2 text-sm font-medium">Schedule</label>
			<select
				id="scheduleId"
				name="scheduleId"
				bind:value={data.calendar.scheduleId}
				class="w-full p-3 border rounded-lg"
				required
			>
				<option value="" disabled>Pilih Schedule</option>
				{#each data.schedules as schedule}
					<option value={schedule.id}>{schedule.label}</option>
				{/each}
			</select>
		</div>

		<button
			type="submit"
			class="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
		>
			Update
		</button>
	</form>
</div>
