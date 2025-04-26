<script lang="ts">
	import { goto } from '$app/navigation';
	import { headerTitle } from '$lib/stores/header';
	let expandedIndex: number | null = null;

	headerTitle.set({
		title: 'Schedule',
		backUrl: '/'
	});
	
	const schedules = [
		{
			title: 'Singing Bowl - Relaksasi Pagi',
			duration: '60m',
			desc: 'Mulailah harimu dengan sesi meditasi yang menenangkan menggunakan suara singing bowl. Kelas ini dirancang untuk membantu meredakan stres, meningkatkan konsentrasi, dan menciptakan rasa damai di pagi hari.',
			link: '/calendar'
		},
		{
			title: 'Sound Bath & Energi Positif',
			duration: '45m',
			desc: 'Selami kedalaman energi positif dengan pengalaman suara yang menenangkan. Dalam sesi ini, Anda akan merasakan getaran dari berbagai jenis instrumen, termasuk singing bowl, untuk membersihkan energi negatif dan meningkatkan keseimbangan tubuh.',
			link: '/calendar'
		},
		{
			title: 'Meditasi Healing dengan Singing Bowl',
			duration: '30m',
			desc: 'Menggunakan getaran suara dari singing bowl untuk membuka chakra dan menyembuhkan tubuh serta pikiran. Kelas ini mengajak Anda untuk menyelami meditasi dalam yang mendalam, mengurangi kecemasan, dan menciptakan kedamaian batin.',
			link: '/calendar'
		}
	];

	function handleBack() {
		goto('/');
	}

	function toggleDetails(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}
</script>

<div class="w-full max-w-md flex flex-col gap-4 p-6 relative">
	{#each schedules as s, i}
		<div>
			<div class="flex justify-between gap-2">
				<button
					on:click={() => goto(s.link)}
					class="text-left bg-white border border-gray-200 hover:bg-gray-200 w-full rounded-xl py-3 px-5 shadow-md"
				>
					<div class="text-lg font-semibold text-gray-800 font-nanum">
						{s.title}
					</div>
					<div class="text-sm text-gray-600">
						{s.duration}
					</div>
				</button>
				<button
					class="self-center font-nanum {expandedIndex === i ? 'text-red-700' : ''}"
					on:click={() => toggleDetails(i)}
				>
					{expandedIndex === i ? 'Close' : 'Detail'}
				</button>
			</div>
			{#if expandedIndex === i}
				<div class="bg-white/40 p-4 rounded-xl mt-2 mb-4 text-sm">
					{s.desc}
				</div>
			{/if}
		</div>
	{/each}
</div>
