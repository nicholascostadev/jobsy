<script lang="ts">
    import { enhance } from '$app/forms';
    import { cn } from '$lib/utils';
    import { Plus, Trash } from 'lucide-svelte';
    import type { possibleLinks } from './ProfileLinks.svelte';

    export let links: { name: string; url: string; id: string }[] = [];
    export let remainingLinks: string[];
    export let hasRemainingLinks: boolean;

    let isAddingLink = false;

    $: selectedLinkName = remainingLinks.at(0);

    const linksStart: Record<(typeof possibleLinks)[number], string> = {
        github: 'github.com/',
        twitter: 'twitter.com/',
        instagram: 'instagram.com/'
    };

    const linksPadding: Record<(typeof possibleLinks)[number], string> = {
        github: 'pl-[120px]',
        twitter: 'pl-[120px]',
        instagram: 'pl-[150px]'
    };
</script>

<h3 class="text-xl">Links</h3>
<div class="mt-4 flex flex-col gap-2">
    {#each links as link}
        <div class="flex">
            <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                class="flex-1 text-purple-500 p-2 rounded-md hover:bg-purple-400/20 transition-colors capitalize"
            >
                {link.name}
            </a>
            <form action="?/deleteLink" method="POST" use:enhance>
                <input type="hidden" name="link-id" value={link.id} />
                <button
                    class="p-3 h-full hover:bg-red-400/20 hover:text-red-400 rounded-md transition-colors"
                    type="submit"
                >
                    <Trash class="w-4 h-4" />
                </button>
            </form>
        </div>
    {/each}
    {#if hasRemainingLinks}
        {#if isAddingLink && selectedLinkName}
            <form
                action="?/addLink"
                method="POST"
                class="flex flex-col items-start justify-start gap-1 rounded-md border border-gray-200 p-1"
                use:enhance
            >
                <label for="link-name">Link Name</label>
                <select
                    name="link-name"
                    id="link-name"
                    class="focus:ring-0 border-purple-500 focus:border-purple-500 w-full"
                    bind:value={selectedLinkName}
                >
                    {#each remainingLinks as link}
                        <option value={link}>{link}</option>
                    {/each}
                </select>
                <label for="link-identifier">Link Identifier</label>
                <div class="relative py-2">
                    <span
                        class="pointer-events-none absolute z-10 text-lg leading-6 border px-2 rounded-md bg-purple-400/20"
                    >
                        {linksStart[selectedLinkName]}
                    </span>
                    <input
                        type="text"
                        id="link-identifier"
                        name="link-identifier"
                        placeholder="identifier"
                        class={cn(
                            'py-0 rounded-md border-0 focus:border-0 focus:ring-0 w-full leading-6 text-lg',
                            linksPadding[selectedLinkName]
                        )}
                    />
                </div>

                <div class="w-full flex justify-end items-center gap-1">
                    <button class="p-2 hover:bg-red-400/20 rounded-md transition-colors">
                        Cancel
                    </button>
                    <button class="p-2 hover:bg-purple-400/20 rounded-md transition-colors">
                        Submit
                    </button>
                </div>
            </form>
        {/if}
        <button
            class="w-6 h-6 flex justify-center items-center text-purple-500 rounded-md boorder-purple-500 hover:bg-purple-400/20 transition-colors"
            type="button"
            on:click={() => {
                isAddingLink = true;
            }}
        >
            <Plus class="w-5 h-5" />
        </button>
    {/if}
</div>
