import { json } from '@sveltejs/kit';
import prisma from '$lib/config/prisma';

// PUT untuk edit LinkTree by id
export async function PUT({ request, params }) {
  const { id } = params;
  const body = await request.json();
  const updated = await prisma.linkTree.update({
    where: { id },
    data: body,
  });
  return json({ success: true, data: updated });
}

// DELETE untuk hapus LinkTree by id
export async function DELETE({ params }) {
  const { id } = params;
  await prisma.linkTree.delete({
    where: { id },
  });
  return json({ success: true });
}
