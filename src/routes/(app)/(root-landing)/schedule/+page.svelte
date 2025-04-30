<script lang="ts">
	import { goto } from '$app/navigation';
	import { rupiahFormat } from '$lib/helper/rupiahFormat';
	import { headerTitle } from '$lib/stores/header';
	import { slide, fade } from 'svelte/transition';

	headerTitle.set({
		title: 'Services',
		backUrl: '/'
	});

	export let data: {
		group: Array<{ label: string; id: string }>;
		schedules: Array<{
			id: string;
			groupId: string;
			label: string;
			duration: number;
			caption: string;
			price: string;
			description: string[];
			link: string;
		}>;
		guide: {
			title: string;
			description: string;
		};
		howTo: {
			title: string;
			description: string;
		};
		benefits: {
			title: string;
			description: string;
		};
	};

	let expandedGroups = new Set<string>();
	let expandedSchedules = new Set<string>();

	function toggleGroup(key: string) {
		const newSet = new Set(expandedGroups);
		newSet.has(key) ? newSet.delete(key) : newSet.add(key);
		expandedGroups = newSet;
	}

	function toggleSchedule(label: string) {
		const newSet = new Set(expandedSchedules);
		newSet.has(label) ? newSet.delete(label) : newSet.add(label);
		expandedSchedules = newSet;
	}
</script>

<svelte:head>
	<title>Schedule - Singing Bowl Therapy</title>
	<meta
		name="description"
		content="Explore our schedule for Singing Bowl Therapy sessions. Find the perfect time to relax and rejuvenate with our tailored programs for adults, kids, and groups."
	/>
	<meta
		name="keywords"
		content="Singing Bowl Therapy, Meditation Schedule, Relaxation, Sound Healing, Group Meditation, Kids Meditation"
	/>
</svelte:head>

<div class="w-full max-w-md flex flex-col gap-8 p-6 mx-auto">
	{#each data.group as g}
		<div class="flex flex-col gap-4 bg-white p-4 rounded-lg">
			<!-- Group Header -->
			<button
				type="button"
				class="flex items-center justify-between w-full cursor-pointer"
				onclick={() => toggleGroup(g.id)}
				aria-expanded={expandedGroups.has(g.id)}
			>
				<h2 class="text-xl text-gray-700 font-gummy text-left">{g.label}</h2>

				<span class="text-gray-400">{expandedGroups.has(g.id) ? '▲' : '▼'}</span>
			</button>

			<!-- Group Content -->
			{#if expandedGroups.has(g.id)}
				<div in:slide out:slide>
					<div class="flex flex-col border rounded-xl overflow-hidden">
						{#each data.schedules.filter((s) => s.groupId === g.id) as s, i (s.label)}
							<div class="bg-white p-4 md:p-5 hover:bg-gray-50 transition">
								<div class="flex justify-between items-start">
									<div class="flex flex-col gap-1 w-full">
										<!-- Title -->
										<button onclick={() => goto('/calendar/' + s.id)} class="text-left w-full">
											<div class="text-base font-medium text-gray-800">{s.label}</div>
										</button>
										<!-- Duration & Price -->
										<button
											onclick={() => goto('/calendar/' + s.id)}
											class="flex gap-4 text-xs text-gray-500"
										>
											<span>
												{#if s.duration >= 10000}
													{Math.floor(s.duration / 1000)} - {s.duration % 1000} min
												{:else if s.duration >= 1000}
													{Math.floor(s.duration / 100)} - {s.duration % 100} min
												{:else}
													{s.duration} mins
												{/if}
											</span>
											|
											<span
												>{Number(s.price) === 0 || Number(s.price) === 1
													? 'Free'
													: Number(s.price) === 123
														? 'Pay as you wish'
														: rupiahFormat(Number(s.price))}</span
											>
										</button>
									</div>
									<button
										onclick={() => toggleSchedule(s.label)}
										class="text-rose-500 text-xs hover:underline mt-1 ml-4"
									>
										{expandedSchedules.has(s.label) ? 'Close' : 'Detail'}
									</button>
								</div>

								{#if expandedSchedules.has(s.label)}
									<div class="mt-2 font-kan text-gray-500 text-xs">{@html s.caption}</div>
								{/if}
							</div>

							{#if i < data.schedules.filter((s) => s.groupId === g.id).length - 1}
								<hr class="border-t border-gray-200" />
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/each}

	<div class="mt-8">
		{#if data.guide}
			<button onclick={()=> goto('/guide')} class="bg-transparent w-full py-2 rounded-lg text-blue-500">{data.guide.title}</button
			>
		{/if}
		{#if data.howTo}
			<button onclick={()=> goto('/direction')} class="bg-transparent w-full py-2 rounded-lg text-blue-500">{data.howTo.title}</button
			>
		{/if}
		{#if data.benefits}
			<button onclick={()=> goto('/benefit')} class="bg-transparent w-full py-2 rounded-lg text-blue-500">{data.benefits.title}</button
			>
		{/if}
	</div>
</div>
