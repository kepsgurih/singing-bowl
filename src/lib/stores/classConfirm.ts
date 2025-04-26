import { writable } from "svelte/store";
import { browser } from '$app/environment';

const initial = browser ? localStorage.getItem('confirmClass') : null;

export const confirmClass = writable<string | null>(initial);

confirmClass.subscribe((value) => {
    if (browser && value !== null) {
        localStorage.setItem('confirmClass', value);
    }
});
