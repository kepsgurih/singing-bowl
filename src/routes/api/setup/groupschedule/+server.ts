import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

// GET semua GroupSchedule
export async function GET() {
  const groups = await prisma.groupSchedule.findMany({
    orderBy: { order: 'asc' }
  });
  return json({ success: true, data: groups });
}

// POST buat GroupSchedule baru
export async function POST({ request }) {
  const body = await request.json();
  const group = await prisma.groupSchedule.create({
    data: body,
  });
  return json({ success: true, data: group });
}
