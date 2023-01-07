<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { currentUser, pb } from '$lib/scripts/utils/pocketbase';

	/**
	 * @type {string}
	 */
	let username;
	/**
	 * @type {string}
	 */
	let password;
	let newMessage = '';

	const REDIRECT_URL = 'http://localhost:3000' + '/googleRedirect';

	async function login() {
		await pb.collection('users').authWithPassword(username, password);
	}

	async function signUp() {
		try {
			const data = {
				username,
				password,
				passwordConfirm: password,
				name: 'hi mom!'
			};

			const createdUser = await pb.collection('users').create(data);
			await login();
		} catch (err) {
			console.error(err);
		}
	}

	const logout = () => {
		pb.authStore.clear();
	};

	const googleLogin = async () => {
		await pb
			.collection('users')
			.listAuthMethods()
			.then((result) => {
				const googleProvider = result.authProviders.find((provider) => provider.name === 'google');
				const googleRedirect = googleProvider ? googleProvider.authUrl : null;
				if (googleRedirect !== null) {
					if (browser) {
						window.localStorage.setItem('googleProvider', JSON.stringify(googleProvider));
						window.location.replace(googleRedirect + REDIRECT_URL);
					}
				}
			});
	};

	const sendMessage = async () => {
		const data = {
			text: newMessage,
			user: $currentUser?.id
		};

		await pb.collection('messages').create(data);
		newMessage = '';
	};

	/**
	 * @type {any[]}
	 */
	let messages = [];
	/**
	 * @type {() => void}
	 */
	let unsubscribe;

	onMount(async () => {
		//Get initial messages
		const resultList = await pb.collection('messages').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		});
		messages = resultList.items;

		// Subscript to realtime messages
		try {
			unsubscribe = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
				if (action === 'create') {
					const user = await pb.collection('users').getOne(record.user);
					record.expand = { user };
					messages = [...messages, record];
				}
				if (action === 'delete') {
					messages = messages.filter((m) => m.id !== record.id);
				}
			});
		} catch (err) {
			// @ts-ignore
			console.log('Error message:', err.originalError);
		}
	});

	onDestroy(() => {
		unsubscribe?.();
	});
</script>

<div class="flex flex-col justify-center">
	<div class="text-20 font-bold font-sans">POCKETCHAT</div>

	{#if $currentUser}
		<form class="flex justify-center" on:submit|preventDefault={logout}>
			<button class="btn" type="submit">Logout</button>
		</form>
	{:else}
		<form on:submit|preventDefault>
			<input placeholder="Username" type="text" bind:value={username} />

			<input placeholder="Password" type="password" bind:value={password} />

			<button on:click={signUp} class="btn">Sign Up</button>
			<button on:click={login} class="btn">Login</button>
		</form>

		<form class="flex justify-center" on:submit|preventDefault={googleLogin}>
			<button class="btn" type="submit">Login with Google</button>
		</form>
	{/if}

	<div class="flex flex-col items-center justify-center gap-10 p-5">
		{#each messages as message (message.id)}
			<div class="flex flex-col items-center justify-center">
				<img
					class="avatar"
					src={`https://avatars.dicebear.com/api/adventurer/${message.expand?.user?.username}.svg`}
					alt="avatar"
					width="40px"
				/>
				<div>{message.text}</div>
			</div>
		{/each}
	</div>

	{#if $currentUser}
		<div class="flex justify-center gap-10">
			<form on:submit|preventDefault={sendMessage} class="flex flex-row flex-nowrap gap-5">
				<input
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
					bind:value={newMessage}
				/>
				<button type="submit" class="btn">Submit</button>
			</form>
		</div>
	{/if}
</div>
