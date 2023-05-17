<script lang="ts">
    import { cn } from '$lib/utils';
    import { createEventDispatcher } from 'svelte';

    export let hasJobSelected = false;

    const dispatch = createEventDispatcher<{ 'job-selected': number }>();

    function handleJobSelect() {
        dispatch('job-selected', 12);
    }
</script>

<div class="p-2 space-y-2">
    <div class="flex items-center gap-2">
        <a href="/company">
            <img src="/job-logo-placeholder.webp" alt="Job logo" class="rounded-full w-12 h-12" />
        </a>
        <a href="?postId=2" on:click={handleJobSelect}>
            <h4 class="text-lg font-semibold">Job Title</h4>
        </a>
    </div>
    <p class={cn('leading-tight', hasJobSelected && 'line-clamp-3')}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio facilis hic, maxime
        natus placeat aut debitis, nemo sunt earum modi nobis quis rerum, quibusdam odio cumque iure
        quod exercitationem ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        quasi accusantium dolorem laudantium! Molestias nemo quam inventore deleniti hic velit,
        asperiores maiores rem, enim animi voluptatibus ut iste ullam qui...
    </p>
</div>
