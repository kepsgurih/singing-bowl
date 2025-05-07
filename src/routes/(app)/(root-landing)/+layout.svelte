<script>
	import { goto } from '$app/navigation';
	import { headerTitle } from '$lib/stores/header';
	import { MoveLeft } from 'lucide-svelte';
	let { children } = $props();

	function handleBack() {
		goto($headerTitle.backUrl, {
			invalidateAll: true
		});
	}
</script>

<header class="w-full bg-white border-b border-rose-200 shadow-sm sticky top-0 z-20">
	<div class="max-w-md mx-auto px-4 py-3 flex items-center gap-4">
		<button
			class="text-gray-800 hover:text-gray-600 focus:outline-none"
			onclick={handleBack}
			aria-label="back"
		>
			<MoveLeft class="w-6 h-6" />
		</button>
		<h1 class="font-semibold text-gray-800 tracking-tight text-left font-kan">
			{$headerTitle.title}
		</h1>
		<div></div>
	</div>
</header>
{@render children()}
