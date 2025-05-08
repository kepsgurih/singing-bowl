import { type RequestEvent } from '@sveltejs/kit';

export function getSession(event: RequestEvent) {
	const token = event.cookies.get('session');

	if (!token) {
		return null;
	}

	return { token };
}
