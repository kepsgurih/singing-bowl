import db from '$lib/config/surrealdb';
import { redirect } from '@sveltejs/kit';
import { writable } from 'svelte/store';

export const userSession = writable<any>(null);
export const loadingSession = writable<boolean>(true);

if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
        await db.authenticate(token);
        const response = await db.info();
        if (!response) {
            localStorage.removeItem('accessToken');
            userSession.set(null);
            loadingSession.set(false);
            redirect(307,'/signin');
        } else {
            userSession.set(response);
            loadingSession.set(false);
        }
    } else {
        loadingSession.set(false);
    }
}