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
                  label: 'Présentation',
                  items: [
                      { label: "Présentation de l'UE", slug: 'presentation/presentation' },
                  ],
              },
              {
                  label: 'laboratoires',
                  items: [
                    { label: 'Labo 1 & 2 - Modèle clé-valeur', slug: 'laboratoires/redis'},
                    { label: 'Labo 3 & 4- Modèle graph', slug: 'laboratoires/neo4j'},
                    { label: 'Labo 5 & 6 - Modèle document', slug: 'laboratoires/mongodb'},
                  ],
              },
              {
                  label: 'Théorie',
                  autogenerate: { directory: 'theorie' },
              },
                            {
                  label: 'Guides',
                  items: [
                      { label: 'Guide du rédacteur', slug: 'guides/example' },
                  ],
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});