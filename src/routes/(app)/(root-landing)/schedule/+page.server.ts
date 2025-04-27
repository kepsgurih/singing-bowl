import prisma from "$lib/config/prisma";

export const load = async () => {
    const group = await prisma.groupSchedule.findMany({
        orderBy: { order: 'asc' }
    });

    const schedules = await prisma.schedule.findMany();

    return {
        group,
        schedules
    }


}