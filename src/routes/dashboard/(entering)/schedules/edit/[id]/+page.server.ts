import prisma from '$lib/config/prisma.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
	const scheduleId = params.id;
	// Memuat schedule dan termasuk deskripsi
	const schedule = await prisma.schedule.findUnique({
		where: { id: scheduleId },
		include: {
			group: true // Memuat group terkait
		}
	});

	if (!schedule) {
		return fail(404, { message: 'Schedule tidak ditemukan' });
	}

	// Memuat data group
	const groups = await prisma.groupSchedule.findMany({
		orderBy: { order: 'asc' }
	});

	return {
		schedule, // Kembalikan data schedule beserta deskripsinya
		groups
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		// Ambil data dari form
		const label = formData.get('label') as string;
		const duration = Number(formData.get('duration'));
		const price = Number(formData.get('price'));
		const groupId = formData.get('groupId') as string;
		const caption = formData.get('caption') as string;
		const isGroup = formData.get('isGroup') === 'true';
		// Validasi data yang diperlukan
		if (!label || !duration || !groupId || !caption) {
			return fail(400, { success: false, message: 'Data tidak lengkap' });
		}
		await prisma.schedule.update({
			where: { id: params.id },
			data: {
				label,
				duration,
				price: price ?? 0,
				groupId,
				caption,
				isGroup: isGroup ? true : false
			}
		});
		return redirect(303, '/dashboard/schedules');
	}
};
