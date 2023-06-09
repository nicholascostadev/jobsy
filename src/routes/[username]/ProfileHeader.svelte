<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
    import { clickOutside } from '$lib/actions/clickOutside';
    import { cn } from '$lib/utils';
    import { Edit, X } from 'lucide-svelte';
    import { tick } from 'svelte';
    import ProfileLinks from './ProfileLinks.svelte';
    import { escape } from '$lib/actions/escape';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import { pageUser } from '../../stores/pageUser';

    let editButton: HTMLButtonElement;
    let nameInput: HTMLInputElement;

    $: bio = $pageUser?.bio;
    $: name = $pageUser?.name;

    let colors = {
        purple: 'border-purple-300',
        red: 'border-red-300',
        blue: 'border-blue-300',
        green: 'border-green-300',
        yellow: 'border-yellow-300',
        gray: 'border-gray-300'
    };

    $: thumbnailColor = $pageUser?.thumbnailColor as keyof typeof colors;

    let isEditing = false;

    function stopEditing() {
        bio = $pageUser?.bio;
        name = $pageUser?.name;
        isEditing = false;
        editButton.focus();
    }

    async function toggleEditing() {
        if (isEditing) {
            bio = $pageUser?.bio;
            name = $pageUser?.name;
        }

        isEditing = !isEditing;

        if (isEditing) {
            await tick();
            nameInput?.focus();
        }
    }

    const handleSubmit: SubmitFunction = async () => {
        return async ({ update }) => {
            await update();
            isEditing = false;
            name = $pageUser?.name;
            bio = $pageUser?.bio;
            editButton.focus();
        };
    };
</script>

<div class="flex flex-col md:flex-row items-start justify-start gap-4">
    <div
        class={cn(
            'rounded-full w-40 h-40 md:w-52 md:h-52 bg-gray-500 border-2',
            colors[thumbnailColor]
        )}
    />
    <form
        class="flex-1 md:pt-14 max-w-full"
        method="POST"
        action="?/updateProfile"
        use:enhance={handleSubmit}
        use:clickOutside={[stopEditing, isEditing]}
        use:escape={stopEditing}
    >
        <div class="flex items-start justify-between">
            <div>
                {#if isEditing}
                    <input
                        type="text"
                        name="name"
                        class="text-xl font-poppins w-full p-0"
                        bind:value={name}
                        bind:this={nameInput}
                    />
                {:else}
                    <h1 class="text-xl font-poppins">{$pageUser?.name}</h1>
                {/if}
                <p class="text-gray-700 font-poppins">@{$pageUser?.username}</p>
            </div>
            {#if $userOwnsProfile}
                <button
                    on:click={toggleEditing}
                    class="hover:text-purple-500 rounded-full transition-colors"
                    type="button"
                    bind:this={editButton}
                >
                    {#if isEditing}
                        <X class="w-5 h-5" />
                    {:else}
                        <Edit class="w-5 h-5" />
                    {/if}
                </button>
            {/if}
        </div>
        {#if isEditing}
            <textarea
                bind:value={bio}
                name="bio"
                rows="2"
                class="font-poppins w-full p-0 resize-none"
            />
        {:else if !bio}
            {#if $userOwnsProfile}
                <button
                    on:click={toggleEditing}
                    type="button"
                    class="hover:text-purple-500 transition-colors"
                >
                    Setup Bio
                </button>
            {/if}
        {:else}
            <p class="font-poppins">
                {bio}
            </p>
        {/if}

        {#if isEditing}
            <div class="flex items-center justify-end">
                <button class="hover:text-purple-500" type="submit">Submit</button>
            </div>
        {/if}

        <ProfileLinks />
    </form>
</div>
