export type Service = {
  title: string;
  description: string;
  items: string[];
  icon: string;
};

export const services: Service[] = [
  {
    title: 'Desenvolvimento Web Sob Medida',
    description:
      'Criamos soluções robustas adaptadas à realidade do seu negócio, com foco em performance, escalabilidade e facilidade de uso.',
    items: [
      'Sistemas de gestão personalizados',
      'Plataformas web completas',
      'Integrações com APIs externas',
      'Painéis administrativos',
    ],
    icon: 'Monitor',
  },
  {
    title: 'Landing Pages de Alta Conversão',
    description:
      'Páginas focadas em conversão para campanhas de marketing digital, captação de leads e divulgação de produtos ou serviços.',
    items: [
      'Páginas de captura de leads',
      'Páginas de vendas',
      'Páginas de lançamento',
      'Otimização de conversão',
    ],
    icon: 'Globe',
  },
  {
    title: 'Automação de Processos Empresariais',
    description:
      'Automatizamos tarefas repetitivas e fluxos de trabalho para reduzir trabalho manual e aumentar a produtividade da sua equipe.',
    items: [
      'Automação de e-mails e notificações',
      'Fluxos de trabalho digitais',
      'Integração entre sistemas',
      'Eliminação de retrabalho',
    ],
    icon: 'Workflow',
  },
  {
    title: 'BI e Dashboards Interativos',
    description:
      'Painéis e relatórios personalizados para acompanhar indicadores de desempenho e apoiar decisões estratégicas em tempo real.',
    items: [
      'Dashboards interativos',
      'Relatórios personalizados',
      'Análise de dados avançada',
      'KPIs em tempo real',
    ],
    icon: 'BarChart2',
  },
];
