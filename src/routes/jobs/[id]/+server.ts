import { prisma } from '$lib/server/prisma.js';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
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
