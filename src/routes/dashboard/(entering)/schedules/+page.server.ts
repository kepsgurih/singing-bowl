import prisma from '$lib/config/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
  const schedules = await prisma.schedule.findMany({
    include: {
        group: true
    },
    orderBy: {
        groupId: 'asc'
    }
  });

  return { schedules };
};

export const actions = {
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    if (!id) {
      return fail(400, { message: 'ID tidak ditemukan' });
    }

    await prisma.schedule.delete({
      where: { id }
    });

    return { success: true };
  }
};
