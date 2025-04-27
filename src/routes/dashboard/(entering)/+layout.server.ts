import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    const {locals} = event;
    if (!locals?.user || locals.user.role !== 'ADMIN') {
        throw redirect(302, '/dashboard');
    }
  }
  