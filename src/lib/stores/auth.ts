import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { writable } from 'svelte/store';

export const accessToken = writable<string | null>(null);
export const userSession = writable<any>(null);
export const loadingSession = writable<boolean>(true);

async function loadSession() {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        console.log(token, 'token');
        if (token) {
            accessToken.set(token);
            try {
                const res = await fetch('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch user');
                }

                const user = await res.json();
                console.log(user, 'user');
                userSession.set(user);
            } catch (error) {
                console.log(error, 'error');
                localStorage.removeItem('accessToken');
                userSession.set(null);
                accessToken.set(null);
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


loadSession();
