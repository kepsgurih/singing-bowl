import prisma from "$lib/config/prisma"

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

    return {
        book
    }
}