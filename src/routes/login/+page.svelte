<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import { z } from 'zod';

    export let data;

    const schema = z.object({
        username: z.string().min(1, 'Username must have at least 1 character.'),
        password: z.string().min(1, 'Password must have at least 1 character.')
    });

    const { form, errors, constraints, enhance } = superForm(data.form, {
        validators: schema
    });
</script>

<main class="min-h-with-header flex justify-center items-center bg-gray-50">
    <form
        method="POST"
        class="bg-white flex flex-col gap-2 w-[450px] max-w-full border border-gray-200 rounded-md p-4 font-poppins"
        use:enhance
    >
        <h2 class="text-2xl mb-2 font-poppins">Get back to work</h2>
        <fieldset class="flex flex-col">
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Your awesome username"
                class="rounded-md"
                bind:value={$form.username}
                {...$constraints.username}
            />
            {#if $errors.username}
                <small class="text-red-600 text-sm">{$errors.username}</small>
            {/if}
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Your secret password 🤫"
                class="rounded-md"
                bind:value={$form.password}
                {...$constraints.password}
            />
            {#if $errors.password}
                <small class="text-red-600 text-sm">{$errors.password}</small>
            {/if}
        </fieldset>
        <button
            type="submit"
            class="rounded-md border border-purple-500 hover:bg-purple-500 hover:text-white p-2 transition-colors"
            >Login</button
        >
        <div class="flex justify-end items-center">
            <a href="/register" class="text-sm text-blue-800">Don&apos;t have an account?</a>
        </div>
    </form>
</main>
