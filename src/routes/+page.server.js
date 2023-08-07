import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const load = async ({ locals }) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        sessionId: locals.sessionId
      }
    });
    return {
      user
    }
  } catch (error) {
    throw redirect(307, '/login');
  }
}