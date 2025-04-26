<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { userSession } from '$lib/stores/auth';
	let {children} = $props()

	$effect(() => {
		if(browser){
			const currentPage = page.url.pathname;
			if ($userSession && $userSession.role === 'ADMIN' && currentPage === '/dashboard') {
				goto('/dashboard/app');
			}
		}
	});
</script>

{@render children()}
