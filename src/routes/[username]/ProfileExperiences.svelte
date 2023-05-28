<script lang="ts">
    import { enhance } from '$app/forms';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import type { Experience } from '@prisma/client';
    import { Trash } from 'lucide-svelte';

    export let jobExperiences: Experience[] = [];
</script>

{#if jobExperiences.length > 0}
    <h2 class="text-2xl">Experiences</h2>
{/if}
{#each jobExperiences as experience}
    <div class="border border-gray-200 rounded-md p-4 bg-gray-50">
        <div class="flex flex-col items-start gap-2 w-full">
            <div class="flex items-center gap-2 w-full">
                <p class="bg-cyan-500 w-10 h-10 rounded-full" />
                <p>{experience.job_company}</p>
            </div>
            <div class="flex justify-between items-center gap-2 w-full">
                <h3 class="text-xl">{experience.job_title}</h3>
                <div class="flex items-center gap-2">
                    <div class="text-gray-800 text-sm">
                        <span>
                            {new Date(experience.job_start_date).toLocaleDateString('en-US')}
                        </span>
                        -
                        <span>
                            {#if !experience.job_ongoing && experience.job_end_date}
                                {new Date(experience.job_end_date).toLocaleDateString('en-US')}
                            {:else}
                                Today
                            {/if}
                        </span>
                    </div>

                    {#if $userOwnsProfile}
                        <form
                            action="?/deleteExperience"
                            method="POST"
                            use:enhance
                            class="flex items-center justify-center"
                        >
                            <input type="hidden" name="experienceId" value={experience.id} />
                            <button type="submit">
                                <Trash class="w-5 h-5 hover:text-red-500 transition-colors" />
                            </button>
                        </form>
                    {/if}
                </div>
            </div>
        </div>
        <p class="text-gray-800">{experience.job_description}</p>
    </div>
{/each}
