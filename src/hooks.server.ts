import type { Handle } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	// find the user based on the session
	const user = await prisma.user.findUnique({
		where: { token: session },
		select: {
			id: true,
			fullName: true,
			email: true,
			role: true,
			phone: true,
			ig: true
		}
	});

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			id: user.id,
			fullName: user.fullName,
			email: user.email,
			role: user.role,
			phone: user.phone,
			ig: user.ig ?? ''
		};
	}

	// load page as normal
	return await resolve(event);
};
