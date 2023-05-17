import { auth } from '$lib/server/lucia.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const session = await locals.validate();

    if (session) {
        throw redirect(302, '/');
    }
};

export const actions = {
    default: async ({ request, locals }) => {
        const { username, password } = Object.fromEntries(await request.formData()) as Record<
            string,
            string
        >;

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
