<script lang="ts">
    import ProfileHeader from './ProfileHeader.svelte';
    import ProfileSection from './ProfileSection.svelte';
</script>

<main>
    <div class="bg-purple-300 w-full h-96" />
    <div class="w-layout mx-auto px-layout max-w-full pb-10">
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
