import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

// GET semua Schedule
export async function GET() {
  const schedules = await prisma.schedule.findMany({
    include: { group: true }, // ikut ambil data group
    orderBy: { label: 'asc' }, // atau sesuai kebutuhan
  });
  return json({ success: true, data: schedules });
}

// POST buat Schedule baru
export async function POST({ request }) {
  const body = await request.json();
  const schedule = await prisma.schedule.create({
    data: {
      label: body.label,
      duration: body.duration,
      price: body.price,
      groupId: body.groupId,
    },
  });
  return json({ success: true, data: schedule });
}
