import { fail, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import prisma from '$lib/config/prisma';

export const actions = {
    default: async ({ request }: { request: RequestEvent['request'] }) => {
        const data = await request.formData();
        const name = data.get('name')
        const username = data.get('username')
        const url = data.get('url')
        const order = data.get('order')
        const icon = data.get('icon') || '';

        if (!username || !url || !name || !icon || !order) {
            return fail(400, { errorMessage: 'All fields are required' });
        }

        await prisma.linkTree.create({
            data: {
                name: name.toString(),
                username: username.toString(),
                url: url.toString(),
                order: Number(order),
                icon: icon.toString()
            }
        });

        redirect(303, '/dashboard/tree');
    }
}