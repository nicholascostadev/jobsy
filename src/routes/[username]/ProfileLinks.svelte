<script context="module">
    export const possibleLinks = ['github', 'twitter', 'instagram', 'website'];
</script>

<script lang="ts">
    import { page } from '$app/stores';
    import Modal from '$lib/components/Modal.svelte';
    import { Pencil, Plus } from 'lucide-svelte';
    import LinkModal from './LinkModal.svelte';

    let modalOpen = false;

    $: profileLinks = $page.data.foundUser.profile_links as {
        name: string;
        url: string;
        id: string;
    }[];

    $: remainingLinks = possibleLinks.filter(
        (link) => profileLinks.findIndex((val) => val.name === link) === -1
    );

    $: hasRemainingLinks = remainingLinks.length > 0;

    function openModal() {
        modalOpen = true;
    }

    function closeModal() {
        modalOpen = false;
    }
</script>

<div class="mt-2 flex items-center justify-start gap-2">
    {#each profileLinks as link}
        <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            class="p-2 rounded-md hover:bg-purple-400/20 capitalize transition-colors"
        >
            {link.name}
        </a>
    {/each}
    <button
        class="flex justify-center items-center w-8 h-8 rounded-full border border-purple-400 hover:bg-purple-400/40 transition-colors"
        type="button"
        on:click={openModal}
    >
        {#if profileLinks.length > 0}
            <Pencil class="w-4 h-4" />
        {:else}
            <Plus class="w-4 h-4" />
        {/if}
    </button>
</div>

{#if modalOpen}
    <Modal on:close={closeModal}>
        <LinkModal {remainingLinks} {hasRemainingLinks} links={profileLinks} />
    </Modal>
{/if}
