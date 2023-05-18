<script lang="ts">
    import type { JobPost } from '@prisma/client';
    import { marked } from 'marked';
    import sanitizeHtml from 'sanitize-html';

    export let jobData: JobPost;

    $: description = sanitizeHtml(marked.parse(jobData.description));
</script>

<div class="p-2 space-y-2 w-full col-span-2">
    <h4 class="text-2xl font-semibold">{jobData.title}</h4>

    <div class="prose prose-purple">{@html description}</div>

    <button
        class="border border-purple-500 hover:bg-purple-500 hover:text-white px-2 py-1 rounded-md transition-colors"
    >
        Apply For Job
    </button>
</div>
