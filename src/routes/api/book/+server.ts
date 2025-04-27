import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';
import { getSession } from '$lib/helper/getSession';

// Admin: Get all booked
export async function GET(event) {
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
  const bookings = await prisma.booked.findMany({
    include: {
      calendar: true,
      user: true
    }
  });

  return json({ success: true, data: bookings });
}

// User: Book a calendar
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

  const body = await request.json();
  const { calendarId } = body;

  if (!calendarId) {
    return json({ success: false, message: 'calendarId is required' }, { status: 400 });
  }

  const booking = await prisma.booked.create({
    data: {
      calendarId,
      userId: user.id
    }
  });

  await prisma.calendar.update({
    where: { id: calendarId },
    data: { status: 'Booked' }
  });

  return json({ success: true, data: booking });
}
