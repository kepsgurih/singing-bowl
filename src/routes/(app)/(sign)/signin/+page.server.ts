// import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Cookies, RequestEvent } from '@sveltejs/kit';

export const load = async ({locals}) => {
    if (locals?.user) {
        throw redirect(302, '/confirm');
    }
}

const login = async ({ cookies, request }: { cookies: Cookies; request: RequestEvent['request'] }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email ||
        !password
    ) {
        return fail(400, { invalid: true })
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return fail(400, { credentials: true })
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return fail(400, { credentials: true })
    }

    const authenticatedUser = await prisma.user.update({
        where: { email: user.email },
        data: { token: crypto.randomUUID() },
    })
    if (!authenticatedUser.token) {
        return fail(400, { credentials: true })
    }

    cookies.set('session', authenticatedUser.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      })
    
      // redirect the user
      redirect(302, '/confirm');
}

export const actions = { login }