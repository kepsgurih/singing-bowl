import prisma from '$lib/config/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const groupSchedule = await prisma.groupSchedule.findUnique({
		where: {
			id: params.id
		}
	});

	return {
		group: groupSchedule
	};
};

export const actions = {
	edit: async ({ request, params }) => {
		const { id } = params;
		const data = await request.formData();
		const label = data.get('label');

		const groupSchedule = await prisma.groupSchedule.update({
			where: {
				id: id as string
			},
			data: {
				label: label as string
			}
		});

		redirect(302, '/dashboard/groupschedule');
	}
};
