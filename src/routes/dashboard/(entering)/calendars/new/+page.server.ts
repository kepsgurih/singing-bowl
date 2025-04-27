import prisma from "$lib/config/prisma"
import type { CalendarStatus } from "@prisma/client"
import { redirect } from "@sveltejs/kit"

export const load = async () => {
    const schedules = await prisma.schedule.findMany({
        include: {
            group: true,
        }
    })

    return {
        schedules
    }
}

export const actions = {
    default: async ({ request }: { request: Request }) => {
        const formData = await request.formData()
        const date = formData.get("date")
        const time = formData.get("time")
        const kelas = formData.get("kelas")
        const status = formData.get("status")
        const scheduleId = formData.get("scheduleId")

        if( !date || !time || !kelas || !status || !scheduleId) {
            return {
                success: false,
                error: "All fields are required"
            }
        }
            const calendar = await prisma.calendar.create({
                data: {
                    date: new Date(date as string),
                    time: time as string,
                    kelas: kelas as string,
                    status: status as CalendarStatus,
                    scheduleId: scheduleId as string,
                }
            })
            

            return redirect(303, "/dashboard/calendars")
    }
}