<script lang="ts">
	import { Greet } from "$lib/wailsjs/go/main/App";

  let text = $state("")

  Greet("Vite").then((res) => {
    text = res
  })
</script>

<h1>{text}</h1>
