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
<!-- min height = screen height - header height - padding-top from element below it -->
<main class="bg-gray-50 main-height">
    <div class="w-layout max-w-full px-layout mx-auto pt-10 pb-10">
        <div
            class={cn(
                'scroll-auto border-x grid bg-white h-full',
                selectedJobData && 'grid-cols-1 md:grid-cols-3'
            )}
        >
            <div>
                <JobList on:job-selected={handleJobSelect} {selectedJobData} />
            </div>
            {#if selectedJobData}
                <div class="hidden md:block col-span-2">
                    <JobView jobData={selectedJobData} />
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    .main-height {
        min-height: calc(100vh - var(--header-height) - 80px);
    }
</style>
