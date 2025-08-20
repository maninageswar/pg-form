<script>
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="mx-auto px-5 pt-10 w-full max-w-[390px] min-h-screen border border-pg-sky">
  {@render children()}
</div>
