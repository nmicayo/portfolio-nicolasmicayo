export type Project = {
  title: string;
  category: string;
  description: string;
  problem: string;
  tools: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: 'Phenyx Core',
    category: 'CRM & Vendas',
    description:
      'Sistema de growth e gestão de leads com funil de vendas personalizado para o nicho de energia fotovoltaica — da captação ao fechamento.',
    problem:
      'Empresas de energia solar perdiam leads por falta de acompanhamento estruturado. O sistema organiza o funil de vendas e o relacionamento com prospects de forma centralizada.',
    tools: ['SvelteKit 5', 'TypeScript', 'PostgreSQL', 'Kysely', 'Better Auth', 'Bun', 'Docker', 'Tailwind CSS v4'],
  },
  {
    title: 'Phenyx Welcome',
    category: 'Dashboard & BI',
    description:
      'Sistema interno de analytics para logística que integra com o SSW — monitora CTRCs, performance de entregas, saúde financeira e inteligência comercial em tempo real.',
    problem:
      'Gestores precisavam consultar o SSW manualmente para cada relatório. O sistema centraliza métricas operacionais, financeiras e comerciais com scraping automatizado.',
    tools: ['SvelteKit 5', 'TypeScript', 'PostgreSQL', 'Kysely', 'Puppeteer', 'D3.js', 'Better Auth', 'Bun', 'Docker'],
  },
  {
    title: 'AppCar JN',
    category: 'Sistema SaaS',
    description:
      'Sistema SaaS de gestão de manutenção veicular para frotas — controla manutenções preventivas e corretivas, alertas, custos e planos por veículo com suporte multi-organização.',
    problem:
      'Gestores de frota não tinham visibilidade centralizada das manutenções, resultando em custos imprevistos e veículos parados por falta de controle preventivo.',
    tools: ['SvelteKit 5', 'TypeScript', 'PostgreSQL', 'Kysely', 'Better Auth', 'Bun', 'Docker', 'Tailwind CSS v4'],
  },
  {
    title: 'Inventory JN',
    category: 'Sistema Interno',
    description:
      'Sistema web de gestão de inventário de ativos corporativos — rastreamento, atribuição a colaboradores, histórico de movimentações e auditoria completa com suporte multi-organização.',
    problem:
      'Empresas perdem controle do patrimônio por falta de rastreabilidade. O sistema centraliza ativos, atribuições e manutenções com histórico auditável.',
    tools: ['SvelteKit 5', 'TypeScript', 'PostgreSQL', 'Kysely', 'Better Auth', 'Bun', 'Docker', 'Tailwind CSS v4'],
  },
  {
    title: 'Game Bar JN',
    category: 'Integração de API',
    description:
      'Plataforma web que integra a API da Steam para centralizar biblioteca de jogos, conquistas, amigos e notícias em um único dashboard personalizado por usuário.',
    problem:
      'Dados de jogos e conquistas ficam espalhados pela Steam sem visão consolidada. O Game Bar JN centraliza tudo com roadmaps de conquistas e organização por gêneros.',
    tools: ['SvelteKit 5', 'TypeScript', 'PostgreSQL', 'Kysely', 'Steam API', 'Better Auth', 'Bun', 'Docker', 'Tailwind CSS v4'],
  },
];
