import prisma from '$lib/config/prisma';
import { fail, type Actions } from '@sveltejs/kit';
import { startOfDay } from 'date-fns';
import { emailResetSend } from '$lib/helper/sending';

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const ip = getClientAddress();

		if (!email || typeof email !== 'string') {
			return fail(400, { messageError: 'Email is required.' });
		}

		const now = new Date();
		const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
		const startToday = startOfDay(now);

		// Cek apakah IP ini sudah request dalam 5 menit terakhir
		const recentRequest = await prisma.forgotPassword.findFirst({
			where: {
				ip,
				createdAt: { gte: fiveMinutesAgo }
			},
			orderBy: { createdAt: 'desc' }
		});
		if (recentRequest) {
			return fail(429, { messageError: 'Please wait 5 minutes before trying again.' });
		}

		// Hitung jumlah permintaan hari ini dari IP
		const totalToday = await prisma.forgotPassword.count({
			where: {
				ip,
				createdAt: { gte: startToday }
			}
		});

		if (totalToday >= 3) {
			return fail(429, { messageError: 'You have reached your daily request limit. Please try again tomorrow.' });
		}

		// Pastikan user dengan email tersebut ada
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) {
			return fail(400, { messageError: 'Email not found.' });
		}

		// Buat token dan simpan request
		const reset = await prisma.forgotPassword.create({
			data: {
				email,
				ip,
				token: crypto.randomUUID(),
				expiredAt: new Date(now.getTime() + 60 * 60 * 1000), // Token berlaku 1 jam
			}
		});

		// Kirim email reset
		emailResetSend(email, reset.token);

		return {
			success: true,
			message: 'A password reset link has been sent to your email.',
		};
	}
};
