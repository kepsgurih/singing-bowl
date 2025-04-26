import type { RequestHandler } from '@sveltejs/kit';
import { verifyToken } from '$lib/helper/jwt';
import prisma from '$lib/config/prisma';
import type { JwtPayload } from 'jsonwebtoken';

export const GET: RequestHandler = async ({ request }) => {
	try {
		const authHeader = request.headers.get('authorization');
		if (!authHeader) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
		}

		const token = authHeader.split(' ')[1];
        const payload = verifyToken(token) as JwtPayload;
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
            address: true
          }
        });

		if (!user) {
			return new Response(JSON.stringify({ error: 'User tidak ditemukan' }), { status: 404 });
		}

		return new Response(JSON.stringify(user));
	} catch (err) {
		return new Response(JSON.stringify({ error: 'Token tidak valid' }), { status: 401 });
	}
};
