<script lang="ts">
	export let data: {
		schedules: { id: string; label: string; group: { id: string; label: string } }[];
	};
</script>

<div class="mt-8 p-6 bg-white rounded-2xl shadow-md">
	<h1 class="text-2xl font-bold mb-6 text-center">Tambah Calendar</h1>

	<form method="POST" class="space-y-6">
		<div>
			<label for="date" class="block mb-2 text-sm font-medium">Tanggal</label>
			<input name="date" id="date" type="date" class="w-full p-3 border rounded-lg" required />
		</div>

		<div>
			<label for="time" class="block mb-2 text-sm font-medium">Jam</label>
			<input name="time" id="time" type="time" class="w-full p-3 border rounded-lg" required />
		</div>

		<div>
			<label for="kelas" class="block mb-2 text-sm font-medium">Location</label>
			<select name="kelas" id="kelas" class="w-full p-3 border rounded-lg">
				<option value="Harvest City">Harvest City</option>
				<option value="Home Visit">Home Visit</option>
				<option value="Online">Online</option>
			</select>
		</div>

		<div>
			<label for="status" class="block mb-2 text-sm font-medium">Status</label>
			<select name="status" id="status" class="w-full p-3 border rounded-lg">
				<option value="Active">Active</option>
				<option value="Finish">Finish</option>
				<option value="Booked">Booked</option>
			</select>
		</div>

		<div>
			<label for="schedule" class="block mb-2 text-sm font-medium">Pilih Schedule</label>
			<select
				name="scheduleId"
				id="schedule"
				class="w-full p-3 border rounded-lg"
				required
				multiple
			>
				<option value="" disabled selected>Pilih Schedule</option>
				{#each data.schedules as schedule}
					<option value={schedule.id}>{schedule.group.label} - {schedule.label} </option>
				{/each}
			</select>
		</div>

		<button
			type="submit"
			class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
		>
			Simpan
		</button>
	</form>
</div>
