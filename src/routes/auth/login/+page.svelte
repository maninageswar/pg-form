<script>
    import { success, failure } from '$lib/notification';

    let { data, form } = $props();

    let showPassword = $state(false);
    
    function togglePassword() {
        showPassword = !showPassword;
    }

    $effect(()=>{
        if (data?.accountCreated) {
            success('your account has been created successfully. please login to continue');
        }
    })

</script>

<div class="flex flex-col justify-center items-center mb-5">
    <img src="/images/hostelRegister.jpeg" alt="">
    <h2 class="font-Manrope text-center font-bold text-[28px]">home is just a click away let's get you there</h2>
</div>

<label for="email">email<span class="text-red-500">*</span></label>
<input class="w-full mt-1 mb-4 border border-pg-sky rounded-md" name="email" id="email" type="email" placeholder="enter your email">

<label for="password">password<span class="text-red-500">*</span></label>
<div class="relative">
    <input 
        class="w-full mt-1 mb-4 border border-pg-sky rounded-md pr-10" 
        name="password"
        id="password"
        type={showPassword ? "text" : "password"} 
        placeholder="enter your password"
    >
    <button 
        type="button"
        class="absolute right-3 top-1/4" 
        onclick={()=>togglePassword()}
    >
        {#if !showPassword}
            <img src="/icons/eyeOff.svg" class="w-5 h-5" alt="hide password">
        {:else}
            <img src="/icons/eye.svg" class="w-5 h-5" alt="show password">
        {/if}
    </button>
</div>

<button class="pg-sky-button w-full mt-4">login</button>


<div class="flex items-center gap-4 py-8">
    <hr class="flex-1 border-t border-pg-sky-button-disabled"/>
    <p class="text-pg-sky-button-disabled">or</p>
    <hr class="flex-1 border-t border-pg-sky-button-disabled"/>
</div>

<button class="border border-pg-sky px-4 py-2 text-pg-sky rounded-md w-full flex justify-center items-center">
    <img src="/icons/google.svg" class="w-5 h-5 mr-3" alt="">
    <p class="text-transparent bg-clip-text bg-[linear-gradient(to_right,#4285F4_0%,#EA4335_25%,#FBBC05_50%,#34A853_75%,#4285F4_100%)]">
        login in with google
    </p>
</button>

<p class="pt-8 text-center text-sm font-normal leading-normal text-slate-500">
    don't have an account?
    <a class="font-bold text-pg-sky underline" href="/auth/signUp">sign up</a>
</p>

<button class="pg-sky-button" onclick={()=>{success('testing the color or success notification')}}>test</button>