import prisma from "$lib/config/prisma"
import type { CalendarStatus } from "@prisma/client"
import { fail, redirect } from "@sveltejs/kit"

export const load = async () => {
    const book = await prisma.booked.findMany({
       include: {
           calendar: {
                include: {
                    schedule: true
                }
           },
           user: true
       }
    })

    console.log('book', book)

    return {
        book
    }
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const id = formData.get('id')
        if (!id) {
            return {
                status: 400,
                messageError: 'ID is required'
            }
        }
        const booked = await prisma.booked.findUnique({
            where: { id: id as string }
        })
        
        const cals = await prisma.calendar.update({
            where: { id: booked?.calendarId },
            data: {
                status: 'Active' as CalendarStatus
            }
        })


       const rem = await prisma.booked.delete({
            where: { id: id as string }
        })

        if (!rem) {
            console.log('Failed to delete booked', { id, booked })
            return fail(404, { messageError: 'Failed to delete booked' })
        }

        redirect(303, '/dashboard/book')
    }
}