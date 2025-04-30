import prisma from "$lib/config/prisma"
import type { CalendarStatus } from "@prisma/client"
import { fail, redirect } from "@sveltejs/kit"

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
        const scheduleId = formData.getAll("scheduleId")

        if (!date || !time || !kelas || !status || !scheduleId) {
            return fail(400, {errorMessage: "All fields are required"})
        }

        for (const id of scheduleId) {
            await prisma.calendar.create({
                data: {
                    date: new Date(date as string),
                    time: time as string,
                    kelas: kelas as string,
                    status: status as CalendarStatus,
                    scheduleId: id as string,
                }
            })
        }


        return redirect(303, "/dashboard/calendars")
    }
}