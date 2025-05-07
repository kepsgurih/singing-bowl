import prisma from '$lib/config/prisma.js';

export const load = async ({ locals }) => {
	const config = await prisma.config.findFirst();
	const links = await prisma.linkTree.findMany();
	if (!config || !links) {
		return {
			config: {
				name: '',
				description: '',
				avatar: 'https://dummyimage.com/600x400/000/fff'
			},
			links: [
				{
					name: 'Data Not Found',
					url: '#',
					icon: 'youtube',
					username: 'Data Not Found'
				}
			]
		};
	}
	return {
		config: {
			name: config?.name,
			avatar: config?.avatar,
			description: config?.description
		},
		links: links.map((link) => ({
			name: link.name,
			username: link.username,
			url: link.url,
			icon: link.icon,
			order: link.order
		}))
	};
};
