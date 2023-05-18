<script lang="ts">
    import { page } from '$app/stores';
    import { cn } from '$lib/utils';
    import JobList from '$lib/components/JobList.svelte';
    import JobView from '$lib/components/JobView.svelte';

    export let data;

    $: selectedJobData = data.post;

    async function getPostById(id: string) {
        const res = await fetch(`/jobs/${id}`);
        const data = await res.json();

        selectedJobData = data.post;
    }

    async function handleJobSelect({ detail }: CustomEvent<string | undefined>) {
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
<main class={cn('w-layout mx-auto max-w-full px-layout')}>
    <div class={cn('h-with-header scroll-auto border-x grid', selectedJobData && 'grid-cols-3')}>
        <div>
            <JobList on:job-selected={handleJobSelect} />
        </div>
        {#if selectedJobData}
            <JobView jobData={selectedJobData} />
        {/if}
    </div>
</main>
