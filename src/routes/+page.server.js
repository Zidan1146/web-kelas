import { PrismaClient } from '@prisma/client';
import { fail } from '@sveltejs/kit';
const prisma = new PrismaClient();

export async function load() {
    return {};
};

export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData();
        const data = {
            username: String(formData.get('username')),
            email: String(formData.get('email')),
            password: String(formData.get('password')),
            roles: String(formData.get('role-selection'))
        };

        if(!(data.username || data.email || data.password || data.roles))
            return fail(400, {
                message: 'Empty Field'
            });

        try {
            await prisma.user.create({
                data
            });
        } catch (error) {
            return fail(500, {
                message: 'Internal Error'
            });
        }
    }
};