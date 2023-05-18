<script lang="ts">
    import { page } from '$app/stores';
    import type { Applicant, JobPost } from '@prisma/client';

    // copy-paste from src/routes/jobs/[id] response type
    export let jobData: JobPost & {
        applicants: Applicant[];
    };

    $: userOwnsPost = $page.data.user.userId === jobData.auth_user_id;
    $: formattedPostedAt = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: 'numeric'
    }).format(new Date(jobData.created_at));

    let applicantsText: string;

    $: {
        const applicants = jobData.applicants.length;

        if (applicants === 0) {
            applicantsText = 'No applicants.';
        } else if (applicants === 1) {
            applicantsText = '1 applicant total.';
        } else {
            applicantsText = `${applicants} applicants total.`;
        }
    }
</script>

<div
    class="px-2 py-6 space-y-2 w-full col-span-2 border-l border-t scroll-auto"
    aria-labelledby="title"
>
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-4xl font-semibold" id="title">{jobData.title}</h2>
            <small class="text-sm">{applicantsText}</small>
        </div>

        <small class="text-sm text-gray-600">{formattedPostedAt}</small>
    </div>

    <div class="prose prose-purple">{@html jobData.description}</div>

    <button
        class="border border-purple-500 enabled:hover:bg-purple-500 enabled:hover:text-white disabled:cursor-not-allowed px-2 py-1 rounded-md transition-colors"
        disabled={userOwnsPost}
    >
        Apply For Job
    </button>
</div>
