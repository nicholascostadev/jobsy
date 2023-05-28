<script lang="ts">
    import { enhance } from '$app/forms';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import type { Certificate } from '@prisma/client';
    import { Trash } from 'lucide-svelte';

    export let certificates: Certificate[] = [];
</script>

{#if certificates.length > 0}
    <h2 class="text-2xl">Certificates</h2>
{/if}
{#each certificates as certificate}
    <div class="border border-gray-200 rounded-md p-4 bg-gray-50 relative">
        <div class="flex flex-col items-start gap-2 w-full">
            <div class="flex justify-between items-center gap-2 w-full">
                <h3 class="text-xl">{certificate.title}</h3>
                <div class="text-gray-800 text-sm flex items-center gap-2">
                    <span>
                        {new Date(certificate.issue_date).toLocaleDateString('en-US')}
                    </span>

                    {#if $userOwnsProfile}
                        <form action="?/deleteCertificate" method="POST" use:enhance>
                            <input type="hidden" name="certificateId" value={certificate.id} />
                            <button type="submit">
                                <Trash class="w-5 h-5 hover:text-red-500 transition-colors" />
                            </button>
                        </form>
                    {/if}
                </div>
            </div>
        </div>
        <p class="text-gray-800 mb-4">{certificate.description}</p>
        <a
            href={certificate.url}
            target="_blank"
            rel="noreferrer"
            class="p-2 hover:bg-purple-400/20 rounded-md transition-colors"
        >
            Check certificate
        </a>
    </div>
{/each}
