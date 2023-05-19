export const load = async ({ locals }) => {
    const { user } = await locals.validateUser();

    return { user };
};
