import prisma from '$lib/config/prisma.js';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const phone = formData.get('phone') as string;
        const fullName = formData.get('fullName');

        if (!email || !password || !fullName || !phone || !confirmPassword) {
            return fail(400, { errorMessage: 'All fields are required' });
        }

        const phoneRegex = /^(\+62|62|0)[8][1-9][0-9]{6,9}$/;
        if (typeof phone !== 'string' || !phoneRegex.test(phone)) {
            return fail(400, { errorMessage: 'Invalid phone number format for Indonesia' });
        }

        if (password !== confirmPassword) {
            return fail(400, { errorMessage: 'Passwords do not match' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email as string }
        });
        if (existingUser) {
            return fail(400, { errorMessage: 'Email already exists' });
        }

        const existingPhone = await prisma.user.findFirst({
            where: { phone: phone }
        });
        if (existingPhone) {
            return fail(400, { errorMessage: 'Phone number already exists' });
        }
        const hashedPassword = await bcrypt.hash(password as string, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email as string,
                password: hashedPassword,
                fullName: fullName as string,
                phone: phone,
                role: 'USER',
                token: crypto.randomUUID() ,
            }
        });

        if (!newUser) {
            return fail(500, { errorMessage: 'Failed to create user' });
        }

        cookies.set('session', newUser.token ?? '', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
        })

        // redirect the user
        redirect(302, '/confirm');


    }
};