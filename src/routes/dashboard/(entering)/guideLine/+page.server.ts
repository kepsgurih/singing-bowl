import prisma from "$lib/config/prisma";

export const load = async () => {
    const config = await prisma.guideLines.findFirst();

    if (!config) return {
        config: {
            title: '',
            description: ''
        }
    }

    return {
        config
    }
}