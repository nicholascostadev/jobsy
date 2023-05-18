import { prisma } from '$lib/server/prisma.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const session = await locals.validate();
    if (!session) {
        throw redirect(302, '/login');
    }

    const jobPosts = await prisma.jobPost.findMany({});

    return {
        jobPosts
    };
};
