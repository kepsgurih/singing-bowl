import prisma from "$lib/config/prisma";

export const load = async () => {
    const group = await prisma.groupSchedule.findMany({
        orderBy: { order: 'asc' }
    });

    const guide = await prisma.guideLines.findFirst();
    const howTo = await prisma.howTo.findFirst();

    const schedules = await prisma.schedule.findMany();

    return {
        group,
        schedules,
        guide,
        howTo
    }


}