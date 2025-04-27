import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';
import { getSession } from '$lib/helper/getSession.js';

// GET semua Calendar
export async function GET(event) {
  const calendars = await prisma.calendar.findMany({
    include: {
      schedule: {
        select: { label: true }
      }
    },
    orderBy: {
      date: 'asc'
    }
  });
  return json({ success: true, data: calendars });
}

// POST buat Calendar baru
export async function POST(event) {
  const { request } = event;
  const session = getSession(event);
  const token = session?.token;
  if (!token) {
    return json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { token },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true
    }
  });
  if (!user) {
    return json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if(user.role !== 'ADMIN') {
    return json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const calendar = await prisma.calendar.create({
    data: {
      date: new Date(body.date),
      time: body.time,
      kelas: body.kelas,
      status: body.status,
      scheduleId: body.scheduleId
    }
  });
  return json({ success: true, data: calendar });
}
