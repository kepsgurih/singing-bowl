import type { Handle } from '@sveltejs/kit'
import prisma from '$lib/config/prisma'

export const handle: Handle = async ({ event, resolve }) => {
    // get cookies from browser
    const session = event.cookies.get('session')

    if (!session) {
        // if there is no session load page as normal
        return await resolve(event)
    }

    // find the user based on the session
    const user = await prisma.user.findUnique({
        where: { token: session },
        select: {
            fullName: true,
            email: true,
            role: true
        },
    })

    // if `user` exists set `events.local`
    if (user) {
        event.locals.user = {
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        }
    }

    // load page as normal
    return await resolve(event)
}
