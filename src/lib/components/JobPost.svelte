<script lang="ts">
    import { cn } from '$lib/utils';
    import type { JobPost } from '@prisma/client';
    import { createEventDispatcher } from 'svelte';
    import { marked } from 'marked';
    import sanitizeHtml from 'sanitize-html';
    export let hasJobSelected = false;
    export let job: JobPost;

    $: description = sanitizeHtml(marked.parse(job.description));

    const dispatch = createEventDispatcher<{ 'job-selected': string }>();

    function handleJobSelect() {
        dispatch('job-selected', job.id);
    }
</script>

<div class="p-2 space-y-2">
    <div class="flex items-center gap-2">
        <a href="/company">
            <img src="/job-logo-placeholder.webp" alt="Job logo" class="rounded-full w-12 h-12" />
        </a>
        <a href={`?postId=${job.id}`} on:click={handleJobSelect}>
            <h4 class="text-lg font-semibold">{job.title}</h4>
        </a>
    </div>
    <div class={cn('leading-tight', hasJobSelected && 'line-clamp-3')}>
        {@html description}
    </div>
</div>
