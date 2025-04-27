<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import { headerTitle } from '$lib/stores/header';

	// const kelas = [
	// 	{ id: '12fa', date: '2025-04-22', time: '18:00', kelas: 'Yoga', status: 'active' },
	// 	{ id: '12fa', date: '2025-04-23', time: '18:00', kelas: 'Yoga', status: 'finish' },
	// 	{ id: '12fb', date: '2025-04-23', time: '19:00', kelas: 'Meditasi', status: 'active' },
	// 	{ id: '12fb', date: '2025-04-26', time: '19:00', kelas: 'Meditasi', status: 'active' },
	// 	{ id: '12fb', date: '2025-04-26', time: '20:00', kelas: 'Meditasi', status: 'active' },
	// 	{ id: '12fc', date: '2025-04-25', time: '07:00', kelas: 'Sound Healing', status: 'booked' },
	// 	{ id: '12fd', date: '2025-05-21', time: '07:00', kelas: 'Pagi Ceria', status: 'booked' },
	// 	{ id: '12fe', date: '2025-05-21', time: '08:00', kelas: 'Sesi Fokus', status: 'active' },
	// 	{ id: '12fg', date: '2025-05-21', time: '09:00', kelas: 'Releasing', status: 'booked' }
	// ];

	export let data: {
		calendar: {
			date: Date;
			time: string;
			kelas: string;
			status: string;
			id: string;
		}[];
		schedule: {
			label: string;
		};
	};

	let kelas = data.calendar.map((item) => ({
		...item,
		date: new Date(item.date)
	.toISOString().split('T')[0]
	}));

	headerTitle.set({
		title: data.schedule.label,
		backUrl: '/schedule'
	});
</script>

<main class="p-4">
	<Calendar kelasData={kelas} />
</main>
