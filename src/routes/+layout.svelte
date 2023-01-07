<script>
	import '@kidonng/daisyui/index.css';
	import '../app.css';
	import Preflights from './Preflights.svelte';
</script>

<Preflights />

<div class="bg-white text-dark dark:bg-dark dark:text-white">
	<slot />
</div>
