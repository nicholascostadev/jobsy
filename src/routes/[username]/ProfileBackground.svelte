<!-- 
    TODO: Make the profile background dynamic, user should be able to choose the profile
    background color.
-->

<script lang="ts">
    import { cn } from '$lib/utils';

    let clazz: string = '';

    export { clazz as class };
</script>

<div class={cn('w-full h-96', clazz)} />
