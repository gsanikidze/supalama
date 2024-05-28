<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Greet } from '$lib/wailsjs/go/main/App';
	import { AArrowUp } from 'lucide-svelte';

	let text = $state('');

	Greet('Vite').then((res) => {
		text = res;
	});
</script>

<div class="p-4">
	<h1 class="text-indigo-700 font-bold text-lg">{text}</h1>

	<Input placeholder="type message" class="mt-4" />

	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
	<div class="p-2 bg-slate-400 w-fit rounded-sm mt-2">
		<AArrowUp />
	</div>
</div>
