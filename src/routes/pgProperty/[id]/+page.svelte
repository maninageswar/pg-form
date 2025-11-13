<script>
    import { PUBLIC_GOOGLE_MAP_API_KEY, PUBLIC_POCKETBASE_REST_API } from '$env/static/public';
    import { goto } from "$app/navigation";
    import { page } from '$app/state';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import * as gmapsLoader from '@googlemaps/js-api-loader';
    const { Loader } = gmapsLoader;
    import { success } from '$lib/notification'

    let { data } = $props();
    let mapElement;
    console.log('data.pgProperty',data.pgProperty)

    const pgAmenitiesLabels = {
        studyTableChair: "study table & chair",
        cupboardWardrobe: "cupboard/wardrobe",
        geyserHotWater: "geyser/hot water",
        refrigerator: "refrigerator",
        threeMeals: "3 meals a day",
        roomCleaning: "room cleaning",
        washingMachines: "washing machines",
        wifi: "high speed wi-fi",
        commonTv: "common tv",
        cctvSurveillance: "cctv surveillance",
        biometricEntry: "biometric entry",
        parkingSpace: "parking space",
        airConditioning: "air conditioning",
        gymFitnessArea: "gym/fitness area",
        indoorGames: "indoor games",
        liftAvaliability: "lift/elevator",
        powerBackup: "power backup",
        commonKitchen: "common kitchen",
        roWater: "ro water"
    }

    onMount(() => {
        const loader = new Loader({
            apiKey: PUBLIC_GOOGLE_MAP_API_KEY,
            version: "weekly",
        });

        let map;
        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
        
            map = new Map(mapElement, {
            center: { lat: 12.9517943, lng: 77.6985907 },
            zoom: 17,
            });

        });
    });

    function handleDeleteProperty() {
        return async ({ result }) => {
            if (result.data?.propertyDeleted) {
                success(result.data?.propertyDeleted)
                goto('/')  
            }
        }
    }
</script>

<div class="flex items-center justify-between mb-5">
    <h2 class="font-Manrope">pg information</h2>
    <form method="POST" use:enhance={handleDeleteProperty}>
        <button class="cursor-pointer bg-pg-red-button rounded-md p-1" onclick={() => deleteProperty(data.pgProperty.id)}
            formaction={`?/deleteInventory&recordId=${data.pgProperty.id}`}>
            <img src="/icons/delete.svg" alt="delete icon"/>
        </button>
    </form>
</div>

<div class="w-full h-[176px] overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory 
[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] *:mr-3 mb-5 *:shadow-xl">
    {#each data.pgProperty.pgImages as pgImage}
        <div class="w-[85%] h-[176px] border border-pg-sky inline-block"><img class="w-full h-full object-cover" src="{PUBLIC_POCKETBASE_REST_API}/files/{data.pgProperty.collectionId}/{data.pgProperty.id}/{pgImage}" alt="pg-image"></div>
    {/each}
</div>

<div class="mt-3">
    <p class="text-base font-medium leading-normal line-clamp-1">name</p>
    <p class="text-pg-sky-text text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.pgName}</p>
</div>

<div class="mt-3">
    <p class="text-base font-medium leading-normal line-clamp-1">type</p>
    <p class="text-pg-sky-text text-sm font-normal leading-normal line-clamp-2">pg for {data.pgProperty.pgType}</p>
</div>

<div class="mt-3">
    <p class="text-base font-medium leading-normal line-clamp-1">deposite amount</p>
    <p class="text-pg-sky-text text-sm font-normal leading-normal line-clamp-2">&#8377;{data.pgProperty.pgDepositAmount}</p>
</div>

<div class="mt-3">
    <p class="text-base font-medium leading-normal line-clamp-1">location</p>
    <div class="flex items-center justify-between">
        <p class="text-pg-sky-text text-sm font-normal basis-[90%] lowercase">{data.pgProperty.pgAddress}, {data.pgProperty.pgLandmark}, {data.pgProperty.pgCity}, {data.pgProperty.pgState} {data.pgProperty.pgPincode}.</p>
        <img src="/icons/location.svg" alt="Location Icon" />
    </div>
</div>


<div class="mt-3 w-full h-60 rounded overflow-hidden shadow" bind:this={mapElement} id="map"></div>


<h2 class="mt-5 mb-5 font-Manrope">rooms types & pricing</h2>


<div class="mt-3 grid grid-cols-2 gap-3 *:border *:border-pg-sky *:h-[170px] *:rounded-xl *:shadow-sm">
    {#each data.pgProperty.pgRoomTypes as roomType}
        <div class="p-4 flex flex-col justify-between">
            <img src="/icons/bed.svg" alt="bed icon" class="w-[45px] h-[45px]" />
            <div class="h-[55%]">
                <h2 class="text-base font-bold leading-tight mb-2">{roomType}</h2>
                <p class="text-pg-sky-text text-sm font-normal leading-normal">&#8377;{data.pgProperty[`${roomType.replace(/\s+/g, '')}Rent`]}/month</p>
                <p class="text-pg-sky-text text-sm font-normal leading-normal">5 rooms available</p>
            </div>
        </div>
    {/each}
</div>

<h2 class="mt-5 mb-5 font-Manrope">pg amenities</h2>

<div class="mt-3 grid grid-cols-2 gap-3 *:border *:border-pg-sky *:h-[60px] *:rounded-xl *:shadow-sm">
    {#each data.pgProperty.pgAmenities as pgAmenities}
        <div class="p-2 flex items-center gap-1">
            <img src="/icons/{pgAmenities}.svg" alt="">
            <p class="text-sm font-normal leading-normal">{pgAmenitiesLabels[pgAmenities]}</p>
        </div>
    {/each}
</div>

<h2 class="mt-5 mb-5 font-Manrope">owner details</h2>

<div class="mt-3">
    <p class="text-base font-medium leading-normal line-clamp-1">name</p>
    <p class="text-pg-sky-text text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.ownerName}</p>
</div>

<div class="mt-3">
    <p class="text-base font-medium leading-normal line-clamp-1">number</p>
    <p class="text-pg-sky-text text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.ownerNumber}</p>
</div>

{#if data.pgProperty.ownerEmail}
    <div class="mt-3">
        <p class="text-base font-medium leading-normal line-clamp-1">email</p>
        <p class="text-pg-sky-text text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.ownerEmail}</p>
    </div>
{/if}

<!-- TODO: need to check if the user logged is the ower of currently showing pg property then we need show the contents-->
{#if true} 
    <button class="mt-5 bg-pg-sky text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-1 cursor-pointer"
        onclick={() => goto("/pgForm", {state: {propertyData: data.pgProperty}})}
    >
        <div>edit property</div> 
        <img src="/icons/edit.svg" alt="edit Icon" />
    </button>
{:else}
    <button class="mt-5 bg-pg-sky text-white px-4 py-2 rounded-md w-full cursor-pointer">book rooms</button>
{/if}

<style>
    :global(#map > div:first-child + div) {
        display: none !important;
    }
</style>
