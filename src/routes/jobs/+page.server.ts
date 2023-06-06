import { prisma } from '$lib/server/prisma.js';
import { fail, type Actions } from '@sveltejs/kit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
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

const jobIdSchema = z.string().min(1).uuid();

export const actions: Actions = {
    apply: async ({ request, locals }) => {
        const { user, session } = await locals.validateUser();

        if (!session) {
            return fail(401, { message: 'You must be logged in to apply for a job.' });
        }

        const formData = await request.formData();

        const result = jobIdSchema.safeParse(formData.get('jobId'));

        if (!result.success) {
            return fail(400, { message: 'Invalid job id' });
        }

        const jobId = result.data;

        const jobPost = await prisma.jobPost.findUnique({
            where: {
                id: jobId
            }
        });

        if (!jobPost) {
            return fail(404, { message: 'Job not found' });
        }

        try {
            await prisma.applicant.create({
                data: {
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    auth_user_id: user.userId,
                    job_post_id: jobId
                }
            });

            return new Response(JSON.stringify({ message: 'Success' }), { status: 201 });
        } catch (err) {
            console.log({ error: err });

            return fail(500, { message: 'Something went wrong' });
        }
    }
};
