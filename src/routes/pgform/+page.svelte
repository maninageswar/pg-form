<script>
    import MultiSelect from 'svelte-multiselect'
    import { enhance } from '$app/forms';

    import { Checkbox, Label, useId } from "bits-ui";
	import Check from "phosphor-svelte/lib/Check";
	import Minus from "phosphor-svelte/lib/Minus";
    import Select from 'svelte-select';

    let pgType = ['gents', 'ladies', 'co-live'];
    const roomTypes = ['sharing 1', 'sharing 2', 'sharing 3', 'sharing 4', 'sharing 5'];

    let noOfFloors = $state();
    let noOfRoomsInEachFloor = $state();
    let selectedRoomTypes = $state([]);
    let roomNumbers = $state([]);
    let imageFiles = $state([]);
    let pgAmenitiesCheckboxes; // to access the checkboxes for pg amenities

    // edit check
    let pgAmenitiesValues = $state([])
    // let pgAmenitiesValues = $state([
    //     'studyTableChair',
    //     'cupboardWardrobe',
    //     'geyserHotWater',
    //     'refrigerator',
    //     'threeMeals',
    //     'roomCleaning',
    //     'biometricEntry'
    // ])


    let calculateRoomNumbers = () => {
        for (let floor = 0; floor <= noOfFloors; floor++) {
            for (let room = 1; room <= noOfRoomsInEachFloor; room++) {
                const roomNum = `${floor}${room.toString().padStart(2, '0')}`;
                if (!roomNumbers.includes(roomNum)) {
                    roomNumbers.push(roomNum);
                }
            }
        }
        roomNumbers.sort((a, b) => Number(a) - Number(b));
    };

    function removeAddedValuesFromRoomNumbers(event) {
        const index = roomNumbers.indexOf(event.option);
        if (index !== -1) {
            roomNumbers.splice(index, 1);
        }
    }

    function addRemovedValuetoRoomNumbers(event) {
        roomNumbers.push(event.option);
        roomNumbers.sort((a, b) => a - b);
    }


    function handleFiles(event) {
        const files = Array.from(event.target.files).filter(f => f.type.startsWith('image/'));
        imageFiles.push(...files.filter(f => !imageFiles.includes(f)));
    }

    function removeFile(index) {
        imageFiles.splice(index, 1);
    }

    function checkboxValuedChanged(event) {
        // const formData = new FormData(event.target.form);
        console.log('checkboxValuedChanged','formData')
    }

</script>

<!-- snippets -->
{#snippet Input(name,type,label,placeholder='')}
    <label for={name}>{label}</label><span class="text-red-500">*</span>
    <input {type} id={name} {name} {placeholder} class="w-full mt-1 mb-4 border border-pg-sky rounded-md focus:border-pg-sky"/>
{/snippet}

{#snippet MyCheckbox({ value, label })}
    {@const id = useId()}
    <div class="flex items-center">
        <Checkbox.Root
            {id}
            aria-labelledby="{id}-label"
            class="border-pg-sky data-[state=unchecked]:border-pg-sky data-[state=checked]:border-pg-sky data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40 peer inline-flex size-[25px] items-center justify-center rounded-md border transition-all duration-150 ease-in-out active:scale-[0.98]"
            {value}
        >
            {#snippet children({ checked, indeterminate })}
                <div class="text-pg-sky inline-flex items-center justify-center">
                    {#if indeterminate}
                        <Minus class="size-[15px]" weight="bold" />
                    {:else if checked}
                        <Check class="size-[15px]" weight="bold" />
                    {/if}
                </div>
            {/snippet}
        </Checkbox.Root>
        <Label.Root
            id="{id}-label"
            for={id}
            class="pl-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label}
        </Label.Root>
    </div>
{/snippet}


<form class="flex-row justify-center" method="POST" action="?/createInventory" use:enhance enctype="multipart/form-data">

    <!-- owner details -->

    <h3 class="mb-2">owner details</h3>

    {@render Input("ownerName", "text", "name")}

    {@render Input("ownerNumber", "number", "mobile")}

    {@render Input("ownerEmail", "email", "email")}

    <!-- pg details -->

    <h3 class="mt-5 mb-2">pg details</h3>

    {@render Input("pgName", "text", "name")}

    {@render Input("pgLocation", "url", "location", "please provide the location link")}

    {@render Input("pgDepositAmount", "number", "deposite amount")}

    <label for="pgType">pg type</label><span class="text-red-500">*</span>
    <div class="mt-1 mb-4">
        <Select items={pgType} required={true} name="pgType"/>
    </div>
    <!-- <select id="pgType" name="pgType" required class="w-full mt-1 mb-4 bg-transparent placeholder:text-pg-sky text-sm border border-pg-sky rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-pg-sky hover:border-pg-sky appearance-none cursor-pointer">
        <option value="" selected>select type</option>
        <option value="gents">gents</option>
        <option value="ladies">ladies</option>
        <option value="colive">co-live</option>
    </select> -->

    
    <label for="pgType">pg room types</label><span class="text-red-500">*</span>
    <div class="mt-1 mb-4">
        <MultiSelect closeDropdownOnSelect={false} bind:selected={selectedRoomTypes} name="pgRoomTypes" options={roomTypes} required={true}/>
    </div>


    <!-- pg room types rents -->

     {#each selectedRoomTypes as selectedRoomType }
        <div class="flex gap-3 justify-around items-baseline">
            <div><label for={selectedRoomType.replace(" ", "-")}>{selectedRoomType} rent</label><span class="text-red-500">*</span></div><span>:</span>
            <input type="number" id={selectedRoomType} name="{`${selectedRoomType.replace(" ", "")}Rent`}" class="w-2/4 mt-1 mb-4 border border-pg-sky rounded-md focus:border-pg-sky"/>
        </div>
     {/each}

    <div class="flex gap-4">
        <div>
            <label for="pgNoOfFloors">no. of floors</label><span class="text-red-500">*</span>
            <input type="number" id="pgNoOfFloors" name="pgNoOfFloors" bind:value={noOfFloors} required oninput={calculateRoomNumbers} class="w-full mt-1 mb-4 border border-pg-sky rounded-md focus:border-pg-sky"/>
        </div>
        
        <div>
            <label for="pgNoOfRoomsInEachFloor">no. of rooms in each floor</label><span class="text-red-500">*</span>
            <input type="number" id="pgNoOfRoomsInEachFloor" name="pgNoOfRoomsInEachFloor" bind:value={noOfRoomsInEachFloor} required oninput={calculateRoomNumbers} class="w-full mt-1 mb-4 border border-pg-sky rounded-md focus:border-pg-sky"/>
        </div>
        
    </div>

    {#if noOfFloors && noOfRoomsInEachFloor && selectedRoomTypes.length > 0}
        <label class="inline-block mb-4">assign rooms no. to respective types</label><span class="text-red-500">*</span>
        {#each selectedRoomTypes as selectedRoomType }
            <div class="mb-4">
                <label class="inline-block mb-1">{selectedRoomType}</label>
                <MultiSelect 
                closeDropdownOnSelect = {false}
                onadd = {removeAddedValuesFromRoomNumbers} 
                onremove = {addRemovedValuetoRoomNumbers}
                onremoveAll = {addRemovedValuetoRoomNumbers}
                name={`${selectedRoomType.replace(" ", "")}Rooms`} 
                options={roomNumbers}
                />
            </div>
        {/each}
    {/if}

    
    <!-- pg aminities -->

    <Checkbox.Group
        class="flex flex-col gap-3 mt-4"
        name="pgAmenities"
        bind:value={pgAmenitiesValues}
        bind:this={pgAmenitiesCheckboxes}
        onValueChange={checkboxValuedChanged}
    >
        <label for=pgAmenities>pg amenities</label>
        <div class="grid grid-flow-col grid-rows-10 gap-4">
            {@render MyCheckbox({ label: "study table & chair", value: "studyTableChair" })}
            {@render MyCheckbox({ label: "cupboard/wardrobe", value: "cupboardWardrobe" })}
            {@render MyCheckbox({ label: "geyser/hot water supply", value: "geyserHotWater" })}

            {@render MyCheckbox({ label: "refrigerator", value: "refrigerator" })}
            {@render MyCheckbox({ label: "3 meals a day", value: "threeMeals" })}

            {@render MyCheckbox({ label: "room cleaning", value: "roomCleaning" })}
            {@render MyCheckbox({ label: "washing machines", value: "washingMachines" })}

            {@render MyCheckbox({ label: "high speed wi-fi", value: "wifi" })}
            {@render MyCheckbox({ label: "common tv", value: "commonTv" })}

            {@render MyCheckbox({ label: "cctv surveillance", value: "cctvSurveillance" })}
            {@render MyCheckbox({ label: "biometric entry", value: "biometricEntry" })}

            {@render MyCheckbox({ label: "parking space", value: "parkingSpace" })}

            {@render MyCheckbox({ label: "air conditioning", value: "airConditioning" })}
            {@render MyCheckbox({ label: "gym/fitness area", value: "gymFitnessArea" })}
            {@render MyCheckbox({ label: "indoor games", value: "indoorGames" })}

            {@render MyCheckbox({ label: "lift/elevator", value: "liftAvaliability" })}
            {@render MyCheckbox({ label: "power backup", value: "powerBackup" })}
            {@render MyCheckbox({ label: "common kitchen", value: "commonKitchenAvaliability" })}
            {@render MyCheckbox({ label: "ro water", value: "roWater" })}

        </div>
    </Checkbox.Group>

    <!-- pg images -->
    <br>
    <label>pg images</label>
    {#if imageFiles.length>0}
        <ul class="file-list">
            {#each imageFiles as file, i}
                <li>
                {file.name}
                <button onclick={() => removeFile(i)} class="delete-btn text-pg-sky px-4 py-2 rounded-md">✖</button>
                </li>
            {/each}
        </ul>
    {/if}

    <div class="flex items-center justify-end">
        <label class="upload-btn bg-pg-sky rounded-md text-white px-4 py-2">upload images
            <input type="file" accept="image/*" name="pgImages" multiple onchange={handleFiles} hidden/>
        </label>
    </div>    
    

    <button class="mt-5 bg-pg-sky text-white px-4 py-2 rounded-md float-right" type="submit">submit</button>

    
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
</form>

<style>
    :global(div.multiselect) {
        border-color: var(--color-pg-sky) !important;
        border-radius: 0.375rem;
        min-height: 41px !important;
    }

    .file-list {
        list-style: none;
        padding: 0;
        margin-top: 0.2rem;
    }

    .file-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f2f2f2;
        padding-left: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 6px;
    }

    .delete-btn {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
    }

    :global(.svelte-select) {
        border: 1px solid var(--color-pg-sky) !important;
    }

    :global(.svelte-select button) {
        color: var(--color-pg-sky) !important;
    }

    :global(.svelte-select-list .item.active) {
        background: var(--color-pg-sky) !important;
        color: white;
    }

    :global(.svelte-select-list .hover) {
        background: none !important;
    }

    :global([aria-selected="true"]) {
        background: var(--color-pg-sky) !important;
        color: white !important;
    }

    :global(.multiselect .remove-all) {
        color: var(--color-pg-sky) !important;
        font-size: 1.2rem;
    }

    :global(.multiselect .remove):hover {
        background: none !important;
    }


</style>