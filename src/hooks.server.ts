import type { Handle, HandleServerError } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');
	const forwarded = event.request.headers.get('x-forwarded-for');
	const ip = forwarded ? forwarded.split(',')[0] : event.getClientAddress();

	event.locals.ip = ip;
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

export const handleError: HandleServerError = ({ error, event }) => {
	const forwarded = event.request.headers.get('x-forwarded-for');
	const ip = forwarded ? forwarded.split(',')[0] : event.getClientAddress();
  
	console.error('Error occurred:', {
	  timestamp: new Date().toISOString(),
	  status: 'status' in (error as Record<string, any>) ? (error as Record<string, any>).status : 500,
	  message: error instanceof Error ? error.message : 'Unknown error',
	  url: event.url.pathname,
	  ip,
	});
  
	return {
	  message: 'Terjadi kesalahan pada server.',
	  code: 'SERVER_ERROR'
	};
  };