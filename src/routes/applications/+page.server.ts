import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.validateUser();

    if (!user) {
        return redirect(307, '/login');
    }

    let userApplications = await prisma.applicant.findMany({
        where: {
            user: {
                id: user.userId
            }
        },
        include: {
            job_post: true
        }
    });

    userApplications = userApplications.map((application) => ({
        ...application,
        job_post: {
            ...application.job_post,
            description: sanitizeHtml(marked.parse(application.job_post.description))
        }
    }));

    return {
        applications: userApplications
    };
};
