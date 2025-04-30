import prisma from '$lib/config/prisma.js'

export const load = async ({ params }) => {
    let schedule = await prisma.schedule.findUnique({
        where: {
            id: params.id
        }
    })
    let calendar = await prisma.calendar.findMany({
        where: {
            scheduleId: params.id
        }
    })

    if (!schedule) {
        return {
            schedule: null,
            calendar: null
        }
    }
    
    if(calendar.length > 0) {
        calendar = calendar.filter(c => !c.disable);
    }

    return {
        schedule,
        calendar
    }
}