import argon2 from 'argon2';
import { fail, redirect } from '@sveltejs/kit';
import { STUDENT_CODE } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function load() {
    const users = await prisma.user.findMany();
    return {
        users
    };
};

export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData();

        const data = {
            username: String(formData.get('username')),
            password: String(formData.get('password')),
            email: String(formData.get('email')),
            roles: String(formData.get('role-selection'))
        };
        const studentCode = String(formData.get('student-code'));

        if(!data.username) return fail(400, {
            registerError: true,
            message: 'Username cannot be empty'
        });

        if(!data.password) return fail(400, {
            registerError: true,
            message: 'Password cannot be empty'
        });

        if(!data.email) return fail(400, {
            registerError: true,
            message: 'Email cannot be empty'
        });

        if(!data.roles) return fail(400, {
            registerError: true,
            message: 'Roles cannot be empty'
        });

        if(data.roles === 'student' && studentCode !== STUDENT_CODE) return fail(400, {
            registerError: true,
            message: 'Register Failed'
        });

        try {
            const isUsernameExist = await prisma.user.findFirst({
                where: {
                    username: data.username
                }
            });

            if(isUsernameExist) return fail(409, {
                registerError: true,
                message: 'Username is unavailable because it already exists'
            });

            const salt = Buffer.from(crypto.randomUUID());
            await argon2.hash(data.password, { salt })
            .then(hashedPassword => data.password = hashedPassword)
            .catch(() => fail(500, {
                registerError: true,
                message: 'Internal server error'
            }));

            await prisma.user.create({
                data
            });
        } catch (error) {
            return fail(500, {
                registerError: true,
                message: 'Internal server error'
            });
        }
        throw redirect(303, '/login');
    }
}