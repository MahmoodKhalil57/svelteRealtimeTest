import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		UnoCSS({
			mode: 'svelte-scoped'
		}),
		sveltekit()
	],
	server: {
		cors: false
	}
};

export default config;
