import { auth } from '$lib/server/lucia.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const schema = z.object({
    username: z.string().min(1, 'Username must have at least 1 character.'),
    password: z.string().min(1, 'Password must have at least 1 character.')
});

export const load: PageServerLoad = async ({ locals }) => {
    const form = await superValidate(schema);
    const session = await locals.validate();

    if (session) {
        throw redirect(302, '/');
    }

    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, schema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const { username, password } = form.data;

        try {
            const key = await auth.useKey('username', username, password);
            const session = await auth.createSession(key.userId);
            locals.setSession(session);
        } catch (err) {
            console.log({ err });

            if (err instanceof LuciaError) {
                if (
                    err.message === 'AUTH_INVALID_KEY_ID' ||
                    err.message === 'AUTH_INVALID_PASSWORD'
                ) {
                    setError(form, 'password', 'Username or password is incorrect.');
                    return setError(form, 'username', 'Username or password is incorrect.');
                }
            }

            return fail(400, { message: 'Something went wrong when trying to log in' });
        }

        throw redirect(302, '/');
    }
};
