<script>
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="mx-auto w-full max-w-[390px] min-h-screen ">
  {@render children()}
</div>
