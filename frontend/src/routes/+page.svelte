<script lang="ts">
	import { Greet } from "$lib/wailsjs/go/main/App";

  let text = $state("")

  Greet("Vite").then((res) => {
    text = res
  })
</script>

<h1 class="text-indigo-700 font-bold text-lg">{text}</h1>
