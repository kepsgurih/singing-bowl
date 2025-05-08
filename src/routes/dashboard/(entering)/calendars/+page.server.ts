import prisma from "$lib/config/prisma"
import { fail } from "@sveltejs/kit"

export const load = async ({ url }) => {
    const page = Number(url.searchParams.get('page') || 1);
    const perPage = Number(url.searchParams.get('perPage') || 10); // Default 10 items per page
    
    const totalCalendars = await prisma.calendar.count();
    const totalPages = Math.ceil(totalCalendars / perPage);
    
    const calendar = await prisma.calendar.findMany({
        orderBy: { date: 'asc' },
        include: {
            schedule: true,
        },
        skip: (page - 1) * perPage,
        take: perPage
    })

    return {
        calendar,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: totalCalendars,
            itemsPerPage: perPage
        }
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