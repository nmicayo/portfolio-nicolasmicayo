export type TechGroup = {
  title: string;
  items: string[];
};

export const technologies: TechGroup[] = [
  {
    title: 'Desenvolvimento Web',
    items: ['Astro', 'SvelteKit 5', 'Svelte 5', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui'],
  },
  {
    title: 'Backend e Dados',
    items: ['Bun', 'Node.js', 'PostgreSQL', 'Kysely', 'Python'],
  },
  {
    title: 'BI e Dados',
    items: ['Power BI', 'D3.js', 'LayerChart', 'Excel'],
  },
  {
    title: 'Automação e Ferramentas',
    items: ['Puppeteer', 'n8n', 'Docker', 'Atlas', 'Better Auth'],
  },
  {
    title: 'Sistemas e Processos',
    items: ['Dokploy', 'Docker Compose', 'Vite', 'ESLint', 'Prettier'],
  },
];
