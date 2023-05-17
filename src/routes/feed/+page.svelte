<script lang="ts">
    import { page } from '$app/stores';
    import JobList from '$lib/components/JobList.svelte';
    import JobView from '$lib/components/JobView.svelte';
    import { cn } from '$lib/utils';

    let selectedJob: number | undefined;

    $: {
        const url = new URL($page.url);

        const postId = url.searchParams.get('postId');

        if (postId) {
            selectedJob = Number(postId);
        }
    }

    function handleJobSelect({ detail }: CustomEvent<number>) {
        selectedJob = detail;
    }
</script>

<main class={cn('w-layout max-w-full px-layout grid', selectedJob && 'grid-cols-3')}>
    <div class="min-h-with-header border-x">
        <JobList on:job-selected={handleJobSelect} hasJobSelected={!!selectedJob} />
    </div>
    {#if selectedJob}
        <JobView />
    {/if}
</main>
