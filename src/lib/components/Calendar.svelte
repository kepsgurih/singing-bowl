<script lang="ts">
	import dayjs from 'dayjs';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import 'dayjs/locale/id';
	import { goto } from '$app/navigation';
	import { confirmClass } from '$lib/stores/classConfirm';

	dayjs.extend(localizedFormat);
	dayjs.extend(isSameOrAfter);
	dayjs.extend(isSameOrBefore);
	dayjs.extend(customParseFormat);
	dayjs.locale('id');

	export let kelasData: {
		id: string;
		date: string;
		time: string;
		kelas: string;
		status: string;
	}[] = [];

	let currentDate = dayjs();
	let selectedDate: dayjs.Dayjs | null = null;

	const nextMonth = () => {
		currentDate = currentDate.add(1, 'month');
		selectedDate = null;
	};

	const prevMonth = () => {
		currentDate = currentDate.subtract(1, 'month');
		selectedDate = null;
	};

	const getDaysInMonth = () => {
		const start = currentDate.startOf('month');
		const end = currentDate.endOf('month');
		const days: dayjs.Dayjs[] = [];

		let date = start;
		while (date.isSameOrBefore(end)) {
			days.push(date);
			date = date.add(1, 'day');
		}

		return days;
	};

	const getKelasForDate = (date: dayjs.Dayjs) => {
		return kelasData.filter((k) => dayjs(k.date).isSame(date, 'day'));
	};

	const getPaddingStart = () => {
		return currentDate.startOf('month').day();
	};

	const hasKelasThisMonth = () => {
		const start = currentDate.startOf('month');
		const end = currentDate.endOf('month');
		return kelasData.some((k) => {
			const date = dayjs(k.date);
			return date.isSameOrAfter(start) && date.isSameOrBefore(end);
		});
	};

	const isDateDisabled = (date: dayjs.Dayjs) => {
		return !getKelasForDate(date).length;
	};

	const hari = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

	const handleConfirm = (id: string) => {
		confirmClass.set(id);
		goto('/confirm');
	};
</script>

<div class="p-4 space-y-4 relative">
	<!-- Header -->
	<div class="flex justify-between items-center">
		<button
			on:click={prevMonth}
			disabled={currentDate.isSameOrBefore(dayjs())}
			class={`px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 ${currentDate.isSameOrBefore(dayjs()) ? 'cursor-not-allowed opacity-50' : ''}`}
		>
			&lt;
		</button>
		<h2 class="text-lg font-semibold">{currentDate.format('MMMM YYYY')}</h2>
		<button
			on:click={nextMonth}
			disabled={currentDate.isAfter(dayjs().add(1, 'month'))}
			class={`px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 ${currentDate.isAfter(dayjs().add(2, 'month')) ? 'cursor-not-allowed opacity-50' : ''}`}
		>
			&gt;
		</button>
	</div>

	<!-- Hari -->
	<div class="grid grid-cols-7 text-center text-sm font-medium text-gray-600">
		{#each hari as h, i}
			<div class="flex items-center justify-center">{h}</div>
		{/each}
	</div>

	<!-- Tanggal -->
	<div class="grid grid-cols-7 gap-2 relative">
		{#if !hasKelasThisMonth()}
			<div class="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
				<div class="text-center">
					<p class="text-sm font-semibold">Tidak ada kelas di bulan ini</p>
				</div>
			</div>
		{/if}
		{#each Array(getPaddingStart()) as _}
			<div></div>
		{/each}

		{#each getDaysInMonth() as day}
			<button
				on:click={() => (selectedDate = day)}
				disabled={isDateDisabled(day)}
				class="text-sm p-2 rounded-lg border border-gray-200 relative
		  {isDateDisabled(day)
					? 'bg-gray-100 text-gray-400 cursor-not-allowed'
					: 'bg-white hover:bg-purple-100'}"
			>
				{day.date()}
				{#if getKelasForDate(day).length}
					<div class="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Kelas Detail -->
	{#if selectedDate}
		<div class="mt-4 p-4 border rounded-lg bg-purple-50 space-y-2">
			<div class="flex justify-between items-center">
				<h3 class="text-md font-semibold text-purple-700">
					{selectedDate.format('D MMMM YYYY')}
				</h3>
				<button
					on:click={() => (selectedDate = null)}
					class="text-sm text-red-900 font-nanum hover:underline"
				>
					Close
				</button>
			</div>

			<div class="grid grid-cols-2 gap-2">
				{#each getKelasForDate(selectedDate) as k}
						<button
							on:click={() => handleConfirm(k.id)}
							disabled={k.status !== 'active'}
							class={["rounded-lg p-2 text-sm" ,k.status === 'active'
								? 'bg-purple-500 text-white hover:bg-purple-600'
								: 'bg-red-300 text-gray-50 cursor-not-allowed']}>
								{k.time}
								<span class="text-xs block">{k.status === 'active' ? '' : k.status.toLocaleUpperCase()}</span>
								</button
						>
				{/each}
			</div>
		</div>
	{/if}
</div>
