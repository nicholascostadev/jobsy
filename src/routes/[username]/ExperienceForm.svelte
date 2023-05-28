<script lang="ts">
    import { addExperienceSchema } from './validations';
    import { page } from '$app/stores';
    import { superForm } from 'sveltekit-superforms/client';
    import { createEventDispatcher } from 'svelte';

    let maxDate: string;

    const dispatch = createEventDispatcher();

    $: {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        maxDate = `${year}-${month}-${day}`;
    }

    const { form, errors, enhance } = superForm($page.data.addExperience as any, {
        validators: addExperienceSchema,
        onResult: (event) => {
            if (event.result.type === 'success') dispatch('closeModal');
        },
        invalidateAll: false
    });

    $: isCurrentJob = $form.onGoing;
</script>

<form action="?/addExperience" method="POST" use:enhance>
    <div class="flex flex-col gap-1">
        <input type="hidden" name="sectionType" value="experience" />
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
        <div class="flex gap-2 py-4">
            <label for="onGoing" class="select-none">
                Is that your current job?
                <input type="checkbox" name="onGoing" id="onGoing" bind:checked={$form.onGoing} /> Yes
            </label>
            {#if $errors.onGoing}
                <small class="text-sm text-red-500">{$errors.onGoing}</small>
            {/if}
        </div>
    </div>

    <div class="flex justify-end items-end pb-6">
        <button type="submit" class="p-2 px-4 hover:bg-purple-400/20 rounded-md transition-colors">
            Submit
        </button>
    </div>
</form>
