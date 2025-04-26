import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';
import bcrypt from 'bcrypt';
import { signToken } from '$lib/helper/jwt';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, password } = await request.json();

		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 401 });
		}

		const token = signToken({ email });

		return new Response(JSON.stringify({ accessToken: token.accessToken, refreshToken: token.refreshToken }), { status: 200 });
	} catch (error) {
		console.error(error, '/api/auth/login')
		return new Response(JSON.stringify({ error: 'An error occurred on the server' }), { status: 500 });
	}
};
