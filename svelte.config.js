import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import purgecss from '@fullhuman/postcss-purgecss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
		postcss: {
			plugins: [
				purgecss({
					content: ['./src/**/*.html', './src/**/*.svelte'],
					whitelistPatterns: [/svelte-/],
					defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
				})
			]
		}
	}),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
