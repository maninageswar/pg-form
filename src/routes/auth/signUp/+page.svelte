<script>
    let showPassword = false;
    
    function togglePassword() {
        showPassword = !showPassword;
    }
</script>

<div class="flex flex-col justify-center items-center mb-5">
    <img src="/images/hostelRegister.jpeg" alt="">
    <h2 class="font-Manrope text-center font-bold text-[28px]">find your next home that meets your needs</h2>
</div>

<label for="email">email</label>
<input class="w-full mt-1 mb-4 border border-pg-sky rounded-md" name="email" type="email" placeholder="enter your email">

<label for="password">password</label>
<div class="relative">
    <input 
        class="w-full mt-1 mb-4 border border-pg-sky rounded-md pr-10" 
        name="password" 
        type={showPassword ? "text" : "password"} 
        placeholder="enter your password"
    >
    <button 
        type="button"
        class="absolute right-3 top-1/4" 
        onclick={()=>togglePassword()}
    >
        {#if showPassword}
            <img src="/icons/eyeOff.svg" class="w-5 h-5" alt="hide password">
        {:else}
            <img src="/icons/eye.svg" class="w-5 h-5" alt="show password">
        {/if}
    </button>
</div>

<label for="confirmPassword">confirm password</label>
<input class="w-full mt-1 mb-4 border border-pg-sky rounded-md" name="confirmPassword" type="text" placeholder="confirm your password">

<button class="pg-sky-button w-full mt-4">sign up</button>


<div class="flex items-center gap-4 py-8">
    <hr class="flex-1 border-t border-pg-sky-button-disabled"/>
    <p class="text-pg-sky-button-disabled">or</p>
    <hr class="flex-1 border-t border-pg-sky-button-disabled"/>
</div>

<button class="border border-pg-sky px-4 py-2 text-pg-sky rounded-md w-full flex justify-center items-center">
    <img src="/icons/google.svg" class="w-5 h-5 mr-3" alt="">
    <p class="text-transparent bg-clip-text bg-[linear-gradient(to_right,#4285F4_0%,#EA4335_25%,#FBBC05_50%,#34A853_75%,#4285F4_100%)]">
        sign up with google
    </p>
</button>

<p class="pt-8 text-center text-sm font-normal leading-normal text-slate-500">
    already have an account?
    <a class="font-bold text-pg-sky underline" href="/auth/login">login</a>
</p>
