// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sebdrobisz.github.io',
  base: '/5don4/',
  integrations: [
      starlight({
          title: '5DON4D',
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
          sidebar: [
              {
                  label: 'Guides',
                  items: [
                      // Each item here is one entry in the navigation menu.
                      { label: 'Guide du rédacteur', slug: 'guides/example' },
                  ],
              },
              {
                  label: 'laboratoires',
                  autogenerate: { directory: 'laboratoires' },
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});