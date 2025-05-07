import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initialHeader = browser
	? JSON.parse(localStorage.getItem('header') || '{"title": "", "backUrl": ""}')
	: { title: '', backUrl: '' };

interface HeaderState {
	title: string;
	backUrl: string;
}

export const headerTitle = writable<HeaderState>(initialHeader);

headerTitle.subscribe((value) => {
	if (browser) {
		localStorage.setItem('header', JSON.stringify(value));
	}
});
