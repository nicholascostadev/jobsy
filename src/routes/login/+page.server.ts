import { auth } from '$lib/server/lucia.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
    username: z.string().min(1, 'Username must have at least 1 character.'),
    password: z.string().min(1, 'Password must have at least 1 character.')
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
            return fail(400, { message: "Couldn't login user." });
        }

        throw redirect(302, '/');
    }
};
