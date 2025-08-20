<script>
    import { page } from '$app/state';

    let { data } = $props();
    console.log('data',data.pgProperty)
</script>


<!-- <h3 class="text-center">{page.params.pgPropertyName}</h3> -->
<h2 class="mb-2">pg images gallery</h2>

<div class="w-[348px] h-[176px] overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory 
[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] *:ml-3 mb-5">
    <img class="inline-block w-[280px] h-[175px] object-cover snap-start" src="/pgImages/image2.png" alt="">
    <img class="inline-block w-[280px] h-[175px] object-cover snap-start" src="/pgImages/image2.png" alt="">
    <img class="inline-block w-[280px] h-[175px] object-cover snap-start" src="/pgImages/image2.png" alt="">
</div>

<h2 class="mb-2">pg information</h2>

<div>
    <p class="mb-2">pgName: {data.pgProperty.pgName}</p>
    <p class="mb-2">pgAddress: {data.pgProperty.pgAddress}</p>
    <p class="mb-2">pgOwnerName: {data.pgProperty.pgOwnerName}</p>
    <p class="mb-2">pgOwnerContact: {data.pgProperty.pgOwnerContact}</p>
    <p class="mb-2">pgDescription: {data.pgProperty.pgDescription}</p>
    <p class="mb-2">pgRent: {data.pgProperty.pgRent}</p>
</div>




