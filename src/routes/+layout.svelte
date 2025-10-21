<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import { page } from '$app/state';
	
	let { children } = $props();
	let focus = $state()
</script>

<SvelteToast options={{ reversed: false, intro: { y: -200 } }}/>

<div class="px-5 pt-10">
	{@render children()}
</div>
<footer class="fixed bottom-0 w-full max-w-[390px] bg-white flex py-3 justify-around align-items-center shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
	<a href="/" ><img src={`/icons/home${page.url.pathname === '/' ? 'Filled' : 'Line'}.svg`} alt="home icon"/></a>
	<a href="/userInventory"><img src={`/icons/building${page.url.pathname === '/userInventory' ? 'Filled' : 'Line'}.svg`} alt="building icon"/></a>
	<a href="/userProfile"><img src={`/icons/userProfile${page.url.pathname === '/userProfile' ? 'Filled' : 'Line'}.svg`} alt="profile icon"/></a>
</footer>

<style>
  :root {
    --toastContainerLeft: calc(50vw - 11rem);
	--toastWidth: 22rem;
	--toastBorderRadius: 0.375rem;
	--toastBackground: #ffffffff;
  }
</style>