<script>
    import { tick } from 'svelte';
    import { enhance } from '$app/forms';
    import { success, warning, failure } from '$lib/notification';
    import { preventKeyPress } from '$lib/utils/sharedlogic';

    let { data } = $props();
    let editingProfile = $state(false);
    let userName;
    let formErrors = $state({});
    let isUpdateProfileButtonDisabled = $state(true);
    let formElement;

    let formHasErrors = $derived.by(() => {
        if (editingProfile) {
            return Object.keys(formErrors).length > 0;
        }
        return false;
    });

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

    function validateMobileNumber(event) {
        const input = event.target;
        const mobileNumber = input.value;
        const mobileNumberPattern = /^[0-9]{10}$/;

        if (!mobileNumberPattern.test(mobileNumber)) {
            formErrors[input.name] = 'enter a valid 10 digit mobile number';
            console.log("formErrors",formErrors);
        } else {
            delete formErrors[input.name];
        }
    }

    function validateEmail(event) {
        const input = event.target;
        const email = input.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formErrors[input.name] = 'enter a valid email address';
        } else {
            delete formErrors[input.name];
        }
    }

    function isProfileEdited() {
        const formDataObjInEdit = Object.fromEntries(new FormData(formElement).entries());
        isUpdateProfileButtonDisabled = Object.keys(formDataObjInEdit).every(
            key => formDataObjInEdit[key] == String(data.userProfile[key])
        );
    }
</script>

<h2 class="font-Manrope">user profile</h2>

<form method="POST" action="?/updateUserProfile" use:enhance={handleSubmit} bind:this={formElement} enctype="multipart/form-data" oninput={isProfileEdited}>

    <div class="flex flex-col items-center p-5">
        <img src="/images/pgProfile.png" alt="" class="border border-pg-sky rounded-full shadow-xl w-[150px] h-[150px] mb-4"/>
    </div>

    <div class="border-3 border-pg-sky-light {editingProfile ? "has-[:focus]:border-pg-sky" : "shadow-md"} rounded-full h-16 mb-6 flex items-center px-6 relative">
        <label for="name" class="absolute bottom-12 text-xl">name<span class="text-red-500 {!editingProfile ? 'hidden' : ''}">*</span></label>
        <input class="w-full font-Manrope text-pg-sky-text text-lg border-none focus:ring-0 p-0"
            readonly={!editingProfile} name="name" bind:this={userName} value={data.userProfile.name} type="text">
    </div>

    <div class="border-3 border-pg-sky-light
        {editingProfile ? (formErrors?.email ? "has-[:focus]:border-pg-red-button" : "has-[:focus]:border-pg-sky") : "shadow-xl"}
        rounded-full h-16 {formErrors?.email ? "mb-1" : "mb-6"} flex items-center px-6 relative">
        <label for="email" class="absolute bottom-12 text-xl">email<span class="text-red-500 {!editingProfile ? 'hidden' : ''}">*</span></label>
        <input class="w-full font-Manrope text-pg-sky-text text-lg border-none focus:ring-0 p-0"
            readonly={!editingProfile} name="email" value={data.userProfile.email} type="email"
            oninput={validateEmail}>
    </div>
    <span class="text-pg-red text-sm {formErrors?.email ? "mb-8" : "hidden"} px-6">{formErrors?.email}</span>
    
    <div class="border-3 border-pg-sky-light {formErrors?.email ? "mt-4" : ""}
        {editingProfile ? (formErrors?.number ? "has-[:focus]:border-pg-red-button" : "has-[:focus]:border-pg-sky") : "shadow-xl"}
        rounded-full h-16 {formErrors?.number ? "mb-1" : "mb-6"} flex items-center px-6 relative">
        <label for="number" class="absolute bottom-12 text-xl">mobile no<span class="text-red-500 {!editingProfile ? 'hidden' : ''}">*</span></label>
        <input class="w-full font-Manrope text-pg-sky-text text-lg border-none focus:ring-0 p-0" 
            readonly={!editingProfile} name="number" value={data.userProfile.number} type="number"
            oninput={validateMobileNumber}
            onwheel={(e) => e.target.blur()}
            onkeydown={(e) => { preventKeyPress(e, ['e', ' ', '+', '-', '.'])}}>
    </div>
    <span class="text-pg-red text-sm {formErrors?.number ? "mb-8" : "hidden"} px-6">{formErrors?.number}</span>

    <div class="border-3 border-pg-sky-light {formErrors?.number ? "mt-4" : ""}
        {editingProfile ? (formErrors?.emergencyContact ? "has-[:focus]:border-pg-red-button" : "has-[:focus]:border-pg-sky") : "shadow-xl"}
        rounded-full h-16 {formErrors?.emergencyContact ? "mb-1" : "mb-6"} flex items-center px-6 relative">
        <label for="emergencyContact" class="absolute bottom-12 text-xl">emergency contact no<span class="text-red-500 {!editingProfile ? 'hidden' : ''}">*</span></label>
        <input class="w-full font-Manrope text-pg-sky-text text-lg border-none focus:ring-0 p-0"
            readonly={!editingProfile} name="emergencyContact" value={data.userProfile.emergencyContact} type="number"
            oninput={validateMobileNumber}
            onwheel={(e) => e.target.blur()}
            onkeydown={(e) => { preventKeyPress(e, ['e', ' ', '+', '-', '.'])}}>
    </div>
    <span class="text-pg-red text-sm {formErrors?.emergencyContact ? "mb-6" : "hidden"} px-6">{formErrors?.emergencyContact}</span>
    
    <button class="mt-5 pg-sky-button w-full flex items-center justify-center gap-1 cursor-pointer"
        type={!editingProfile ? "notbutton" : "button"}
        disabled={editingProfile && isUpdateProfileButtonDisabled || formHasErrors}
        onclick={() => {
            editingProfile = !editingProfile
            tick().then(() => {userName?.focus()});
            }}>
        <div>{editingProfile ? "update" : "edit"} profile</div> 
        <img src="/icons/edit.svg" class="{editingProfile ? "hidden" : ""}" alt="edit Icon"/>
    </button>
</form>

<style>
    label {
        background: #FFFFFF;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%);
    }
</style>