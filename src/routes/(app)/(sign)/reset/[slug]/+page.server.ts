import prisma from '$lib/config/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';


export const load = async ({ params, locals }) => {
    const token = params.slug;
    if (!token) {
        throw new Error('Token is required');
    }
    const reset = await prisma.forgotPassword.findUnique({
        where: { token }
    });
    if (!reset) {
        error(401, { code: 'TOKEN_NOT_FOUND', message: 'Token not found' });
    }
    if (reset.expiredAt < new Date()) {
        error(401, { code: 'TOKEN_EXPIRED', message: 'Token expired' });
    }
    return {
        reset
    };
}

export const actions = {
    default: async ({ request, params }) => {
        const token = params.slug;
        const formData = await request.formData();
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        if (!password || !confirmPassword) {
            return fail(400, {errorMessage: 'Password is required'});
        }

        if (password !== confirmPassword) {
            return fail(400, {errorMessage: 'Passwords do not match'});
        }

        const reset = await prisma.forgotPassword.findUnique({
            where: { 
                token
             }
        });
        if (!reset) {
            return fail(400, {errorMessage: 'Token not found'});
        }
        if (reset.expiredAt < new Date()) {
            return fail(400, {errorMessage: 'Token expired'});
        }

        const hashedPassword = await bcrypt.hash(password as string, 10);
        await prisma.user.update({
            where: { email: reset.email },
            data: { 
                password: hashedPassword
             }
        });
        await prisma.forgotPassword.delete({
            where: { token }
        });

        redirect(302, '/signin');
    }
}