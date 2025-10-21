<script>
    import { tick } from 'svelte';
    import { enhance } from '$app/forms';
    import { success, warning, failure } from '$lib/notification';
    import { preventKeyPress } from '$lib/utils/sharedlogic';

    let { data } = $props();
    let editingProfile = $state(false);
    let userName;

    function handleSubmit() {
        return async ({ result }) => {
            console.log('form submit result', result);
            if (result.type === 'success') {
                if (result.data?.userProfile) {
                    data = result.data
                    success('user profile updated successfully');
                }
            } else if (result.type === 'failure') {
                failure(result.data?.errors?.message || 'failed to update user profile');
            } else {
                failure('something went wrong while updating user profile');
            }
        }
    }
</script>

{#snippet infoInputTile(name,type,label,value)}
    <div class="border-3 border-pg-sky-light {editingProfile ? "has-[:focus]:border-pg-sky" : ""} rounded-full h-16 mb-8 flex items-center px-6 relative">
        <label for={name} class="absolute bottom-12 bg-white text-xl">{label}<span class="text-red-500 {!editingProfile ? 'hidden' : ''}">*</span></label>
        {#if name == "name"}
            <input class="w-full font-Manrope text-pg-sky-text text-lg border-none focus:ring-0 p-0" required bind:this={userName} readonly={!editingProfile} {name} {value} {type}>
        {:else}
            <input class="w-full font-Manrope text-pg-sky-text text-lg border-none focus:ring-0 p-0" required readonly={!editingProfile} {name} {value} {type}
            onkeydown={(e) => { 
                if ((name == 'number' || name == 'emergencyContact') &&
                (e.target.value.length >= 10 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) ||
                ['e', ' ', '+', '-', '.'].includes(e.key)) {
                    e.preventDefault();
                }
                }}
            >
        {/if}
        
    </div>
{/snippet}

<h2 class="font-Manrope">user profile</h2>

<form method="POST" action="?/updateUserProfile" use:enhance={handleSubmit}>

    <div class="flex flex-col items-center p-5 mb-4">
        <img src="/favicon.svg" alt="" class="border border-pg-sky rounded-full shadow-xl w-[160px] h-[160px] mb-6"/>
        <h3 class="font-Manrope text-pg-sky-text">{data.userProfile.name}</h3>
    </div>

    <hr class="border border-pg-sky-light mb-10">

    {@render infoInputTile("name","text","name",data.userProfile.name)}

    {@render infoInputTile("email","email","email",data.userProfile.email)}

    {@render infoInputTile("number","number","mobile no.",data.userProfile.number)}

    {@render infoInputTile("emergencyContact","number","emergency contact no.",data.userProfile.emergencyContact)}
    
    <button class="mt-5 bg-pg-sky text-white px-4 py-2 rounded-md w-full flex items-center justify-center gap-1 cursor-pointer"
        type={!editingProfile ? "notbutton" : "button"} onclick={() => {
            editingProfile = !editingProfile
            tick().then(() => {userName?.focus()});
            }}>
        <div>{editingProfile ? "update" : "edit"} profile</div> 
        <img src="/icons/edit.svg" class="{editingProfile ? "hidden" : ""}" alt="edit Icon"/>
    </button>
</form>