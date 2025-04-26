import type { RequestHandler } from '@sveltejs/kit';
import { verifyToken, signToken } from '$lib/helper/jwt';
import prisma from '$lib/config/prisma';
import type { JwtPayload } from 'jsonwebtoken';

export const GET: RequestHandler = async ({ request }) => {
	try {
		const authHeader = request.headers.get('authorization');
		const refreshHeader = request.headers.get('x-refresh-token'); // ambil refreshToken dari custom header
		
		if (!authHeader || !refreshHeader) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
		}

		const token = authHeader.split(' ')[1];
		let payload = verifyToken(token) as JwtPayload | null;

		if (!payload) {
			// Access token invalid atau expired, coba verify refreshToken
			const refreshPayload = verifyToken(refreshHeader) as JwtPayload | null;
			if (!refreshPayload) {
				return new Response(JSON.stringify({ error: 'Session expired' }), { status: 401 });
			}

			// Bikin accessToken baru
			const newAccessToken = signToken({ email: refreshPayload.email });
			
			// Kirim response token baru dan data user
			const user = await prisma.user.findUnique({
				where: { email: refreshPayload.email },
				select: {
					id: true,
					email: true,
					fullName: true,
					phone: true,
					address: true,
					role: true
				}
			});

			if (!user) {
				return new Response(JSON.stringify({ error: 'User tidak ditemukan' }), { status: 404 });
			}

			return new Response(
				JSON.stringify({ user, accessToken: newAccessToken, test:"123123" }),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		// Access token valid
		if (!payload.email) {
			throw new Error('Token tidak valid atau email tidak ditemukan');
		}

		const user = await prisma.user.findUnique({
			where: { email: payload.email },
			select: {
				id: true,
				email: true,
				fullName: true,
				phone: true,
				address: true,
				role: true
			}
		});

		if (!user) {
			return new Response(JSON.stringify({ error: 'User tidak ditemukan' }), { status: 404 });
		}

		return new Response(JSON.stringify({ user }));
	} catch (err) {
		console.log(err, 'error di /api/auth/me');
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}
};
