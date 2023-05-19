import { prisma } from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const requestedUsername = params.username;

    const foundUser = await prisma.authUser.findUnique({
        where: {
            username: requestedUsername
        }
    });

    if (!foundUser) {
        return fail(404, { message: 'User not found' });
    }

    return {
        foundUser
    };
};
