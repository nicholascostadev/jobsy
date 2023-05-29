<script lang="ts">
    import ProfileBackground from './ProfileBackground.svelte';
    import ProfileHeader from './ProfileHeader.svelte';
    import SectionCreator from './SectionCreator.svelte';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import ProfileExperiences from './ProfileExperiences.svelte';
    import ProfileCertificates from './ProfileCertificates.svelte';
    import { setupPageUser } from './stores';

    export let data;

    $: setupPageUser({ ...data.foundUser });

    $: $userOwnsProfile = data.foundUser?.id === data.user?.userId;
</script>

<main>
    <ProfileBackground />
    <div class="w-layout mx-auto px-layout max-w-full pb-10 z-10 flex flex-col -mt-12 relative">
        <ProfileHeader />

        <div class="mt-12 flex flex-col gap-4">
            <ProfileExperiences />
        </div>
        <div class="mt-12 flex flex-col gap-4">
            <ProfileCertificates />
        </div>

        {#if $userOwnsProfile}
            <div class="mt-12 flex flex-col gap-4">
                <SectionCreator remainingSections={['experience', 'certificate']} />
            </div>
        {/if}
    </div>
</main>
