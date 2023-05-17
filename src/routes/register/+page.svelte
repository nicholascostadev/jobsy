<main class="min-h-with-header flex justify-center items-center">
    <form
        method="POST"
        class="flex flex-col gap-2 w-96 max-w-full border border-gray-200 p-4 font-poppins"
    >
        <h2 class="text-2xl mb-2 font-poppins">Start your journey</h2>
        <fieldset class="flex flex-col">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" class="rounded-md" />
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" class="rounded-md" />
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" class="rounded-md" />
        </fieldset>
        <fieldset class="flex flex-col">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" class="rounded-md" />
        </fieldset>
        <button
            type="submit"
            class="rounded-md border border-purple-500 hover:bg-purple-500 hover:text-white p-2 transition-colors"
            >Register</button
        >
    </form>
</main>
