<script>
    import { page } from '$app/stores';
</script>

<header class="shadow-sm">
    <nav class="h-header flex justify-between items-center px-layout w-layout mx-auto max-w-full">
        <a href="/" class="text-2xl font-semibold font-poppins">Jobsy</a>

        <div class="flex items-center justify-center gap-4">
            <a href="/#about" class="hover:text-gray-700 transition-colors">About Us</a>
            {#if $page.data.user}
                <a href="/feed">Jobs</a>
                <a href="/jobs/create">Post a Job</a>
                <form method="POST">
                    <button formaction="/logout" class="hover:text-gray-700" type="submit">
                        Logout
                    </button>
                </form>
            {/if}
            {#if !$page.data.user}
                <a
                    href="/login"
                    class="text-lg bg-purple-500 rounded-full px-3 py-1 text-white hover:bg-purple-600 transition-colors"
                >
                    Login
                </a>
            {/if}
            <a
                href="/{$page.data.user?.username}"
                class="bg-gray-400 w-10 h-10 rounded-full"
                aria-label="Go to profile"
            />
        </div>
    </nav>
</header>
