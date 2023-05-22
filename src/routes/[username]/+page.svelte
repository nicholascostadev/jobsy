<script lang="ts">
    import ProfileBackground from './ProfileBackground.svelte';
    import ProfileHeader from './ProfileHeader.svelte';
    import ProfileSection from './ProfileSection.svelte';
</script>

<main>
    <ProfileBackground />
    <div class="w-layout mx-auto px-layout max-w-full pb-10 z-10 flex flex-col -mt-12 relative">
        <ProfileHeader />

        <div class="mt-12 flex flex-col gap-4">
            <ProfileSection title="About">
                <p>Hello World</p>
            </ProfileSection>
            <ProfileSection
                title="Experiences"
                subTitle="Places I've worked at and lives I've touched."
            >
                <p>Hello World</p>
            </ProfileSection>
            <ProfileSection title="Certificates">
                <p>Hello World</p>
            </ProfileSection>
            <ProfileSection title="Education">
                <p>Hello World</p>
            </ProfileSection>
        </div>
    </div>
</main>
