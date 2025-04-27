import prisma from '$lib/config/prisma.js'

export const load = async ({ params }) => {
    const schedule = await prisma.schedule.findUnique({
        where: {
            id: params.id
        }
    })
    const calendar = await prisma.calendar.findMany({
        where: {
            scheduleId: params.id
        }
    })

    return {
        schedule,
        calendar
    }
}