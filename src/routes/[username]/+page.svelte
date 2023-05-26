<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import ProfileBackground from './ProfileBackground.svelte';
    import ProfileHeader from './ProfileHeader.svelte';
    import SectionCreator from './SectionCreator.svelte';
    import type { Experience } from '@prisma/client';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import ProfileExperiences from './ProfileExperiences.svelte';

    export let data;

    $: sortedJobExperiences = [] as Experience[];

    $: {
        if (data.foundUser?.profile_sections?.experiences) {
            const newSortedArr: typeof sortedJobExperiences = [];
            const found = data.foundUser.profile_sections.experiences.findIndex(
                (val) => val.job_ongoing
            );

            if (found !== -1) {
                newSortedArr.push(data.foundUser.profile_sections.experiences[found]);

                data.foundUser.profile_sections.experiences.forEach((val, i) => {
                    if (i !== found) newSortedArr.push(val);
                });
            }

            sortedJobExperiences = newSortedArr;
        }
    }

    $userOwnsProfile = data.foundUser?.id === data.user?.userId;
</script>

<main>
    <ProfileBackground />
    <div class="w-layout mx-auto px-layout max-w-full pb-10 z-10 flex flex-col -mt-12 relative">
        <ProfileHeader />

        <div class="mt-12 flex flex-col gap-4">
            <ProfileExperiences jobExperiences={sortedJobExperiences} />
        </div>

        {#if $userOwnsProfile}
            <div class="mt-12 flex flex-col gap-4">
                <SectionCreator remainingSections={['experience', 'certificate']} />
            </div>
        {/if}
    </div>
</main>
