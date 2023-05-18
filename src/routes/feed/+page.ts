import type { JobPost } from '@prisma/client';

export const load = async ({ url, data, fetch }) => {
    const postId = url.searchParams.get('postId');

    async function getPostById(id: string): Promise<JobPost> {
        const res = await fetch(`/jobs/${id}`);
        const data = await res.json();

        return data.post;
    }

    const post = postId ? await getPostById(postId) : undefined;

    return { ...data, post };
};
