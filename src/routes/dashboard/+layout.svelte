<script>
	import { CalendarHeart, ChartPie, DoorClosed, MenuIcon, Settings, TreePine, X } from 'lucide-svelte';

    let { children } = $props();
    let open = $state(true);

    const menuItem = [
        {
            icon: ChartPie,
            label: 'Dashboard',
            link: '/dashboard/app'
        },
        {
            icon: CalendarHeart,
            label: 'Class List',
            link: '/dashboard/class-list'
        },
        {
            icon: TreePine,
            label: 'Tree',
            link: '/dashboard/tree'
        },
        {
            icon: Settings,
            label: 'Settings',
            link: '/dashboard/settings'
        }
    ]
    // const pathname = window.location.pathname;
</script>

<div class="flex h-screen bg-gray-100">
    <div class="md:flex flex-col w-64 bg-gray-800 {open ? 'block' : 'hidden'}">
        <div class="flex items-center justify-center h-16 bg-rose-800">
            <span class="text-white font-bold uppercase">Vickya Admin</span>
        </div>
        <div class="flex flex-col flex-1 overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-rose-600">
                {#each menuItem as item}
                <a href="{item.link}" class="flex items-center px-4 py-2 text-gray-100 mb-2 hover:bg-rose-900 group rounded hover:font-semibold">
                    <div class="group-hover:bg-indigo-600 rounded text-white w-8 h-8 flex items-center justify-center mr-2">
                        <item.icon class="w-5 h-5 font-semibold" />
                    </div>
                    {item.label}
                </a>
                {/each}
            </nav>
        </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1 overflow-y-auto">
        <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200 py-4">
            <div class="flex items-center px-4 md:hidden">
                <button class="text-gray-500 focus:outline-none focus:text-gray-700" onclick={() => open = !open} aria-label="Toggle sidebar">
                    {#if open}
                    <X />
                    {:else}
                    <MenuIcon />
                    {/if}
                </button>
            </div>
            <div class="flex font-nanum flex-1 px-4 text-2xl font-semibold text-gray-600">
                Dashboard
            </div>
            <div class="flex items-center pr-4">

                <button
                    class="bg-rose-600 hover:bg-rose-700 text-white px-5 py-1.5 rounded flex items-center text-gray-500 focus:outline-none" aria-label="Logout">
                  <DoorClosed />
                </button>
            </div>
        </div>
        <div class="p-4">
           {@render children()}
        </div>
        <footer class="p-4 border-t border-gray-200">
            <p class="text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} Kepsgurih. All rights reserved.
            </p>
            
        </footer>
    </div>
    
</div>