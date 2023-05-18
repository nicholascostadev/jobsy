<script lang="ts">
    import { page } from '$app/stores';
    import JobPost from './JobPost.svelte';
</script>

<ul class="[&>*]:border-t last:border-b">
    {#each $page.data.jobPosts as job}
        <li>
            <JobPost on:job-selected {job} />
        </li>
    {/each}
</ul>
