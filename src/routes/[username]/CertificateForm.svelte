<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    import { addCertificateSchema } from './validations';

    const dispatch = createEventDispatcher();

    const { form, enhance, errors } = superForm($page.data.addCertificate as any, {
        validators: addCertificateSchema,
        onResult: (event) => {
            if (event.result.type === 'success') dispatch('closeModal');
        },
        invalidateAll: false
    });

    let maxDate: string;

    $: {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        maxDate = `${year}-${month}-${day}`;
    }
</script>

<form action="?/addCertificate" method="POST" use:enhance class="flex flex-col w-full">
    <div class="flex flex-col justify-end items-end pb-6 w-full">
        <div class="flex flex-col gap-1 w-full">
            <input type="hidden" name="sectionType" value="certificate" />
            <label for="title">Certificate Title</label>
            <input
                class="w-full resize-none"
                type="text"
                name="title"
                id="title"
                bind:value={$form.title}
            />
            {#if $errors.title}
                <small class="text-sm text-red-500">{$errors.title}</small>
            {/if}
            <label for="description">Certificate Description</label>
            <textarea
                class="w-full resize-none"
                rows="5"
                name="description"
                id="description"
                bind:value={$form.description}
            />
            {#if $errors.description}
                <small class="text-sm text-red-500">{$errors.description}</small>
            {/if}
            <label for="url">Certificate url</label>
            <input
                class="w-full resize-none"
                type="text"
                name="url"
                id="url"
                bind:value={$form.url}
            />
            {#if $errors.url}
                <small class="text-sm text-red-500">{$errors.url}</small>
            {/if}
            <label for="issueDate">Issue date</label>
            <input
                class="w-full resize-none"
                type="date"
                name="issueDate"
                id="issueDate"
                max={maxDate}
                bind:value={$form.issueDate}
            />
            {#if $errors.issueDate}
                <small class="text-sm text-red-500">{$errors.issueDate}</small>
            {/if}
        </div>
        <button
            type="submit"
            class="p-2 px-4 hover:bg-purple-400/20 rounded-md transition-colors mt-4"
        >
            Submit
        </button>
    </div>
</form>
