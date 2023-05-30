<script lang="ts">
    import { fade } from 'svelte/transition';
    import { clickOutside } from '$lib/actions/clickOutside';
    import { trapFocus } from '$lib/actions/trapFocus';
    import { escape } from '$lib/actions/escape';
    import { createEventDispatcher } from 'svelte';
    import { cn } from '$lib/utils';

    export let targetElm: HTMLDivElement;
    let clazz = '';

    export { clazz as class };

    let dispatch = createEventDispatcher();

    $: left = targetElm?.offsetLeft - 100;
    $: top = targetElm?.offsetTop + 40;
</script>

<div
    class={cn(
        `w-[${targetElm?.clientWidth}] max-w-full absolute z-20 bg-white shadow-md rounded-md`,
        clazz
    )}
    style:top="{top}px"
    style:left="{left}px"
    transition:fade={{ duration: 300 }}
    use:clickOutside={[() => dispatch('close'), true]}
    use:escape={() => dispatch('close')}
    use:trapFocus
>
    <slot />
</div>
