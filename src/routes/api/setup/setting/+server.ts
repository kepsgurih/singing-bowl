// src/routes/api/config/+server.ts
import prisma from '$lib/config/prisma';
import { json } from '@sveltejs/kit';

import type { RequestEvent } from '@sveltejs/kit';


export const GET = async () => {
  try {
    // Ambil Config pertama (karena hanya ada satu)
    const config = await prisma.config.findFirst();

    if (!config) {
      // Jika config tidak ditemukan, kirimkan response 404
      return json({ success: false, message: 'Config tidak ditemukan.' }, { status: 404 });
    }

    // Jika config ditemukan, kirimkan data dengan response sukses
    return json({ success: true, data: config });
  } catch (error) {
    // Tangani jika terjadi error pada server
    console.error('Error fetching config:', error);
    return json({ success: false, message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
};

export const POST = async ({ request }: RequestEvent) => {
  try {
    const { name, avatar, description } = await request.json();

    // Validasi data yang diterima
    if (!name || !avatar || !description) {
      return json({ success: false, message: 'Semua field harus diisi.' }, { status: 400 });
    }

    // Cek apakah Config sudah ada
    const existingConfig = await prisma.config.findFirst();

    let updatedConfig;
    if (existingConfig) {
      // Jika ada, update data yang lama
      updatedConfig = await prisma.config.update({
        where: { id: existingConfig.id },
        data: {
          name,
          avatar,
          description,
        },
      });
    } else {
      // Jika tidak ada, buat Config baru
      updatedConfig = await prisma.config.create({
        data: {
          name,
          avatar,
          description,
        },
      });
    }

    return json({ success: true, data: updatedConfig });
  } catch (error) {
    console.error('Error creating or updating config:', error);
    return json({ success: false, message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
};
