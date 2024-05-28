<script lang="ts">
	import WorkflowBuilder from '$lib/components/ui/workflowBuilder';
	import { Greet } from '$lib/wailsjs/go/main/App';

	let text = $state('');

	Greet('Vite').then((res) => {
		text = res;
	});
</script>

<div class="p-4">
	<h1 class="text-indigo-700 font-bold text-lg">{text}</h1>

	<WorkflowBuilder />
</div>
