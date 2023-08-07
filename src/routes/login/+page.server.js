import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2'
import { fail } from '@sveltejs/kit';
const prisma = new PrismaClient();

export async function load() {
    return {};
};

export const actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const sessionId = crypto.randomUUID();
        const data = {
            username: String(formData.get('username')),
            password: String(formData.get('password')),
            sessionId: sessionId
        };

        if(!data.username || !data.password) return fail(400, {
            loginError: true,
            message: 'Invalid Username Or Password'
        });

        try {
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        {username: data.username},
                        {password: data.password}
                    ]
                }
            });

            if(!user) return fail(404, {
                loginError: true,
                message: 'User not found, please register first.'
            });

            const passwordMatch = await argon2.verify(user.password, data.password);
            if(!passwordMatch) return fail(401, {
                loginError: true,
                message: 'Invalid Username or Password'
            });

            const currentSessionId = cookies.get('session-id');
            const currentSession = await prisma.user.findFirst({
                where: {
                    sessionId: currentSessionId
                }
            });

            if(!currentSession || user.id !== currentSession.id || !currentSessionId) {
                cookies.set('session-id', sessionId, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        sessionId
                    }
                });
            }
            return {
                success: true,
                status: 200
            }
        } catch (error) {
            return fail(500, {
                loginError: true,
                message: 'Internal Server Error'
            });
        }
    }
}