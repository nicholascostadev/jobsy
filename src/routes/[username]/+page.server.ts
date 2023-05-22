import { prisma } from '$lib/server/prisma.js';
import { bioSchema, nameSchema, thumbnailColorSchema } from '$lib/server/schemas.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const requestedUsername = params.username;

    const foundUser = await prisma.authUser.findUnique({
        where: {
            username: requestedUsername
        }
    });

    if (!foundUser) {
        return fail(404, { message: 'User not found' });
    }

    return {
        foundUser
    };
};

export const actions = {
    updateProfile: async ({ params, request, locals }) => {
        const { user, session } = await locals.validateUser();
        const formData = await request.formData();

        const newName = nameSchema
            .transform((val) => (val === null ? undefined : val))
            .parse(formData.get('name'));
        const newBio = bioSchema
            .transform((val) => (val === null ? undefined : val))
            .parse(formData.get('bio'));

        if (!session) {
            return fail(401, { message: 'Unauthorized' });
        }

        const urlUsername = params.username;

        if (user.username !== urlUsername) {
            return fail(403, { message: 'Forbidden' });
        }

        try {
            await prisma.authUser.update({
                where: {
                    id: user.userId
                },
                data: {
                    name: newName,
                    bio: newBio
                }
            });
        } catch (err) {
            return fail(400, { message: "Couldn't update profile." });
        }
    },
    updateThumbnailColor: async ({ params, request, locals }) => {
        const { user, session } = await locals.validateUser();

        if (!session) {
            return fail(401, { message: 'Unauthorized' });
        }

        const urlUsername = params.username;

        if (user.username !== urlUsername) {
            return fail(403, { message: 'Forbidden' });
        }

        const formData = await request.formData();

        const selectedColor = formData.get('selectedColor');

        const result = thumbnailColorSchema.safeParse(selectedColor);

        if (!result.success) {
            return fail(400, { message: 'Invalid color.' });
        }

        try {
            await prisma.authUser.update({
                where: {
                    id: user.userId
                },
                data: {
                    thumbnailColor: result.data
                }
            });
        } catch (err) {
            return fail(400, { message: "Couldn't update thumbnail color." });
        }
    }
};
