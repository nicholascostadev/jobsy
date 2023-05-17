<script>
    import '../app.postcss';

    export let data;
</script>

<header>
    <nav class="h-header flex justify-between items-center px-layout">
        <a href="/" class="text-2xl font-semibold font-poppins">Jobsy</a>

        <div class="flex items-center justify-center gap-4">
            <a href="/#about" class="hover:text-gray-700 transition-colors">About Us</a>
            {#if data.user}
                <form method="POST">
                    <button formaction="/logout" type="submit">Logout</button>
                </form>
            {/if}
            {#if !data.user}
                <a
                    href="/login"
                    class="text-lg bg-purple-500 rounded-full px-3 py-1 text-white hover:bg-purple-600 transition-colors"
                >
                    Login
                </a>
            {/if}
        </div>
    </nav>
</header>
<slot />
