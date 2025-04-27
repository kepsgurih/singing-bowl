import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

// GET satu Schedule
export async function GET({ params }) {
  const schedule = await prisma.schedule.findUnique({
    where: { id: params.id },
    include: { group: true }
  });
  return json({ success: true, data: schedule });
}

// PUT update Schedule
export async function PUT({ params, request }) {
  const body = await request.json();
  const updated = await prisma.schedule.update({
    where: { id: params.id },
    data: {
      label: body.label,
      duration: body.duration,
      price: body.price,
      groupId: body.groupId,
    }
  });
  return json({ success: true, data: updated });
}

// DELETE Schedule
export async function DELETE({ params }) {
  await prisma.schedule.delete({
    where: { id: params.id },
  });
  return json({ success: true, message: 'Schedule deleted' });
}
