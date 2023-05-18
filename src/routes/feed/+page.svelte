<script lang="ts">
    import { page } from '$app/stores';
    import JobPost from '$lib/components/JobPost.svelte';
    import JobView from '$lib/components/JobView.svelte';
    import { cn } from '$lib/utils';

    export let data;

    let selectedJob = data.post?.id;
    let selectedJobData = data.post;

    async function getPostById(id: string) {
        const res = await fetch(`/jobs/${id}`);
        const data = await res.json();

        selectedJobData = data.post;
        selectedJob = id;
    }

    function handleJobSelect({ detail }: CustomEvent<string>) {
        selectedJob = detail;
        const postIdQuery = $page.url.searchParams.get('postId');

        if (postIdQuery !== detail) {
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
        {#if data}
            {#each data.jobPosts as job}
                <JobPost on:job-selected={handleJobSelect} {job} hasJobSelected={!!selectedJob} />
            {/each}
        {/if}
    </div>
    {#if selectedJobData}
        <JobView jobData={selectedJobData} />
    {/if}
</main>
