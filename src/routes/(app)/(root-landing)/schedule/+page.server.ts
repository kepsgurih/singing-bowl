import prisma from "$lib/config/prisma";

export const load = async () => {
    let group = await prisma.groupSchedule.findMany({
        orderBy: { order: 'asc' },
    });

    const guide = await prisma.guideLines.findFirst();
    const howTo = await prisma.howTo.findFirst();
    const benefits = await prisma.blog.findFirst();

    let schedules = await prisma.schedule.findMany({});

    if(schedules.length > 0) {
        schedules = schedules.
        filter(schedule => !schedule.disable);
    }

    if(group.length > 0) {
        group = group.filter(g => !g.disable);
    }

    return {
        group,
        schedules,
        guide,
        howTo,
        benefits
    }


}