import prisma from '$lib/config/prisma';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const config = await prisma.config.findFirst({
		select: {
			name: true,
			description: true,
			avatar: true
		}
	});

	if (!config) return {
		config: {
			name: 'Empty',
			avatar: 'https://picsum.photos/200',
			description: 'Empty'
		}
	}

	return {
		config
	};
};
