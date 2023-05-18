<script lang="ts">
    import { page } from '$app/stores';
    import JobList from '$lib/components/JobList.svelte';
    import JobView from '$lib/components/JobView.svelte';
    import { cn } from '$lib/utils';
    import { tick } from 'svelte';

    export let data;

    $: selectedJob = data.post?.id;
    $: selectedJobData = data.post;

    async function getPostById(id: string) {
        const res = await fetch(`/jobs/${id}`);
        const data = await res.json();

        selectedJobData = data.post;
        selectedJob = id;
    }

    async function handleJobSelect({ detail }: CustomEvent<string | undefined>) {
        selectedJob = detail;

        const postIdQuery = $page.url.searchParams.get('postId');

        if (detail && postIdQuery !== detail) {
            getPostById(detail);
        }
    }
</script>

<svelte:head>
    <title>Feed</title>
    <meta name="description" content="Find your best job here" />
</svelte:head>
<main class={cn('w-layout mx-auto max-w-full px-layout grid', selectedJobData && 'grid-cols-3')}>
    <div class="min-h-with-header border-x">
        <JobList on:job-selected={handleJobSelect} />
    </div>
    {#if selectedJobData}
        <JobView jobData={selectedJobData} />
    {/if}
</main>
