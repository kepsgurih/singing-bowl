import prisma from '$lib/config/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export const load = async () => {
	const config = await prisma.config.findFirst();

	if (!config)
		return {
			config: {
				name: '',
				avatar: '',
				description: ''
			}
		};

	return {
		config
	};
};

const postConfig = async ({ request }: { request: RequestEvent['request'] }) => {
	const data = await request.formData();
	const name = data.get('name')?.toString();
	const description = data.get('description')?.toString();
	const file = data.get('file') as File;

	if (!name || !description) {
		console.log('here');
		return fail(400, { errorMessage: 'All fields are required' });
	}

	let avatar: string | undefined;
	const existingConfig = await prisma.config.findFirst();

	if (file && file.size > 0) {
		// Save file to public/uploads
		const buffer = Buffer.from(await file.arrayBuffer());
		const fileExt = path.extname(file.name) || '.png';
		const filename = `${randomUUID()}${fileExt}`;
		const uploadPath = path.join('static', 'uploads', filename);
		await fs.writeFile(uploadPath, buffer);

		avatar = `/uploads/${filename}`; // Relative path accessible via web
	} else if (existingConfig) {
		avatar = existingConfig.avatar; // Use previous avatar if file is not set
	}

	console.log(description);

	if (existingConfig) {
		await prisma.config.update({
			where: { id: existingConfig.id },
			data: {
				name,
				avatar,
				description
			}
		});
	} else {
		await prisma.config.create({
			data: {
				name,
				avatar: avatar || '', // Default to empty string if no avatar
				description
			}
		});
	}

	return redirect(303, '/dashboard/settings');
};

export const actions: Actions = {
	default: postConfig
};
