import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

// PUT update GroupSchedule
export async function PUT({ request, params }) {
  const { id } = params;
  const body = await request.json();
  const group = await prisma.groupSchedule.update({
    where: { id },
    data: body,
  });
  return json({ success: true, data: group });
}

// DELETE hapus GroupSchedule
export async function DELETE({ params }) {
  const { id } = params;
  await prisma.groupSchedule.delete({
    where: { id },
  });
  return json({ success: true });
}
