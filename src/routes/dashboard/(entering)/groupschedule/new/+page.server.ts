import { redirect, type Cookies } from "@sveltejs/kit";
import type { RequestEvent } from "../$types";
import prisma from "$lib/config/prisma";


export const load = async () => {
   console.log('Loading group schedules');
}

const add = async ({ request }: { request: RequestEvent['request'] }) => {
    const data = await request.formData();
    const label = data.get('label');
    const count = await prisma.groupSchedule.count();
    await prisma.groupSchedule.create({
        data: {
            label: label as string,
            order: count + 1,
        },
    });

    redirect(302, '/dashboard/groupschedule');
    // return {
    //     groupSchedule,
    // };
}

export const actions = { default: add }