import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

export async function GET({ params }) {
  const calendar = await prisma.calendar.findUnique({
    where: { id: params.id },
  });
  return json({ success: true, data: calendar });
}

export async function PUT({ params, request }) {
  const body = await request.json();
  const calendar = await prisma.calendar.update({
    where: { id: params.id },
    data: {
      date: new Date(body.date),
      time: body.time,
      kelas: body.kelas,
      status: body.status,
      scheduleId: body.scheduleId
    },
  });
  return json({ success: true, data: calendar });
}

export async function DELETE({ params }) {
  await prisma.calendar.delete({
    where: { id: params.id },
  });
  return json({ success: true });
}
