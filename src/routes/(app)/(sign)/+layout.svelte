<script lang="ts">
	import { goto } from '$app/navigation';
	import { accessToken } from '$lib/stores/auth';
    import {userSession} from '$lib/stores/user'
    let {children} = $props()
    // if ($accessToken) {
    //     goto('/schedule');
    // }
console.log($userSession)
</script>

{@render children()}

