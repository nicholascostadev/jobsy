<script>
    import ApplicationCard from './ApplicationCard.svelte';

    export let data;
</script>

<svelte:head>
    <title>Applied Jobs</title>
    <meta name="description" content="Explore your applied jobs." />
</svelte:head>

<main class="bg-gray-50">
    <div class=" w-layout max-w-full px-layout mx-auto pt-10 pb-10 min-h-with-header">
        <h1 class="text-3xl tracking-wide leading-relaxed">Your applied jobs.</h1>
        <p class="text-lg text-gray-800 w-full max-w-3xl">
            You've already applied for 3 total jobs.
        </p>

        {#if data.applications}
            <div class="pt-4 pb-2 flex flex-wrap gap-2">
                {#each data.applications as { job_post }}
                    <ApplicationCard
                        title={job_post.title}
                        jobTitle={job_post.job_title}
                        jobDescription={job_post.description}
                        jobId={job_post.id}
                        createdAt={job_post.created_at}
                    />
                {/each}
            </div>
        {/if}
    </div>
</main>
