<script>
	import { page } from '$app/stores';
	import {
		CalendarHeart,
		ChartPie,
		LogOut,
		MenuIcon,
		Parentheses,
		Settings,
		TreePine,
		X,
		CalendarCheck,
		BookCheckIcon,

		CarFront,

		BookMarked


	} from 'lucide-svelte';

	let { children } = $props();
	let open = $state(false);

	const menuItem = [
		{ icon: ChartPie, label: 'Dashboard', link: '/dashboard/app' },
		{ icon: Parentheses, label: 'Categories', link: '/dashboard/groupschedule' },
		{ icon: CalendarCheck, label: 'Class Schedule', link: '/dashboard/schedules' },
		{ icon: CalendarHeart, label: 'Class List', link: '/dashboard/calendars' },
		{ icon: TreePine, label: 'Tree', link: '/dashboard/tree' },
		{ icon: BookCheckIcon, label: 'Book', link: '/dashboard/book' },
		{icon: CarFront, label: 'Direction', link: '/dashboard/direction' },
		{ icon: BookMarked, label: 'Guide', link: '/dashboard/guideLine' },
		{ icon: Settings, label: 'Settings', link: '/dashboard/settings' },
	];
</script>

<svelte:head>
	<title>Dashboard Panel</title>
</svelte:head>

<div class="flex h-screen bg-gray-50 relative overflow-hidden font-sans">
	<button
		class={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
		onclick={() => (open = false)}
		aria-label="Close sidebar overlay"
	></button>

	<div
		class={`fixed top-0 left-0 z-50 w-64 h-full bg-gradient-to-b from-rose-600 to-rose-700 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:static md:translate-x-0 md:flex md:flex-col shadow-md`}
	>
		<div class="flex items-center justify-center h-16 bg-rose-700 shadow-sm">
			<span class="text-white text-sm font-bold tracking-wide font-kan">Panel Vickya</span>
		</div>

		<nav class="flex-1 px-4 py-6 overflow-y-auto space-y-2">
			{#each menuItem as item}
				<a
					href={item.link}
					class="flex items-center gap-3 px-4 py-3 text-gray-100 rounded-lg hover:bg-rose-800 transition-colors"
					onclick={() => (open = false)}
				>
					<div
						class="bg-rose-800 p-2 rounded-md flex items-center justify-center group-hover:bg-rose-900 transition-colors"
					>
						<item.icon class="w-5 h-5" />
					</div>
					<span class="text-sm font-medium">{item.label}</span>
				</a>
			{/each}
		</nav>
	</div>
	<div class="flex flex-col flex-1 overflow-y-auto">
		<div
			class="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-6 shadow-sm p-5"
		>
			<div class="md:hidden">
				<button
					class="text-gray-600 focus:outline-none"
					onclick={() => (open = !open)}
					aria-label="Toggle sidebar"
				>
					{#if open}
						<X class="w-6 h-6" />
					{:else}
						<MenuIcon class="w-6 h-6" />
					{/if}
				</button>
			</div>

			<div class="flex-1 text-xl font-semibold text-gray-700 font-kan ml-8">
				Hi! {$page.data.user.fullName}
			</div>

			<div class="flex items-center space-x-4">
				<button
					class="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition-all"
					aria-label="Logout"
				>
					<LogOut class="w-5 h-5" />
				</button>
			</div>
		</div>

		<!-- Content -->
		<div class="flex-1 p-6">
			{@render children()}
		</div>

		<!-- Footer -->
		<footer class="p-6 border-t border-gray-200 text-center text-gray-400 text-sm">
			&copy; {new Date().getFullYear()} Kepsgurih. All rights reserved.
		</footer>
	</div>
</div>
