<!-- 
    TODO: Make the profile background dynamic, user should be able to choose the profile
    background color.
-->

<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
    import { clickOutside } from '$lib/actions/clickOutside';
    import { escape } from '$lib/actions/escape';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import { cn } from '$lib/utils';
    import { Edit, X } from 'lucide-svelte';
    import { pageUser } from './stores';

    let isEditing = false;

    let colors = {
        purple: 'bg-purple-300',
        red: 'bg-red-300',
        blue: 'bg-blue-300',
        green: 'bg-green-300',
        yellow: 'bg-yellow-300',
        gray: 'bg-gray-300'
    };

    type ColorKey = keyof typeof colors;

    $: hasSelectedAnotherColor = selectedColor !== $pageUser?.thumbnailColor;
    $: selectedColor = $pageUser?.thumbnailColor as ColorKey;

    function cancelEditing() {
        isEditing = false;
        selectedColor = $pageUser?.thumbnailColor as ColorKey;
    }

    function toggleEditing() {
        if (isEditing) {
            selectedColor = $pageUser?.thumbnailColor as ColorKey;
        }

        isEditing = !isEditing;
    }

    function selectColor(color: string) {
        selectedColor = color as ColorKey;
    }

    const handleSubmitNewColor: SubmitFunction = async () => {
        return async ({ update }) => {
            await update();
            isEditing = false;
        };
    };
</script>

{#if $userOwnsProfile}
    <form
        method="POST"
        action="?/updateThumbnailColor"
        class={cn('w-full h-96 group relative', colors[selectedColor])}
        use:enhance={handleSubmitNewColor}
        use:clickOutside={[cancelEditing]}
        use:escape={cancelEditing}
    >
        <button
            class={cn(
                'absolute w-6 h-6 inset-0 m-auto block md:hidden group-hover:block hover:text-purple-500 transition-colors',
                isEditing && 'md:block'
            )}
            type="button"
            on:click={toggleEditing}
        >
            {#if isEditing}
                <X class="w-6 h-6" />
            {:else}
                <Edit class="w-6 h-6" />
            {/if}
        </button>

        {#if isEditing}
            <div
                class="absolute bottom-4 left-0 right-0 mx-auto w-layout max-w-full px-2 md:px-64 flex justify-start items-center gap-12"
            >
                <div class="flex justify-start items-center gap-4">
                    {#each Object.entries(colors) as [key, value]}
                        <button
                            aria-label="select color purple for background"
                            class={cn(
                                'w-24 h-24 border-2 border-gray-800 rounded-md transition-colors z-20',
                                value
                            )}
                            type="button"
                            on:click={() => selectColor(key)}
                        />
                    {/each}
                </div>
                {#if hasSelectedAnotherColor}
                    <input type="hidden" name="selectedColor" value={selectedColor} />
                    <button
                        class="bg-purple-400 hover:bg-purple-500 p-2 rounded-md text-white text-lg transition-colors"
                        type="submit"
                    >
                        Confirm
                    </button>
                {/if}
            </div>
        {/if}
    </form>
{:else}
    <div class={cn('w-full h-96 group relative', colors[selectedColor])} />
{/if}
