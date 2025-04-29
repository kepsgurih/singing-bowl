import prisma from "$lib/config/prisma";
import type { Actions } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const load = async () => {
    const config = await prisma.howTo.findFirst();

    if (!config) return {
        config: {
            title: '',
            description: ''
        }
    }

    return {
        config
    }
}

const postConfig = async ({ request }: { request: RequestEvent['request'] }) => {
    const data = await request.formData();
    const title = data.get('title')?.toString();
    const description = data.get('description')?.toString();

    if (!title || !description) {
        console.log('here')
        return fail(400, { errorMessage: 'All fields are required' });
    }

    const existingConfig = await prisma.howTo.findFirst();

    if (existingConfig) {
        await prisma.howTo.update({
        where: { id: existingConfig.id },
        data: {
            title,
            description,
        },
        });
    } else {
        await prisma.howTo.create({
        data: {
            title, // Default to empty string if no avatar
            description,
        },
        });
    }

    return redirect(303, '/dashboard/direction');
};


export const actions:Actions = {
default:postConfig
}