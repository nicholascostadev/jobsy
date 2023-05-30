<script lang="ts">
    import { Menu } from 'lucide-svelte';
    import Drawer from './Drawer.svelte';
    import { cn } from '$lib/utils';
    import { page } from '$app/stores';
    import Dropdown from './Dropdown.svelte';

    let dropdowncontainer: HTMLDivElement;

    let drawerOpen = false;
    let dropdownOpen = false;

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    function closeDropdown() {
        dropdownOpen = false;
    }

    function openDrawer() {
        drawerOpen = true;
    }

    function closeDrawer() {
        drawerOpen = false;
    }
</script>

<header class="shadow-sm">
    <nav class="h-header flex justify-between items-center px-layout w-layout mx-auto max-w-full">
        <a href="/" class="text-2xl font-semibold font-poppins">Jobsy</a>

        <div class="flex items-center justify-center gap-4">
            <a
                href="/#about"
                class={cn(
                    'hover:text-gray-700 transition-colors',
                    $page.route.id !== '/' && 'hidden'
                )}
            >
                About Us
            </a>
            {#if $page.data.user}
                <a href="/jobs">Jobs</a>
                <a href="/jobs/create" class="hidden md:block">Post a Job</a>
                <form method="POST" class="hidden md:block">
                    <button formaction="/logout" class="hover:text-gray-700" type="submit">
                        Logout
                    </button>
                </form>
                <div bind:this={dropdowncontainer}>
                    <button
                        type="button"
                        class="w-10 h-10 bg-gray-400 rounded-full"
                        on:click={() => (dropdownOpen = true)}
                    />
                    {#if dropdownOpen}
                        <Dropdown
                            on:close={closeDropdown}
                            targetElm={dropdowncontainer}
                            class="w-fit"
                        >
                            <ul>
                                <li>
                                    <a
                                        href="/{$page.data.user.username}"
                                        class="p-2 hover:bg-purple-400/20 block rounded-t-md"
                                        on:click={closeDropdown}
                                    >
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/applications"
                                        class="p-2 hover:bg-purple-400/20 block"
                                        on:click={closeDropdown}
                                    >
                                        View my applications
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/published-jobs"
                                        class="p-2 hover:bg-purple-400/20 block rounded-b-md"
                                        on:click={closeDropdown}
                                    >
                                        Published jobs
                                    </a>
                                </li>
                            </ul>
                        </Dropdown>
                    {/if}
                </div>

                <!-- <a -->
                <!--     href="/{$page.data.user?.username}" -->
                <!--     class="bg-gray-400 w-10 h-10 rounded-full" -->
                <!--     aria-label="Go to profile" -->
                <!-- /> -->
            {/if}
            {#if !$page.data.user}
                <a
                    href="/login"
                    class="text-lg bg-purple-500 rounded-full px-3 py-1 text-white hover:bg-purple-600 transition-colors"
                >
                    Login
                </a>
            {/if}
            <button on:click={openDrawer} aria-label="Open Drawer" class="block md:hidden">
                <Menu class="w-6 h-6" />
            </button>
        </div>
    </nav>
</header>

{#if drawerOpen}
    <Drawer on:close={closeDrawer}>
        <div class="flex flex-col items-start justify-center gap-4">
            <a
                href="/#about"
                class="hover:text-gray-700 transition-colors text-lg"
                on:click={closeDrawer}>About Us</a
            >
            {#if $page.data.user}
                <a href="/jobs" class="text-lg" on:click={closeDrawer}>Jobs</a>
                <a href="/jobs/create" class="text-lg" on:click={closeDrawer}>Post a Job</a>
                <form method="POST">
                    <button
                        formaction="/logout"
                        class="hover:text-gray-700 text-lg"
                        type="submit"
                        on:click={closeDrawer}
                    >
                        Logout
                    </button>
                </form>
            {/if}
            {#if !$page.data.user}
                <a
                    href="/login"
                    class="text-lg bg-purple-500 rounded-full px-3 py-1 text-white hover:bg-purple-600 transition-colors"
                    on:click={closeDrawer}
                >
                    Login
                </a>
            {/if}
        </div>
    </Drawer>
{/if}
