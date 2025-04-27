import prisma from '$lib/config/prisma';
import type { CalendarStatus } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const calendarId = params.id;
    if (!calendarId) {
        throw new Error('Calendar ID is required');
    }

    const calendar = await prisma.calendar.findUnique({
        where: { id: calendarId }
    });

    const schedules = await prisma.schedule.findMany();

    if (!calendar) {
        throw new Error('Calendar not found');
    }

    return {
        calendar,
        schedules
    };
}

export const actions = {
    default: async ({ request, params }) => {
        const id = params.id;
        const formData = await request.formData();
        const date = formData.get('date');
        const kelas = formData.get('kelas');
        const time = formData.get('time');
        const status = formData.get('status');
        const scheduleId = formData.get('scheduleId');

        if (!id) {
            return fail(400, { error: 'Calendar ID is required' });
        }
        if (!date || !time || !status) {
            return fail(400, { error: 'All fields are required' });
        }
        if (!scheduleId) {
            return fail(400, { error: 'Schedule ID is required' });
        }

        const update = await prisma.calendar.update({
            where: { id },
            data: {
                date: new Date(date as string),
                time: time as string,
                kelas: kelas as string,
                status: status as CalendarStatus,
                scheduleId: scheduleId as string,
            }
        });

        redirect(303, `/dashboard/calendars`);
    }
}