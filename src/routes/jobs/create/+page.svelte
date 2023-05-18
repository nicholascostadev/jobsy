<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import { z } from 'zod';

    export let data;

    const schema = z.object({
        title: z.string().min(2, 'Name must have at least 2 characters.'),
        description: z.string().min(3, 'Username must have at least 3 characters.'),
        jobTitle: z.string().min(1, 'Job title is required.'),
        salaryStart: z.number().min(1, 'Minimum salary must be greater than 0.').nullish(),
        salaryEnd: z.number().min(1, 'Maximum salary must be greater than 0.').nullish()
    });

    const { form, errors, constraints, enhance } = superForm(data.form, {
        validators: schema
    });
</script>

<main class="min-h-with-header flex justify-center items-center">
    <form
        method="POST"
        class="flex flex-col gap-2 w-[680px] max-w-full border border-gray-200 rounded-md p-4 font-poppins"
        use:enhance
    >
        <h2 class="text-2xl mb-2 font-poppins">Create your Job post</h2>
        <fieldset class="flex flex-col max-w-full">
            <label for="title" class="flex justify-start gap-1 items-center">Post title</label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Your post title"
                class="rounded-md max-w-full w-full"
                bind:value={$form.title}
            />
            {#if $errors.title}
                <small class="text-red-600 text-sm">{$errors.title}</small>
            {/if}
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="name" class="flex justify justify-start gap-1-center">Description</label>
            <textarea
                id="description"
                name="description"
                placeholder="Add your job description (you can use markdown for that)"
                class="rounded-md resize-none w-full"
                rows="7"
                bind:value={$form.description}
            />
            {#if $errors.description}
                <small class="text-red-600 text-sm">{$errors.description}</small>
            {/if}
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="username" class="flex justify justify-start gap-1-center">Job title</label>
            <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="A descriptive Job title, e.g. Senior Software Engineer"
                class="rounded-md w-full"
                bind:value={$form.jobTitle}
            />
            {#if $errors.jobTitle}
                <small class="text-red-600 text-sm">{$errors.jobTitle}</small>
            {/if}
        </fieldset>
        <fieldset class="flex items-center justify-center gap-4 max-w-full" name="salary">
            <div class="flex flex-col">
                <label for="salaryStart" class="flex justify-start gap-1">Minimum salary</label>
                <input
                    type="number"
                    id="salaryStart"
                    name="salaryStart"
                    placeholder="e.g. 1000"
                    class="rounded-md w-full"
                    bind:value={$form.salaryStart}
                />
                {#if $errors.salaryStart}
                    <small class="text-red-600 text-sm">{$errors.salaryStart}</small>
                {/if}
            </div>
            <div class="flex flex-col">
                <label for="salaryEnd" class="flex justify-start gap-1">Maximum salary</label>
                <input
                    type="number"
                    id="salaryEnd"
                    name="salaryEnd"
                    placeholder="e.g. 10000"
                    class="rounded-md w-full"
                    bind:value={$form.salaryEnd}
                />

                {#if $errors.salaryStart}
                    <small class="text-red-600 text-sm">{$errors.salaryEnd}</small>
                {/if}
            </div>
        </fieldset>
        <button
            type="submit"
            class="rounded-md border border-purple-500 hover:bg-purple-500 hover:text-white p-2 transition-colors"
        >
            Post job
        </button>
    </form>
</main>
