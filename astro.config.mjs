// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://esibru.github.io',
  base: '/5don4dl/',
  integrations: [
      starlight({
          title: '5DON4D',
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
          sidebar: [
              {
                  label: 'Général',
                  items: [
                      { label: "Table des matières", slug: 'presentation/presentation' },
                  ],
              },
              {
                  label: 'laboratoires',
                  items: [
                    { label: 'Labo 1 & 2 - Modèle clé-valeur', slug: 'laboratoires/redis'},
                    { label: 'Labo 3 & 4- Modèle graph', slug: 'laboratoires/neo4j'},
                    { label: 'Labo 5 - Modèle document', slug: 'laboratoires/mongodb'},
                    { label: 'Labo 6 - Recherche et analyse', slug: 'laboratoires/elastic'},
                    { label: 'Labo 7, 8 & 9 - PAE (mini-projet)', slug: 'laboratoires/exercice/pae'},
                  ],
              },
              {
                label: "Projet",
                items: [
                  { label: "Énoncé", slug: 'projet/enonce' },
                ],
              },
          ],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});
