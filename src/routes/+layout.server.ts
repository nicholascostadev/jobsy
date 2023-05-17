export const load = async ({ locals }) => {
    const { user, session } = await locals.validateUser();

    return { user };
};
