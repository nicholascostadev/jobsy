<script>
    import { ArrowLeft } from 'lucide-svelte';
</script>

<div
    class="w-layout max-w-full mx-auto px-layout h-with-header flex flex-col gap-2 justify-center items-center text-center"
>
    <h1 class="text-2xl md:text-4xl">
        Page <span class="text-purple-500 font-poppins">not found</span> :(
    </h1>
    <p class="text-lg md:text-2xl font-poppins">
        Sorry, we couldn't find the page you're looking for.
    </p>
    <a href="/" class="text-purple-500 md:text-lg flex justify-center items-center gap-2">
        <ArrowLeft class="text-purple-500 w-6 h-6" />
        <span>Go back to Homepage</span>
    </a>
</div>
