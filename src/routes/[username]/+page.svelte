<script>
    export let data;

    let amount = new Array(3).fill(0);
</script>

<main>
    <div class="bg-purple-300 w-full h-96" />
    <div class="w-layout mx-auto px-layout max-w-full pb-10">
        <div class="flex flex-col md:flex-row items-start justify-start gap-4 -mt-12">
            <div
                class="rounded-full w-40 h-40 md:w-52 md:h-52 bg-gray-500 border-purple-300 border-2"
            />
            <div class="flex-1 md:pt-14">
                <h1 class="text-xl font-poppins">{data.foundUser?.name}</h1>
                <p class="text-gray-700 font-poppins">@{data.foundUser?.username}</p>
                <p class="font-poppins">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam perspiciatis
                    adipisci quae tempore omnis magnam corporis, nulla ratione hic quis temporibus,
                    asperiores dolore eius vitae earum nobis deserunt voluptas consequatur?
                </p>

                <div class="mt-2 flex items-center justify-start gap-2">
                    {#each amount as item}
                        <div class="w-8 h-8 rounded-md bg-purple-400" />
                    {/each}
                </div>
            </div>
        </div>

        <div class="mt-12 flex flex-col gap-4">
            <div class="w-full h-56 bg-gray-400 rounded-md" />
            <div class="w-full h-56 bg-gray-400 rounded-md" />
            <div class="w-full h-56 bg-gray-400 rounded-md" />
        </div>
    </div>
</main>
