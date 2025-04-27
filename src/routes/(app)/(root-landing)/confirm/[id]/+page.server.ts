import prisma from '$lib/config/prisma.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const scheduleId = params.id;
    if (!scheduleId) {
        throw new Error('Schedule ID is required');
    }
    const calendar = await prisma.calendar.findUnique({
        where: { id: scheduleId }
    });

    if (!calendar) {
        throw new Error('Schedule not found');
    }

    const schedule = await prisma.schedule.findUnique({
        where: { id: calendar.scheduleId }
    });

    return {
        schedule,
        calendar
    };
}

export const actions: Actions = {
    default: async ({ request, locals, params }) => {
        const formData = await request.formData()
        const reason = formData.get('reason')
        const idReq = formData.get('id')
        const idParams = params.id
        if (!idReq || !idParams) {
            console.log('Invalid request', { idReq, idParams });
            return fail(400, { messageError: 'Invalid request' })
        }

        const calendar = await prisma.calendar.findUnique({
            where: { id: idParams }
        })
        if (!calendar) {
            console.log('Calendar not found');
            return fail(404, { messageError: 'Calendar not found' });
        }

        const schedule = await prisma.schedule.findUnique({
            where: { id: calendar.scheduleId }
        })

        if (!schedule) {
            console.log('Schedule not found');
            return fail(404, { messageError: 'Schedule not found' });
        }

        if (calendar.id !== idReq) {
            console.log('Schedule ID mismatch');
            return fail(400, { messageError: 'Schedule ID mismatch' })
        }

        if (schedule.price === 0 && !reason) {
            console.log('Reason is required');
            return fail(400, { messageError: 'Reason is required' })
        }

        if (calendar.status !== 'Active') {
            console.log('Schedule is not active');
            return fail(400, { messageError: 'Schedule is not active' });
        }

        await prisma.booked.create({
            data: {
                calendarId: calendar.id,
                reason: reason as string ?? "",
                userId: locals.user.id
            }
        })

        await prisma.calendar.update({
            where: { id: calendar.id },
            data: {
                status: 'Booked'
            }
        })

        const formattedDate = new Date(calendar.date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const message = `
            <b>New Booking Request</b>
            <b>Class:</b> ${schedule.label}
            <b>Date:</b> ${formattedDate}
            <b>Time:</b> ${calendar.time}
            <b>Reason:</b> ${reason}

            <b>Name:</b> ${locals.user.fullName}
            <b>Phone:</b> ${locals.user.phone}
            <b>Email:</b> ${locals.user.email}
            `;

        fetch(`https://api.telegram.org/bot7877942456:AAFVYbwbNs2ulRSwV8uwVo0oekZ5DgmteNw/sendMessage?chat_id=-4656541800&text=${encodeURIComponent(message)}&parse_mode=HTML`, {
            method: 'POST'
        });
        redirect(303, '/payment')
    }
}