import prisma from "$lib/config/prisma"
import { fail, redirect } from "@sveltejs/kit"

export const load = async () => {
    const calendar = await prisma.calendar.findMany({
        orderBy: { date: 'asc' },
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
        const id = formData.get('id') as string | null
        if (!id) {
            return fail(400, {
                message: 'ID is required'
            })
        }
        const bool = formData.get('bool') === 'true'
        const calendar = await prisma.calendar.findUnique({
            where: {
                id
            }
        })
        if (!calendar) {
            return fail(404, {
                message: 'Calendar not found'
            })
        }
        await prisma.calendar.update({
            where:{id},
            data: {
                disable: bool ? false : true
            }
        })
        
        
        return {
            success: true,
            message: 'Calendar updated successfully'
        }
    }
}