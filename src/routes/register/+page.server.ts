import { auth } from '$lib/server/lucia.js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
    name: z.string().min(2, 'Name must have at least 2 characters.'),
    username: z.string().min(3, 'Username must have at least 3 characters.'),
    email: z.string().email('Invalid email.'),
    password: z.string().min(5, 'Password must have at least 5 characters.')
});

export const load = async ({ locals }) => {
    const form = await superValidate(schema);
    const session = await locals.validate();

    if (session) {
        throw redirect(302, '/');
    }

    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, schema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const { name, username, email, password } = form.data;

        try {
            await auth.createUser({
                primaryKey: {
                    providerId: 'username',
                    providerUserId: username,
                    password
                },
                attributes: {
                    name,
                    username,
                    email
                }
            });
        } catch (err) {
            console.log({ err });

            return fail(400, { message: "Couldn't register user." });
        }

        throw redirect(302, '/login');
    }
};
