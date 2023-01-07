<script>
	const toggleDark = () => {
		let isDark = window.document.documentElement.classList.contains('dark');
		if (isDark) {
			window.localStorage.setItem('dark', 'false');
			window.document.documentElement.classList.remove('dark');
			window.document.documentElement.setAttribute('style', 'color-scheme: light');
		} else {
			window.localStorage.setItem('dark', 'true');
			window.document.documentElement.classList.add('dark');
			window.document.documentElement.setAttribute('style', 'color-scheme: dark;');
		}
	};
</script>

<button
	class="fixed top-1 right-1 p-2 text-lg opacity-75 hover:opacity-100"
	on:click={() => toggleDark()}
>
	<span class="dark:i-carbon-moon i-carbon-sun" />
</button>
