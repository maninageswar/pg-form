<script>
    import { page } from '$app/state';

    let { data } = $props();
    console.log('data',data.pgProperty)
</script>


<!-- <h3 class="text-center">{page.params.pgPropertyName}</h3> -->
<h2 class="mb-2 font-Manrope">pg information</h2>

<div class="w-[348px] h-[176px] overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory 
[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] *:ml-3 mb-5">
    <img class="inline-block w-[280px] h-[175px] object-cover snap-start" src="/pgImages/image2.png" alt="">
    <img class="inline-block w-[280px] h-[175px] object-cover snap-start" src="/pgImages/image2.png" alt="">
    <img class="inline-block w-[280px] h-[175px] object-cover snap-start" src="/pgImages/image2.png" alt="">
</div>


<div class="mt-3">
    <p class="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">name</p>
    <p class="text-[#4b819b] text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.pgName}</p>
</div>

<div class="mt-3">
    <p class="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">type</p>
    <p class="text-[#4b819b] text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.pgType.value}</p>
</div>

<div class="mt-3">
    <p class="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">deposite amount</p>
    <p class="text-[#4b819b] text-sm font-normal leading-normal line-clamp-2">&#8377;{data.pgProperty.pgDepositAmount}</p>
</div>

<div class="mt-3 flex items-center justify-between">
    <div class="basis-[80%]">
        <p class="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">location</p>
        <p class="text-[#4b819b] text-sm font-normal leading-normal line-clamp-2">123 Main Street, Anytown need to add a field in form</p>
    </div>
    <img src="/icons/location.svg" alt="Location Icon" />
</div>


<div class="mt-3 h-60 rounded overflow-hidden shadow">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.0191611890725!2d77.69597336297588!3d12.952223693502285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13ca553bf095%3A0x9684697de5f2837c!2sSRI%20SHIVA%20PG%20FOR%20GENTS!5e0!3m2!1sen!2sin!4v1757425463716!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

<h2 class="mt-5 mb-2 font-Manrope">rooms types & pricing</h2>


<div class="mt-3 grid grid-cols-2 gap-3 *:border *:border-pg-sky *:h-[170px] *:rounded-xl *:shadow-sm">
    {#each data.pgProperty.pgRoomTypes as roomType}
        <div class="p-4 flex flex-col justify-between">
            <img src="/icons/bed.svg" alt="Location Icon" class="w-[45px] h-[45px]" />
            <div class="h-[55%]">
                <h2 class="text-[#0d171c] text-base font-bold leading-tight mb-2">{roomType}</h2>
                <p class="text-[#4b819b] text-sm font-normal leading-normal">&#8377;{data.pgProperty[`${roomType.replace(/\s+/g, '')}Rent`]}/month</p>
                <p class="text-[#4b819b] text-sm font-normal leading-normal">5 rooms available</p>
            </div>
        </div>
    {/each}
</div>

<h2 class="mt-5 mb-2 font-Manrope">pg amenities</h2>

<div class="mt-3 grid grid-cols-2 gap-3 *:border *:border-pg-sky *:h-[60px] *:rounded-xl *:shadow-sm">
    {#each data.pgProperty.pgAmenities as pgAmenities}
        <div class="p-2 flex items-center gap-1">
            <img src="/icons/{pgAmenities}.svg" alt="">
            <p class="text-[#0d171c] text-sm font-normal leading-normal">{pgAmenities.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}</p>
        </div>
    {/each}
</div>

<h2 class="mt-5 mb-2 font-Manrope">owner details</h2>

<div class="mt-3">
    <p class="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">name</p>
    <p class="text-[#4b819b] text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.ownerName}</p>
</div>

<div class="mt-3">
    <p class="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">number</p>
    <p class="text-[#4b819b] text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.ownerNumber}</p>
</div>

{#if data.pgProperty.ownerEmail}
    <div class="mt-3">
        <p class="text-[#0d171c] text-base font-medium leading-normal line-clamp-1">email</p>
        <p class="text-[#4b819b] text-sm font-normal leading-normal line-clamp-2">{data.pgProperty.ownerEmail}</p>
    </div>
{/if}


<button class="mt-5 bg-pg-sky text-white px-4 py-2 rounded-md w-full">book rooms</button>

<br>
<br>
<br>
