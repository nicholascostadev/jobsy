<script>
    import JobPost from './JobPost.svelte';
    export let hasJobSelected = false;
</script>

<ul class="[&>*]:border-t last:border-b">
    <li>
        <JobPost on:job-selected {hasJobSelected} />
    </li>
    <li>
        <JobPost on:job-selected {hasJobSelected} />
    </li>
    <li>
        <JobPost on:job-selected {hasJobSelected} />
    </li>
</ul>
