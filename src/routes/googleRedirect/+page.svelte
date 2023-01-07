<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { pb } from '$lib/scripts/utils/pocketbase';

	const REDIRECT_URL = 'http://localhost:3000' + '/googleRedirect';

	const code = $page.url.searchParams.get('code') ?? '';

	async function googleToDB() {
		if (browser) {
			let googleProvider = JSON.parse(window.localStorage.getItem('googleProvider') ?? '');
			await pb
				.collection('users')
				.authWithOAuth2(googleProvider.name, code, googleProvider.codeVerifier, REDIRECT_URL, {
					name: 'test123'
				})
				.then(() => {
					window.localStorage.removeItem('googleProvider');
					window.location.replace('/');
				})
				.catch((err) => console.log(err));
		}
	}

	onMount(() => {
		googleToDB();
	});
</script>

<div class="flex justify-center items-center min-h-screen max-w-screen">
	<div>Logging in</div>
</div>
