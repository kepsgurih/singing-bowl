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
      const descriptions = formData.getAll('descriptions') as string[];
  
      console.log(label)
      if (!label || !duration || !groupId || descriptions.length === 0) {
        return fail(400, { success: false, message: 'Data tidak lengkap' });
      }
  
        await prisma.schedule.create({
          data: {
            label,
            duration,
            price: price || 0,
            groupId,
            description: descriptions,
          }
        });
  
        redirect(303, '/dashboard/schedules');
    }
  };