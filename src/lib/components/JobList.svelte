<script lang="ts">
    import { page } from '$app/stores';
    import type { Applicant, JobPost as JobPostType } from '@prisma/client';
    import JobView from './JobView.svelte';
    import JobPost from './JobPost.svelte';

    export let selectedJobData:
        | (JobPostType & {
              applicants: Applicant[];
          })
        | undefined;
</script>

<ul class="[&>*]:border-t last:border-b">
    {#each $page.data.jobPosts as job}
        <li>
            <JobPost on:job-selected {job} />
            {#if selectedJobData && selectedJobData.id === job.id}
                <JobView jobData={selectedJobData} />
            {/if}
        </li>
    {/each}
</ul>
