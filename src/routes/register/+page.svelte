<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import { z } from 'zod';

    export let data;

    const schema = z.object({
        name: z.string().min(2, 'Name must have at least 2 characters.'),
        username: z.string().min(3, 'Username must have at least 3 characters.'),
        email: z.string().email('Invalid email.'),
        password: z.string().min(5, 'Password must have at least 5 characters.')
    });

    const { form, errors, constraints, enhance } = superForm(data.form, {
        validators: schema
    });
</script>

<main class="min-h-with-header flex justify-center items-center">
    <form
        method="POST"
        class="flex flex-col gap-2 w-96 max-w-full border border-gray-200 rounded-md p-4 font-poppins"
        use:enhance
    >
        <h2 class="text-2xl mb-2 font-poppins">Start your journey</h2>
        <fieldset class="flex flex-col">
            <label for="email" class="flex justify-start gap-1 items-center">Email </label>
            <input
                type="text"
                id="email"
                name="email"
                placeholder="Your email"
                class="rounded-md"
                bind:value={$form.email}
            />
            {#if $errors.email}
                <small class="text-red-600 text-sm">{$errors.email}</small>
            {/if}
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="name" class="flex justify justify-start gap-1-center">Name </label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                class="rounded-md"
                bind:value={$form.name}
            />
            {#if $errors.name}
                <small class="text-red-600 text-sm">{$errors.name}</small>
            {/if}
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="username" class="flex justify justify-start gap-1-center">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Your awesome username"
                class="rounded-md"
                bind:value={$form.username}
            />
            {#if $errors.username}
                <small class="text-red-600 text-sm">{$errors.username}</small>
            {/if}
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="password" class="flex justify-start gap-1">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Your secret password 🤫"
                class="rounded-md"
                bind:value={$form.password}
            />
            {#if $errors.password}
                <small class="text-red-600 text-sm">{$errors.password}</small>
            {/if}
        </fieldset>
        <button
            type="submit"
            class="rounded-md border border-purple-500 hover:bg-purple-500 hover:text-white p-2 transition-colors"
            >Register</button
        >
        <div class="flex justify-end items-center">
            <a href="/login" class="text-sm text-blue-800">Already have an account?</a>
        </div>
    </form>
</main>
