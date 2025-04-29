import prisma from "$lib/config/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "../$types";


export const load = async () => {
    const links = await prisma.linkTree.findMany({
        orderBy: { order: 'asc' }
    });


    return {
        links
    }
}

export const actions = {
    default: async ({ request }: { request: RequestEvent['request'] }) => {
        const data = await request.formData()
        const id = data.get('id')

        if (!id) {
            return fail(400, { errorMessage: 'ID is required' });
        }

        await prisma.linkTree.delete({
            where: {
                id: id.toString()
            }
        });

        redirect(303, '/dashboard/tree');
    }
}