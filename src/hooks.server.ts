import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

const publicRoutes = ['/', '/login', '/register', '/logout'];
const loggedInProtectedRoutes = ['/login', '/register'];

export const handle: Handle = async ({ event, resolve }) => {
    event.locals = auth.handleRequest(event);
    const session = await event.locals.validate();

    if (!publicRoutes.includes(event.url.pathname) && !session) {
        throw redirect(303, '/login');
    }

    if (session) {
        if (loggedInProtectedRoutes.some((pathname) => event.url.pathname.startsWith(pathname))) {
            throw redirect(303, '/');
        }
    }

    return await resolve(event);
};
