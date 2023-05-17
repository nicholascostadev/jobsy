import { auth } from '$lib/server/lucia.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const session = await locals.validate();

    if (session) {
        throw redirect(302, '/');
    }

    return {};
};

export const actions = {
    default: async ({ request }) => {
        // TODO: validate with superform
        const { name, username, email, password } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>;

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
