<script lang="ts">
    import { trapFocus } from '$lib/actions/trapFocus';
    import { X } from 'lucide-svelte';
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    function closeDrawer() {
        dispatch('close');
    }

    let element: HTMLDivElement;

    onMount(() => {
        element.focus();
    });

    onMount(() => {
        document.body.style.overflow = 'hidden';
    });

    onDestroy(() => {
        document.body.style.overflow = 'auto';
    });
</script>

<div class="bg-black/40 w-screen h-screen inset-0 fixed" transition:fade={{ duration: 300 }} />
<div
    bind:this={element}
    class="bg-white min-h-[384px] w-[450px] max-w-full fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md shadow-md"
    in:scale={{ start: 0.9, duration: 300 }}
    out:scale={{ start: 0.9, duration: 300 }}
    use:trapFocus
>
    <div class="absolute top-8 w-full flex justify-between items-center">
        <button
            class="absolute right-8"
            aria-label="Close Modal"
            on:click={closeDrawer}
            type="button"
        >
            <X class="h-6 w-6" />
        </button>
    </div>
    <div class="mt-4 px-8 pt-12">
        <slot />
    </div>
</div>
