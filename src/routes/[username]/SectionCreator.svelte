<script lang="ts">
    import Modal from '$lib/components/Modal.svelte';
    import { Plus } from 'lucide-svelte';
    import ExperienceForm from './ExperienceForm.svelte';
    import CertificateForm from './CertificateForm.svelte';

    export let remainingSections: string[];
    let modalOpen = false;
    const valueToTitle = {
        experience: 'Experiences',
        certificate: 'Certifications'
    } as Record<(typeof remainingSections)[number], string>;

    let selectedType: 'experience' | 'certificate' = 'experience';
</script>

{#if modalOpen}
    <Modal on:close={() => (modalOpen = false)} class="w-[750px]">
        <h2 slot="title" class="text-2xl">Add a new section</h2>
        <svelte:fragment slot="content">
            <div class="flex flex-col justify-start items-start pb-2">
                <label for="sectionType">Section Type</label>
                <select
                    name="sectionType"
                    id="sectionType"
                    class="w-full"
                    bind:value={selectedType}
                >
                    {#each remainingSections as section}
                        <option value={section}>{valueToTitle[section]}</option>
                    {/each}
                </select>
            </div>
            {#if selectedType === 'experience'}
                <ExperienceForm on:closeModal={() => (modalOpen = false)} />
            {:else}
                <CertificateForm on:closeModal={() => (modalOpen = false)} />
            {/if}
        </svelte:fragment>
    </Modal>
{/if}

<button
    class="w-full flex justify-center items-center text-gray-500 h-56 bg-gray-100 hover:bg-gray-200 rounded-md p-2 transition-colors"
    title="Add a section"
    on:click={() => (modalOpen = true)}
>
    <Plus class="w-12 h-12" />
</button>
