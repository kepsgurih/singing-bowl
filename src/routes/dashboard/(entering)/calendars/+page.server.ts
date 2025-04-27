import prisma from "$lib/config/prisma"
import { redirect } from "@sveltejs/kit"

export const load = async () => {
    const calendar = await prisma.calendar.findMany({
        include: {
            schedule: true,
        }
    })

    return {
        calendar
    }
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const id = formData.get('id')
        if (id) {
            await prisma.calendar.delete({
                where: {
                    id: id.toString()
                }
            })
        }
        redirect(303, '/dashboard/calendars')
    }
}