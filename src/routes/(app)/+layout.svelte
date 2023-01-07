<script>
	import DrawerContainer from '$lib/components/utils/DrawerContainer.svelte';
	import DrawerContent from '$lib/components/layout/DrawerContent.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<DrawerContainer>
	<div slot="main" class="flex flex-col justify-between min-h-screen max-w-screen transition">
		<Header />
		<main class="flex-grow p-10">
			<slot />
		</main>
		<Footer />
	</div>
	<DrawerContent slot="drawer-content" />
</DrawerContainer>
