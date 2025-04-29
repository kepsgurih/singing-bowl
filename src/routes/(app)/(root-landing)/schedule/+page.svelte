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
			id : string;
			groupId: string;
			label: string;
			duration: string;
			price: string;
			description: string[];
			link: string;
		}>;
	}

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
	<meta name="description" content="Explore our schedule for Singing Bowl Therapy sessions. Find the perfect time to relax and rejuvenate with our tailored programs for adults, kids, and groups." />
	<meta name="keywords" content="Singing Bowl Therapy, Meditation Schedule, Relaxation, Sound Healing, Group Meditation, Kids Meditation" />
</svelte:head>

<div class="w-full max-w-md flex flex-col gap-8 p-6 mx-auto">
	{#each data.group as g}
		<div class="flex flex-col gap-4 bg-white p-4 rounded-lg">
			<!-- Group Header -->
			<button
				type="button"
				class="flex items-center justify-between w-full cursor-pointer"
				on:click={() => toggleGroup(g.id)}
				aria-expanded={expandedGroups.has(g.id)}
			>
				<h2 class="text-xl font-semibold text-gray-700 font-kan">{g.label}</h2>
				
				<span class="text-gray-400">{expandedGroups.has(g.id) ? '▲' : '▼'}</span>
			</button>

			<!-- Group Content -->
			{#if expandedGroups.has(g.id)}
				<div in:slide out:slide>
					<div class="flex flex-col border rounded-xl overflow-hidden">
						{#each data.schedules.filter(s => s.groupId === g.id) as s, i (s.label)}
							<div class="bg-white p-4 md:p-5 hover:bg-gray-50 transition">
								<div class="flex justify-between items-start">
									<div class="flex flex-col gap-1 w-full">
										<!-- Title -->
										<button on:click={() => goto('/calendar/'+s.id)} class="text-left w-full">
											<div class="text-base font-medium text-gray-800">{s.label}</div>
										</button>
										<!-- Duration & Price -->
										<button on:click={() => goto('/calendar/'+s.id)}  class="flex gap-4 text-xs text-gray-500">
											<span>{s.duration} min</span>
											|
											<span>{s.price ? rupiahFormat(Number(s.price)) : 'Free'}</span>
										</button>
									</div>
									<button
										on:click={() => toggleSchedule(s.label)}
										class="text-rose-500 text-xs hover:underline mt-1 ml-4"
									>
										{expandedSchedules.has(s.label) ? 'Tutup' : 'Detail'}
									</button>
								</div>

								{#if expandedSchedules.has(s.label)}
									<ul in:fade out:fade class="mt-3 space-y-1 text-gray-600 text-sm list-disc list-inside pl-2">
										{#each s.description as point}
											<div>{point}</div>
										{/each}
									</ul>
								{/if}
							</div>

							{#if i < data.schedules.filter(s => s.groupId === g.id).length - 1}
								<hr class="border-t border-gray-200" />
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
