<!-- 
    TODO: Make the profile background dynamic, user should be able to choose the profile
    background color.
-->

<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
    import { page } from '$app/stores';
    import { clickOutside } from '$lib/actions/clickOutside';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import { cn } from '$lib/utils';
    import { Edit, X } from 'lucide-svelte';
    import { getContext } from 'svelte';

    let isEditing = false;

    let colors = {
        purple: 'bg-purple-300',
        red: 'bg-red-300',
        blue: 'bg-blue-300',
        green: 'bg-green-300',
        yellow: 'bg-yellow-300',
        gray: 'bg-gray-300'
    };

    $: hasSelectedAnotherColor = selectedColor !== $page.data.foundUser?.thumbnailColor;
    $: selectedColor = $page.data.foundUser?.thumbnailColor as keyof typeof colors;

    function cancelEditing() {
        isEditing = false;
        selectedColor = $page.data.foundUser?.thumbnailColor;
    }

    function toggleEditing() {
        if (isEditing) {
            selectedColor = $page.data.foundUser?.thumbnailColor;
        }

        isEditing = !isEditing;
    }

    function selectColor(color: string) {
        selectedColor = color as keyof typeof colors;
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
