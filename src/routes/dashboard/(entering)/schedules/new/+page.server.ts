import prisma from '$lib/config/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async () => {
	try {
		const groups = await prisma.groupSchedule.findMany({
			orderBy: { order: 'asc' }
		});

		return { groups };
	} catch (error) {
		console.error('Gagal load groups:', error);
		return { groups: [] }; // fallback kalau error
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const label = formData.get('label') as string;
		const duration = Number(formData.get('duration'));
		const price = Number(formData.get('price'));
		const groupId = formData.get('groupId') as string;
		const caption = formData.get('caption') as string;
		const isGroup = formData.get('isGroup') === 'true';

		console.log('isGroup', isGroup);

		if (!label || !duration || !groupId || !caption) {
			return fail(400, { success: false, message: 'Data tidak lengkap' });
		}

		await prisma.schedule.create({
			data: {
				label,
				duration,
				price: price || 0,
				groupId,
				caption,
				isGroup: isGroup ? true : false
			}
		});

		redirect(303, '/dashboard/schedules');
	}
};
