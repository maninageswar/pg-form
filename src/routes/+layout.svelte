<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	
	let { children } = $props();
</script>

<SvelteToast options={{ reversed: false, intro: { y: -200 } }}/>

<div class="mx-auto px-5 pt-10 w-full max-w-[390px] min-h-screen border border-pg-sky">
  {@render children()}
</div>


<style>
  :root {
    --toastContainerLeft: calc(50vw - 11rem);
	--toastWidth: 22rem;
	--toastBorderRadius: 0.375rem;
	--toastBackground: #ffffffff;
  }
</style>