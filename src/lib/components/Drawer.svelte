<script lang="ts">
    import { X } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    function closeDrawer() {
        dispatch('close');
    }
</script>

<div
    class="bg-white h-screen w-screen fixed inset-0 z-50"
    in:fly={{ x: '100%', y: 0 }}
    out:fly={{ x: '100%', y: 0 }}
>
    <div
        class="absolute top-0 h-header w-full flex justify-between items-center px-layout shadow-sm"
    >
        <a href="/" class="text-2xl font-semibold font-poppins" on:click={closeDrawer}>Jobsy</a>

        <button class="absolute right-2" aria-label="Close Modal" on:click={closeDrawer}>
            <X class="h-6 w-6" />
        </button>
    </div>
    <div class="pt-header px-layout mt-4">
        <slot />
    </div>
</div>
