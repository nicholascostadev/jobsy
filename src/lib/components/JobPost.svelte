<script lang="ts">
    import { page } from '$app/stores';
    import { cn } from '$lib/utils';
    import type { JobPost } from '@prisma/client';
    import { createEventDispatcher } from 'svelte';
    export let job: JobPost;

    const dispatch = createEventDispatcher<{ 'job-selected': string }>();

    function handleJobSelect() {
        if (job.id == $page.url.searchParams.get('postId')) {
            dispatch('job-selected', undefined);
        }

        dispatch('job-selected', job.id);
    }

    $: formattedPostedAt = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: 'numeric'
    }).format(new Date(job.created_at));

    $: href = job.id == $page.url.searchParams.get('postId') ? '/feed' : `/feed?postId=${job.id}`;
</script>

<div class="p-2 space-y-2">
    <div class="flex items-center gap-2">
        <a href="/company">
            <img src="/job-logo-placeholder.webp" alt="Job logo" class="rounded-full w-12 h-12" />
        </a>
        <a {href} data-sveltekit-keepfocus data-sveltekit-noscroll on:click={handleJobSelect}>
            <h4 class="text-lg font-semibold">{job.title}</h4>

            <small class="text-sm">{formattedPostedAt}</small>
        </a>
    </div>
    <div class={cn('leading-tight line-clamp-3')}>
        {@html job.description}
    </div>
</div>
