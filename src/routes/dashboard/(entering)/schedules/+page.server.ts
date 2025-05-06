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
    const bool = formData.get('bool') === 'true';
    if (!id) {
      return fail(400, { message: 'ID tidak ditemukan' });
    }

    // Check if the schedule exists
    const schedule = await prisma.schedule.findUnique({
      where: { id }
    });
    if (!schedule) {
      console.log('Schedule not found');
      return fail(404, { message: 'Schedule tidak ditemukan' });
    }

    await prisma.schedule.update({
      where: { id },
      data: {
        disable: bool ? false : true
      }
    });

    return {
      success: true,
      message: 'Schedule berhasil diupdate'
    }
  }
};
