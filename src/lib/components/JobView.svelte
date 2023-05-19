<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
    import { page } from '$app/stores';
    import type { Applicant, JobPost } from '@prisma/client';
    import { Loader2 } from 'lucide-svelte';

    // copy-paste from src/routes/jobs/[id] response type
    export let jobData: JobPost & {
        applicants: Applicant[];
    };

    $: isApplying = false;
    $: isApplied = jobData.applicants.some(
        (applicant) => applicant.auth_user_id === $page.data.user.userId
    );
    $: userOwnsPost = $page.data.user.userId === jobData.auth_user_id;

    $: console.log({ jobData });

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

    const handleSubmit: SubmitFunction = ({}) => {
        isApplying = true;
        return async ({ update }) => {
            await update();
            isApplying = false;
            isApplied = true;
        };
    };
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

    <form method="POST" action="/feed?/apply" use:enhance={handleSubmit}>
        <input type="hidden" name="jobId" value={jobData.id} />
        <button
            class="flex justify-center items-center rounded-md border border-purple-500 enabled:hover:bg-purple-500 enabled:hover:text-white p-2 transition-colors h-10 disabled:cursor-not-allowed"
            disabled={userOwnsPost || isApplied || isApplying}
            type="submit"
        >
            {#if isApplied}
                Applied
            {:else if isApplying}
                <Loader2 class="h-6 w-6 animate-spin text-purple-500" />
            {:else}
                Apply for Job
            {/if}
        </button>
    </form>
</div>
