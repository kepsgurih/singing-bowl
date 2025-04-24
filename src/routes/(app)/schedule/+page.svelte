<script lang="ts">
	import { goto } from '$app/navigation';
	import { userSession, loadingSession } from '$lib/stores/auth';
	import { UserCheck2 } from 'lucide-svelte';
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
		goto('/');
	}

	function toggleDetails(index: number) {
		expandedIndex = expandedIndex === index ? null : index;
	}
</script>

<!-- App Bar -->
<header class="w-full bg-white border-b border-rose-200 shadow-sm sticky top-0 z-20">
	<div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
		<button
			class="text-gray-800 hover:text-gray-600 focus:outline-none"
			on:click={handleBack}
			aria-label="back"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<h1 class="text-lg font-semibold text-gray-800 tracking-tight">Schedule Singing Bowl</h1>
		<div></div>
	</div>
</header>

<!-- show avatar -->
<div class="w-full max-w-md flex px-6">
	{#if $loadingSession}
		<div class="flex items-center justify-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
		</div>
	{:else if $userSession}
		<div class="flex w-full justify-between items-center p-2">
			<div>
				<p class="text-gray-800 font-semibold">Hello ! {$userSession?.fullName}</p>
			</div>
		</div>
	{:else}
		<div></div>
	{/if}
</div>

<!-- Konten -->
<div class="w-full max-w-md flex flex-col gap-4 p-6 relative">
	{#each schedules as s, i}
		<div>
			<div class="flex justify-between gap-2">
				<button
					on:click={() => goto(s.link)}
					class="bg-gradient-to-r from-indigo-200 to-yellow-100 text-gray-800 hover:text-gray-900 hover:from-indigo-300 hover:to-yellow-200 hover:font-bold w-full rounded-xl py-3 px-5 shadow-md"
				>
					{s.title}
				</button>
				<button
					class="self-center font-nanum {expandedIndex === i ? 'text-red-700' : ''}"
					on:click={() => toggleDetails(i)}
				>
					{expandedIndex === i ? 'Close' : 'Details'}
				</button>
			</div>
			{#if expandedIndex === i}
				<div class="bg-white/40 p-2 rounded-xl mt-2 mb-4">
					{s.desc}
				</div>
			{/if}
		</div>
	{/each}
	{#if !$userSession && !$loadingSession}
	<div class="absolute bottom-0 bg-gray-600/30 w-[90%] h-full rounded-2xl">
		<div class="w-full h-full flex flex-col items-center justify-center">
			<p class="text-white text-sm font-semibold">You need login to book a session</p>
			<button
				on:click={() => goto('/signin')}
				class="bg-white rounded-xl py-3 px-5 flex items-center gap-3 shadow-md hover:bg-gray-50 transition mx-10"
			>
				<UserCheck2 />
				<span class="text-lg font-medium text-gray-800 font-nanum">Login</span>
		</button>
		</div>
	</div>
	{/if}
</div>
