<script lang="ts">
    import Modal from '$lib/components/Modal.svelte';
    import { Plus } from 'lucide-svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { page } from '$app/stores';
    import { addSectionSchema } from './validations';
    import type { SubmitFunction } from '$app/forms';

    export let remainingSections: string[];
    let modalOpen = false;
    let maxDate: string;
    let selectedSection: string = remainingSections[0];
    const valueToTitle = {
        experience: 'Experiences',
        certificate: 'Certifications'
    } as Record<(typeof remainingSections)[number], string>;

    function openModal() {
        modalOpen = true;
    }

    $: {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        maxDate = `${year}-${month}-${day}`;
    }

    const { form, errors, enhance } = superForm($page.data.addSection as any, {
        validators: addSectionSchema,
        onResult: (event) => {
            if (event.result.type === 'success') modalOpen = false;
        }
    });

    $: isCurrentJob = $form.onGoing;
</script>

{#if modalOpen}
    <Modal on:close={() => (modalOpen = false)}>
        <h2 slot="title" class="text-2xl">Add a new section</h2>
        <svelte:fragment slot="content">
            <form action="?/addSection" method="POST" use:enhance>
                <div class="flex flex-col justify-start items-start pb-2">
                    <label for="sectionType">Section Type</label>
                    <select
                        name="sectionType"
                        id="sectionType"
                        class="w-full"
                        data-invalid={$errors.sectionType}
                        bind:value={$form.sectionType}
                    >
                        {#each remainingSections as section}
                            <option value={section}>{valueToTitle[section]}</option>
                        {/each}
                    </select>
                    {#if $errors.sectionType}
                        <small class="text-sm text-red-500">{$errors.sectionType}</small>
                    {/if}
                </div>
                <div class="flex flex-col gap-1">
                    <label for="jobTitle">Job Title</label>
                    <input
                        class="w-full"
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        data-invalid={$errors.jobTitle}
                        bind:value={$form.jobTitle}
                    />
                    {#if $errors.jobTitle}
                        <small class="text-sm text-red-500">{$errors.jobTitle}</small>
                    {/if}
                    <label for="jobCompany">Company</label>
                    <input
                        class="w-full"
                        type="text"
                        name="jobCompany"
                        id="jobCompany"
                        bind:value={$form.jobCompany}
                    />
                    {#if $errors.jobCompany}
                        <small class="text-sm text-red-500">{$errors.jobCompany}</small>
                    {/if}

                    <label for="jobDescription">Job Description</label>
                    <textarea
                        class="w-full resize-none"
                        rows="5"
                        name="jobDescription"
                        id="jobDescription"
                        bind:value={$form.jobDescription}
                    />
                    {#if $errors.jobDescription}
                        <small class="text-sm text-red-500">{$errors.jobDescription}</small>
                    {/if}
                    <div class="flex items-center justify-center gap-4">
                        <div class="w-full">
                            <label for="jobStartDate">Start Date</label>
                            <input
                                class="w-full"
                                type="date"
                                name="jobStartDate"
                                id="jobStartDate"
                                max={maxDate}
                                bind:value={$form.jobStartDate}
                            />
                            {#if $errors.jobStartDate}
                                <small class="text-sm text-red-500">{$errors.jobStartDate}</small>
                            {/if}
                        </div>
                        {#if !isCurrentJob}
                            <div class="w-full">
                                <label for="jobEndDate">End Date</label>
                                <input
                                    class="w-full"
                                    type="date"
                                    name="jobEndDate"
                                    id="jobEndDate"
                                    max={maxDate}
                                    bind:value={$form.jobEndDate}
                                />
                                {#if $errors.jobEndDate}
                                    <small class="text-sm text-red-500">{$errors.jobEndDate}</small>
                                {/if}
                            </div>
                        {/if}
                    </div>
                    {#if selectedSection === 'experience'}
                        <div class="flex gap-2 py-4">
                            <label for="onGoing" class="select-none">
                                Is that your current job?
                                <input
                                    type="checkbox"
                                    name="onGoing"
                                    id="onGoing"
                                    bind:checked={$form.onGoing}
                                /> Yes
                            </label>
                            {#if $errors.onGoing}
                                <small class="text-sm text-red-500">{$errors.onGoing}</small>
                            {/if}
                        </div>
                    {/if}
                </div>
                <div class="flex justify-end items-end pb-6">
                    <button
                        type="submit"
                        class="p-2 px-4 hover:bg-purple-400/20 rounded-md transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </svelte:fragment>
    </Modal>
{/if}

<button
    class="w-full flex justify-center items-center text-gray-500 h-56 bg-gray-100 hover:bg-gray-200 rounded-md p-2 transition-colors"
    title="Add a section"
    on:click={openModal}
>
    <Plus class="w-12 h-12" />
</button>
