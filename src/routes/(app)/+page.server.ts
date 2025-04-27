import prisma from '$lib/config/prisma.js'

export const load = async ({ locals }) => {
    const config = await prisma.config.findFirst()
    const links = await prisma.linkTree.findMany()
    if (!config || !links) {
        return {
            config: null,
            links: [],
        }
    }
    console.log('config', config)
    console.log('links', links)
    return{
        config : {
            name: config?.name,
            avatar: config?.avatar,
            description: config?.description,
        },
        links: links.map((link) => ({
            name: link.name,
            username: link.username,
            url: link.url,
            icon: link.icon,
            order: link.order,
        })),
    }
}