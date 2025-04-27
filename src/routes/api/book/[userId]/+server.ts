import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

// GET semua booking milik user tertentu
export async function GET({ params }) {
  const { userId } = params;

  try {
    const bookings = await prisma.booked.findMany({
      where: { userId },
      include: { calendar: true },
    });

    return json({ success: true, data: bookings });
  } catch (error) {
    return json({ success: false, message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
}

// DELETE booking user dan balikin calendar status ke Active
export async function DELETE({ params, url }) {
  const { userId } = params;
  const calendarId = url.searchParams.get('calendarId');

  if (!calendarId) {
    return json({ success: false, message: 'calendarId diperlukan untuk menghapus booking' });
  }

  try {
    await prisma.booked.deleteMany({
      where: { userId, calendarId },
    });

    await prisma.calendar.update({
      where: { id: calendarId },
      data: { status: 'Active' },
    });

    return json({ success: true, message: 'Booking dihapus dan Calendar diaktifkan kembali' });
  } catch (error) {
    return json({ success: false, message: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
}
