import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma'; // pastikan prisma client kamu sudah setup

// GET semua LinkTree
export async function GET() {
  const links = await prisma.linkTree.findMany({
    orderBy: { order: 'asc' }
  });
  return json({ success: true, data: links });
}

// POST untuk buat baru
export async function POST({ request }) {
  const body = await request.json();
  const link = await prisma.linkTree.create({
    data: body,
  });
  return json({ success: true, data: link });
}
