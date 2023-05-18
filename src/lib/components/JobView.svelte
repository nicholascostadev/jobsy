<script lang="ts">
    import { page } from '$app/stores';
    import type { JobPost } from '@prisma/client';

    export let jobData: JobPost;

    $: userOwnsPost = $page.data.user.userId === jobData.auth_user_id;
</script>

<div class="p-2 space-y-2 w-full col-span-2 border-l border-t" tabIndex={0} aria-labelledby="title">
    <h4 class="text-2xl font-semibold" id="title">{jobData.title}</h4>

    <div class="prose prose-purple">{@html jobData.description}</div>

    <button
        class="border border-purple-500 enabled:hover:bg-purple-500 enabled:hover:text-white disabled:cursor-not-allowed px-2 py-1 rounded-md transition-colors"
        disabled={userOwnsPost}
    >
        Apply For Job
    </button>
</div>
