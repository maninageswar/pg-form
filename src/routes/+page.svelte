<script>
  import { goto } from "$app/navigation";

  let { data } = $props();

</script>

<h1>home page</h1>
<button class="mt-5 bg-pg-sky text-white px-4 py-2 rounded-md float-right" onclick={goto("/pgform")}>create inventory</button>
<br>

{#each data.pgInventories.items as pgInventory}
  <button class="mt-5 bg-pg-sky text-white" onclick={goto(`/pgProperty/${pgInventory.pgName}`)}>{pgInventory.pgName}</button><br>
{/each}
