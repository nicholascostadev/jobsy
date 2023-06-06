import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { prisma } from '$lib/server/prisma.js';
import type { PageServerLoad } from '../$types';

const schema = z.object({
    title: z.string().min(2, 'Name must have at least 2 characters.'),
    description: z.string().min(3, 'Username must have at least 3 characters.'),
    jobTitle: z.string().min(1, 'Job title is required.'),
    salaryStart: z.number().min(1, 'Minimum salary must be greater than 0.').nullish(),
    salaryEnd: z.number().min(1, 'Maximum salary must be greater than 0.').nullish()
});

export const load: PageServerLoad = async () => {
    const form = await superValidate(schema);

    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, schema);
        const { user, session } = await locals.validateUser();

        if (!session) {
            return fail(401, { message: 'You must be logged in to create a job post.', form });
        }

        if (!form.valid) {
            return fail(400, { form });
        }

        const { title, jobTitle, description, salaryEnd, salaryStart } = form.data;

        try {
            await prisma.jobPost.create({
                data: {
                    title,
                    description,
                    job_title: jobTitle,
                    salary_start: salaryStart ?? undefined,
                    salary_end: salaryEnd ?? undefined,
                    author: {
                        connect: {
                            id: user?.userId
                        }
                    }
                }
            });
        } catch (err) {
            return fail(400, { message: "Couldn't create a job post.", form });
        }

        throw redirect(302, '/');
    }
};
