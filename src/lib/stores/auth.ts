import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const accessToken = writable<string | null>(null);
export const refreshToken = writable<string | null>(null);
export const userSession = writable<any>(null);
export const loadingSession = writable<boolean>(true);

async function loadSession() {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        const refresh = localStorage.getItem('refreshToken')
        console.log('here')
        if (token && refresh) {
            console.log('here2')
            accessToken.set(token);
            try {
                const res = await fetch('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-refresh-token': refresh
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch user');
                }

                const user = await res.json();
                if(user.accessToken){
                    console.log('hereee')
                    accessToken.set(user.accessToken)
                    localStorage.setItem('accessToken',user.accessToken)
                    userSession.set(user.user);
                } else {
                    userSession.set(user.user);
                }
            } catch (error) {
                console.log(error, 'error');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                userSession.set(null);
                accessToken.set(null);
                refreshToken.set(null)
            } finally {
                loadingSession.set(false);
            }
        } else {
            loadingSession.set(false);
        }
    }
}

accessToken.subscribe((value) => {
   if (browser && value !== null) {
        localStorage.setItem('accessToken', value);
    }
});

refreshToken.subscribe((value) => {
    if (browser && value !== null) {
         localStorage.setItem('refreshToken', value);
     }
 });


loadSession();
