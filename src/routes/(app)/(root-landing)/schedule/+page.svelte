<script lang="ts">
	import { goto } from '$app/navigation';
	import { headerTitle } from '$lib/stores/header';
	import { slide, fade } from 'svelte/transition';

	headerTitle.set({
		title: 'Schedule',
		backUrl: '/'
	});

	const group = [
		{ label: 'For Adult', key: 'adult' },
		{ label: 'For Kids', key: 'kids' },
		{ label: 'Group Meditation', key: 'group' }
	];

	const schedules = [
		// For Adult
		{
			group: 'adult',
			title: 'Morning Relaxation',
			duration: '60m',
			price: 'Rp 150K',
			desc: [
				'Mulai harimu dengan sesi relaksasi yang menenangkan.',
				'Gunakan teknik pernapasan dan suara untuk meredakan stres.',
				'Ciptakan suasana damai sebelum memulai aktivitas.'
			],
			link: '/calendar'
		},
		{
			group: 'adult',
			title: 'Evening Sound Bath',
			duration: '45m',
			price: 'Rp 120K',
			desc: [
				'Relaksasi mendalam di penghujung hari.',
				'Nikmati getaran suara untuk memperbaiki kualitas tidur.',
				'Lepaskan beban pikiran setelah aktivitas.'
			],
			link: '/calendar'
		},
		{
			group: 'adult',
			title: 'Stress Relief Meditation',
			duration: '30m',
			price: 'Rp 100K',
			desc: [
				'Meditasi fokus untuk mengurangi kecemasan.',
				'Latihan mindfulness sederhana dan efektif.',
				'Meningkatkan energi positif dalam tubuh.'
			],
			link: '/calendar'
		},

		// For Kids
		{
			group: 'kids',
			title: 'Fun Meditation for Kids',
			duration: '20m',
			price: 'Rp 80K',
			desc: [
				'Meditasi interaktif untuk anak-anak.',
				'Menggunakan cerita dan imajinasi.',
				'Belajar relaksasi dengan cara menyenangkan.'
			],
			link: '/calendar'
		},
		{
			group: 'kids',
			title: 'Singing Bowl Playtime',
			duration: '25m',
			price: 'Rp 90K',
			desc: [
				'Anak-anak bermain dan merasakan suara mangkuk.',
				'Stimulasi kreatif dan sensorik.',
				'Membangun ketenangan melalui permainan.'
			],
			link: '/calendar'
		},
		{
			group: 'kids',
			title: 'Calm Story Meditation',
			duration: '15m',
			price: 'Rp 70K',
			desc: [
				'Mendengarkan cerita menenangkan.',
				'Latihan visualisasi sederhana.',
				'Persiapan tidur yang lebih damai.'
			],
			link: '/calendar'
		},

		// Group Meditation
		{
			group: 'group',
			title: 'Collective Energy Sound Bath',
			duration: '90m',
			price: 'Rp 250K',
			desc: [
				'Menggabungkan energi kolektif untuk penyembuhan.',
				'Meditasi suara dalam kelompok besar.',
				'Memperkuat vibrasi positif bersama-sama.'
			],
			link: '/calendar'
		}
	];

	let expandedGroups = new Set<string>();
	let expandedSchedules = new Set<string>();

	function toggleGroup(key: string) {
		const newSet = new Set(expandedGroups);
		newSet.has(key) ? newSet.delete(key) : newSet.add(key);
		expandedGroups = newSet;
	}

	function toggleSchedule(title: string) {
		const newSet = new Set(expandedSchedules);
		newSet.has(title) ? newSet.delete(title) : newSet.add(title);
		expandedSchedules = newSet;
	}

	function handleGoto(link: string) {
		goto(link);
	}
</script>

<div class="w-full max-w-md flex flex-col gap-8 p-6 mx-auto">
	{#each group as g}
		<div class="flex flex-col gap-4 bg-white p-4 rounded-lg">
			<!-- Group Header -->
			<button
				type="button"
				class="flex items-center justify-between w-full cursor-pointer"
				on:click={() => toggleGroup(g.key)}
				aria-expanded={expandedGroups.has(g.key)}
			>
				<h2 class="text-xl font-semibold text-gray-700">{g.label}</h2>
				<span class="text-gray-400">{expandedGroups.has(g.key) ? '▲' : '▼'}</span>
			</button>

			<!-- Group Content -->
			{#if expandedGroups.has(g.key)}
				<div in:slide out:slide>
					<div class="flex flex-col border rounded-xl overflow-hidden">
						{#each schedules.filter(s => s.group === g.key) as s, i (s.title)}
							<div class="bg-white p-4 md:p-5 hover:bg-gray-50 transition">
								<div class="flex justify-between items-start">
									<div class="flex flex-col gap-1 w-full">
										<!-- Title -->
										<button on:click={() => handleGoto(s.link)} class="text-left w-full">
											<div class="text-base font-medium text-gray-800">{s.title}</div>
										</button>
										<!-- Duration & Price -->
										<button on:click={() => handleGoto(s.link)}  class="flex gap-4 text-xs text-gray-500">
											<span>{s.duration}</span>
											|
											<span>{s.price}</span>
										</button>
									</div>
									<button
										on:click={() => toggleSchedule(s.title)}
										class="text-rose-500 text-xs hover:underline mt-1 ml-4"
									>
										{expandedSchedules.has(s.title) ? 'Tutup' : 'Detail'}
									</button>
								</div>

								{#if expandedSchedules.has(s.title)}
									<ul in:fade out:fade class="mt-3 space-y-1 text-gray-600 text-sm list-disc list-inside pl-2">
										{#each s.desc as point}
											<li>{point}</li>
										{/each}
									</ul>
								{/if}
							</div>

							{#if i < schedules.filter(s => s.group === g.key).length - 1}
								<hr class="border-t border-gray-200" />
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
