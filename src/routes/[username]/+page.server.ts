import { prisma } from '$lib/server/prisma.js';
import {
    bioSchema,
    nameSchema,
    linkNameSchema,
    thumbnailColorSchema
} from '$lib/server/schemas.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { addSectionSchema } from './validations.js';

export const load = async ({ params }) => {
    const requestedUsername = params.username;
    const addSectionForm = await superValidate(addSectionSchema, {
        id: 'addSection'
    });

    const foundUser = await prisma.authUser.findUnique({
        where: {
            username: requestedUsername
        },
        include: {
            profile_links: true,
            profile_sections: {
                include: {
                    experiences: true
                }
            }
        }
    });

    if (!foundUser) {
        return fail(404, { message: 'User not found' });
    }

    return {
        foundUser,
        addSectionForm
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
    },
    addLink: async ({ params, request, locals }) => {
        const { user, session } = await locals.validateUser();

        if (!session) {
            return fail(401, { message: 'Unauthorized' });
        }

        const urlUsername = params.username;

        if (user.username !== urlUsername) {
            return fail(403, { message: 'Forbidden' });
        }

        const formData = await request.formData();

        const linkName = formData.get('link-name');
        const linkIdentifier = formData.get('link-identifier');

        const linkResult = linkNameSchema.safeParse(linkName);

        if (!linkResult.success) {
            return fail(400, { message: 'Invalid link name.' });
        }

        const identifierResult = z.string().min(1).safeParse(linkIdentifier);

        if (!identifierResult.success) {
            return fail(400, { message: 'Invalid link identifier.' });
        }

        const linkNameValue = linkResult.data;
        const linkIdentifierValue = identifierResult.data;

        try {
            if (linkNameValue === 'website') {
                const safeLinkResult = z
                    .string()
                    .startsWith('https://')
                    .url()
                    .safeParse(linkIdentifierValue);

                if (!safeLinkResult.success) {
                    return fail(400, { message: 'Invalid link identifier, should be HTTPS.' });
                }

                await prisma.profileLink.create({
                    data: {
                        name: linkNameValue,
                        url: linkIdentifierValue,
                        auth_user_id: user.userId
                    }
                });

                return;
            }

            await prisma.profileLink.create({
                data: {
                    name: linkNameValue,
                    url: `https://${linkNameValue}.com/${linkIdentifierValue}`,
                    auth_user_id: user.userId
                }
            });
        } catch (err) {
            return fail(400, { message: "Couldn't add link." });
        }
    },
    deleteLink: async ({ params, request, locals }) => {
        const { user, session } = await locals.validateUser();

        if (!session) {
            return fail(401, { message: 'Unauthorized' });
        }

        const urlUsername = params.username;

        if (user.username !== urlUsername) {
            return fail(403, { message: 'Forbidden' });
        }

        const formData = await request.formData();

        const linkId = formData.get('link-id');
        const linkIdResult = z.string().uuid().safeParse(linkId);

        if (!linkIdResult.success) {
            return fail(400, { message: 'Invalid link id.' });
        }

        const linkIdValue = linkIdResult.data;

        try {
            await prisma.profileLink.delete({
                where: {
                    id: linkIdValue
                }
            });
        } catch (err) {
            console.log({ err });
            return fail(400, { message: "Couldn't delete link." });
        }
    },
    addSection: async ({ locals, request }) => {
        const { user, session } = await locals.validateUser();
        const { data } = await superValidate(request, addSectionSchema, {
            id: 'addSection'
        });

        if (!session) {
            return fail(400, { message: "Couldn't add section." });
        }

        try {
            await prisma.authUser.update({
                where: {
                    username: user.username
                },
                data: {
                    profile_sections: {
                        upsert: {
                            create: {
                                experiences: {
                                    create: {
                                        job_title: data.jobTitle,
                                        job_company: data.jobCompany,
                                        job_description: data.jobDescription,
                                        job_start_date: data.jobStartDate,
                                        job_end_date: data.jobEndDate,
                                        job_ongoing: data.onGoing ?? false,
                                        auth_user_id: user.userId
                                    }
                                },
                                auth_user_id: user.userId
                            },
                            update: {
                                experiences: {
                                    create: {
                                        job_title: data.jobTitle,
                                        job_company: data.jobCompany,
                                        job_description: data.jobDescription,
                                        job_start_date: data.jobStartDate,
                                        job_end_date: data.jobEndDate,
                                        job_ongoing: data.onGoing ?? false,
                                        auth_user_id: user.userId
                                    }
                                },
                                auth_user_id: user.userId
                            }
                        }
                    }
                }
            });
        } catch (err) {
            console.log({ err });

            return fail(400, { message: "Couldn't add section." });
        }
    }
};
