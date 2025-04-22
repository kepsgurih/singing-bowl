<script lang="ts">
	let expandedIndex: number | null = null;

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
		window.history.back();
	}

	function toggleDetails(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}
</script>

<!-- App Bar -->
<header class="w-full bg-white border-b border-rose-200 shadow-sm sticky top-0 z-20">
	<div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
		<button class="text-gray-800 hover:text-gray-600 focus:outline-none" on:click={handleBack} aria-label="back">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<h1 class="text-lg font-semibold text-gray-800 tracking-tight">✨ Kelas Healing dengan Suara ✨</h1>
		<div></div>
	</div>
</header>

<!-- Konten -->
<div class="w-full max-w-md flex flex-col gap-4 p-6">
	{#each schedules as s, i}
		<div class="bg-white border border-pink-100 rounded-xl py-3 px-5 shadow-md flex flex-col gap-1">
			<a href={s.link} target="_blank" class="text-base font-semibold text-gray-700 hover:underline">
				{s.title}
			</a>
			<div class="flex justify-between items-center text-sm text-gray-500">
				<span>{s.duration}</span>
				<button
					class="text-pink-600 hover:underline text-sm"
					on:click={() => toggleDetails(i)}
				>
					{expandedIndex === i ? 'Hide' : 'Details'}
				</button>
			</div>
			{#if expandedIndex === i}
				<p class="text-sm text-gray-600 mt-2">{s.desc}</p>
			{/if}
		</div>
	{/each}
</div>