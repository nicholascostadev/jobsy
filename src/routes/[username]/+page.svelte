<script lang="ts" context="module">
    export type UserData = {
        id?: string;
        name?: string;
        bio?: string | null;
        email?: string;
        certificates?: Certificate[];
        experiences?: Experience[];
        profile_links?: ProfileLink[];
        thumbnailColor?: string;
        username?: string;
    };
</script>

<script lang="ts">
    import { setContext } from 'svelte';
    import ProfileBackground from './ProfileBackground.svelte';
    import ProfileHeader from './ProfileHeader.svelte';
    import SectionCreator from './SectionCreator.svelte';
    import type { Certificate, Experience, ProfileLink } from '@prisma/client';
    import { userOwnsProfile } from '$lib/stores/userProfile';
    import ProfileExperiences from './ProfileExperiences.svelte';
    import ProfileCertificates from './ProfileCertificates.svelte';

    export let data;

    setContext<UserData>('userData', {
        id: data.foundUser?.id,
        name: data.foundUser?.name,
        bio: data.foundUser?.bio,
        email: data.foundUser?.email,
        certificates: data.foundUser?.certificates,
        experiences: data.foundUser?.experiences,
        profile_links: data.foundUser?.profile_links,
        thumbnailColor: data.foundUser?.thumbnailColor,
        username: data.foundUser?.username
    });

    $userOwnsProfile = data.foundUser?.id === data.user?.userId;
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
