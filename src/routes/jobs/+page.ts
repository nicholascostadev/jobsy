import type { Applicant, JobPost } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, data, fetch }) => {
    const postId = url.searchParams.get('postId');

    async function getPostById(id: string) {
        const res = await fetch(`/jobs/${id}`);
        const data = await res.json();

        return data.post as JobPost & {
            applicants: Applicant[];
        };
    }

    const post = postId ? await getPostById(postId) : undefined;

    return { ...data, post };
};
