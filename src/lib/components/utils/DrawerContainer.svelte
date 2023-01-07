<script>
	import { navigating } from '$app/stores';

	let x = false;
	$: if ($navigating) x = false;
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={x} />
	<div class="drawer-content">
		<slot name="main">
			<span class="missing">Unknown name</span>
		</slot>
	</div>
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<slot name="drawer-content">
			<span class="missing">Unknown drawer content</span>
		</slot>
	</div>
</div>
