import prisma from '$lib/config/prisma';
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';

export const load = async () => {
	const groups = await prisma.groupSchedule.findMany({
		orderBy: { order: 'asc' }
	});
	return {
		groups
	};
};

export const actions = {
	delete: async ({ request }: { request: RequestEvent['request'] }) => {
		const data = await request.formData();
		const id = data.get('id');
		const bool = data.get('bool') === 'true';
		await prisma.groupSchedule.update({
			where: { id: id as string },
			data: { disable: bool ? false : true }
		});

		redirect(302, '/dashboard/groupschedule');
	}
};
