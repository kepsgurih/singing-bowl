import prisma from "$lib/config/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export const load = async ({ params }: { params: { id: string } }) => {
    const link = await prisma.linkTree.findUnique({
        where: {
            id: params.id
        }
    });

    if (!link) return fail(404, { errorMessage: 'Link not found' });

    return {
        link
    }
}

export const actions = {
    default: async ({ request, params }: { request: RequestEvent['request'], params: { id: string } }) => {
        const data = await request.formData();
        const name = data.get('name');
        const username = data.get('username');
        const url = data.get('url');
        const order = data.get('order');
        const icon = data.get('icon') || '';

        if (!username || !url || !name || !icon || !order) {
            console.log('here')
            return fail(400, { errorMessage: 'All fields are required' });
        }

        await prisma.linkTree.update({
            where: {
                id: params.id
            },
            data: {
                name: name.toString(),
                username: username.toString(),
                url: url.toString(),
                order: Number(order),
                icon: icon.toString()
            }
        });

        return redirect(303, '/dashboard/tree');
    }
}