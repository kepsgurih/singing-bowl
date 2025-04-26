import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';
import bcrypt from 'bcrypt';
import { signToken } from '$lib/helper/jwt';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, password, fullName, phone, address } = await request.json();

		if (!email || !password || !fullName || !phone) {
			return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), { status: 400 });
		}

		const existing = await prisma.user.findUnique({ where: { email } });
		if (existing) {
			return new Response(JSON.stringify({ error: 'Email sudah terdaftar' }), { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				fullName,
				phone,
				address: address ?? ""
			}
		});

		const token = signToken({ email: newUser.email });

		return new Response(JSON.stringify({ token }), { status: 201 });
	} catch (err) {
		console.error('Register error:', err);
		return new Response(JSON.stringify({ error: 'Terjadi kesalahan server' }), { status: 500 });
	}
};
