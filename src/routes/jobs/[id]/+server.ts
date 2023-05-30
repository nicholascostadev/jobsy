import { prisma } from '$lib/server/prisma.js';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
    const session = await locals.validate();

    if (!session) {
        return new Response(
            JSON.stringify({ message: 'You must be logged in to search blog posts.' }),
            { status: 401 }
        );
    }

    const id = params.id;

    const post = await prisma.jobPost.findUnique({
        where: {
            id
        },
        include: {
            applicants: true
        }
    });

    if (!post) {
        return new Response(JSON.stringify({ message: 'Post not found.' }), { status: 404 });
    }

    post.description = sanitizeHtml(marked.parse(post.description));

    return new Response(JSON.stringify({ post }), { status: 200 });
};
