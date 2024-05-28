<script lang="ts">
	import { MessageCircle, Moon, Sun } from 'lucide-svelte';
	import '../app.css';
	import Theme from '$lib/store/theme-store.svelte';
	import * as Menubar from '$lib/components/ui/menubar';

	const theme = new Theme();
</script>

<div>
	<header
		class="p-4 border-b flex justify-between items-center sticky top-0 bg-background/20 backdrop-blur-xl z-10"
	>
		<a
			class="bg-gradient-to-r from-indigo-500 to-teal-400 font-mono text-lg text-transparent bg-clip-text cursor-pointer"
			href="/"
		>
			Supalama
		</a>
		<Menubar.Root class="w-fit">
			<Menubar.Menu>
				<Menubar.Item>
          <MessageCircle size={14} class="mr-2" />
          Chat
        </Menubar.Item>
			</Menubar.Menu>
			<button on:click={theme.toggle} class="border-l pl-3 pr-2">
        {#if theme.current === 'dark'}
          <Sun size={16} />
        {:else}
          <Moon size={16} />
        {/if}
      </button>
		</Menubar.Root>
	</header>

	<slot />
</div>
