<script lang="ts">
    export let title: string;
    export let jobTitle: string;
    export let jobDescription: string;
    export let jobId: string;
    export let createdAt: Date;
</script>

<div class="border shadow-sm p-2 rounded-md bg-white max-w-full w-96 h-60">
    <div>
        <a href="/applications/{jobId}">
            <h4 class="text-2xl">{title}</h4>
        </a>
        <p class="text-lg">{jobTitle}</p>
        <p class="text-sm text-gray-500">
            {createdAt.toLocaleDateString('en-US', { dateStyle: 'long' })}
        </p>
    </div>
    <p class="leading-tight line-clamp-3 pt-2">{@html jobDescription}</p>
</div>
