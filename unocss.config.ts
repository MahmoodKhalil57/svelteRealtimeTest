// Placed blank file here to make the latest UnoCSS VSCode extension work (v.0.45.26)
// At the moment, placing the UnoCSS config currently seen in vite.config.ts does not work from this file
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';
import presetDaisy from 'unocss-preset-daisy';

export default defineConfig({
	shortcuts: [{ logo: 'i-logos:svelte-icon w-7em h-7em transform transition-300' }],
	transformers: [transformerDirectives()],
	presets: [
		presetUno(),
		presetIcons({
			prefix: 'i-',
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}),
		presetDaisy()
	],
	theme: {
		//https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/_theme/misc.ts
		boxShadow: {
			'9xl':
				'var(--un-shadow-inset) 0 0px 25px -5px var(--un-shadow-color, rgba(0,0,0,0.1)),var(--un-shadow-inset) 0 0px 90px -6px var(--un-shadow-color, rgba(0,0,0,0.1))'
		}
	},
	safelist: ['bg-orange-300']
});
