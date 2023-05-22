<script lang="ts">
    export let title: string | undefined = undefined;
    export let subTitle: string | undefined = undefined;
</script>

<div class="w-full h-56 bg-gray-100 rounded-md p-2">
    {#if title}
        <h3 class="text-2xl">{title}</h3>
    {/if}
    {#if subTitle}
        <p class="text-gray-700 pb-1">{subTitle}</p>
    {/if}

    <slot />
</div>
