import { prisma } from '$lib/server/prisma.js';
import { redirect } from '@sveltejs/kit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export const load = async ({ locals }) => {
    const session = await locals.validate();
    if (!session) {
        throw redirect(302, '/login');
    }

    let jobPosts = await prisma.jobPost.findMany({
        include: {
            applicants: true
        }
    });

    jobPosts = jobPosts.map((jobPost) => ({
        ...jobPost,
        description: sanitizeHtml(marked.parse(jobPost.description))
    }));

    return {
        jobPosts
    };
};
