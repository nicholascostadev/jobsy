<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms';
    import { Edit, X } from 'lucide-svelte';
    import { tick } from 'svelte';

    export let data;

    let bio = data.foundUser?.bio;
    let name = data.foundUser?.name;
    let editButton: HTMLButtonElement;
    let nameInput: HTMLInputElement;
    $: userOwnsProfile = data.foundUser?.username === data.user?.username;

    let amount = new Array(3).fill(0);
    let isEditing = false;

    async function toggleEditing() {
        if (isEditing) {
            bio = data.foundUser?.bio;
            name = data.foundUser?.name;
        }

        isEditing = !isEditing;

        if (isEditing) {
            await tick();
            nameInput?.focus();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            isEditing = false;
            editButton.focus();
        }
    }

    const handleSubmit: SubmitFunction = async () => {
        return async ({ update }) => {
            await update();
            isEditing = false;
            name = data.foundUser?.name;
            bio = data.foundUser?.bio;
            editButton.focus();
        };
    };
</script>

<main>
    <div class="bg-purple-300 w-full h-96" />
    <div class="w-layout mx-auto px-layout max-w-full pb-10">
        <div class="flex flex-col md:flex-row items-start justify-start gap-4 -mt-12">
            <div
                class="rounded-full w-40 h-40 md:w-52 md:h-52 bg-gray-500 border-purple-300 border-2"
            />
            <form
                class="flex-1 md:pt-14"
                method="POST"
                action="?/updateProfile"
                use:enhance={handleSubmit}
                on:keydown={handleKeydown}
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
                            <h1 class="text-xl font-poppins">{data.foundUser?.name}</h1>
                        {/if}
                        <p class="text-gray-700 font-poppins">@{data.foundUser?.username}</p>
                    </div>
                    {#if userOwnsProfile}
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
                    {#if userOwnsProfile}
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

                <div class="mt-2 flex items-center justify-start gap-2">
                    {#each amount as item}
                        <div class="w-8 h-8 rounded-md bg-purple-400" />
                    {/each}
                </div>
            </form>
        </div>

        <div class="mt-12 flex flex-col gap-4">
            <div class="w-full h-56 bg-gray-400 rounded-md" />
            <div class="w-full h-56 bg-gray-400 rounded-md" />
            <div class="w-full h-56 bg-gray-400 rounded-md" />
        </div>
    </div>
</main>
