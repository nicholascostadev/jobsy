<script>
    import { ArrowRight } from 'lucide-svelte';
</script>

<main class="px-layout min-h-with-header md:px-layout-md">
    <div class="h-[calc(100vh-450px)] grid grid-cols-1 md:grid-cols-2 place-items-center">
        <div class="max-w-2xl w-full flex flex-col gap-4 justify-start items-start">
            <div class="flex flex-col justify-start items-start gap-2">
                <h1 class="text-4xl font-poppins">
                    <strong class="text-purple-600 font-semibold">Unlock</strong> Your Professional Potential
                    with Jobsy
                </h1>

                <p class="text-lg">
                    Join Jobsy, the premier platform for professionals. Discover opportunities,
                    forge connections, and excel in your career. Unlock your potential today!
                </p>
            </div>

            <a
                href="/login"
                class="flex justify-center items-center gap-1 border border-purple-500 px-4 py-1 text-lg rounded-full hover:bg-purple-500 hover:text-white transition-colors"
            >
                Start now!
                <ArrowRight class="w-5 h-5" />
            </a>
        </div>

        <img
            src="/interview.svg"
            alt="A person greeting a candidate that is going to start an interview"
            class="h-[386px]"
        />
    </div>
</main>
