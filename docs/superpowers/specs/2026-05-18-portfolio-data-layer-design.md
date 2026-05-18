# Spec — Camada de Dados: Portfólio Nicolas Botelho

**Data:** 2026-05-18
**Versão:** 1.0
**Status:** Aprovado
**Contexto:** Complementa `2026-05-18-portfolio-nicolas-botelho-design.md`

---

## Objetivo

Definir a arquitetura da camada de dados (`src/data/`) para que:
- O site seja construído com dados genéricos agora
- A troca para dados reais seja feita editando apenas arquivos `.ts`, sem tocar em componentes
- Erros de formato sejam capturados em build-time pelo TypeScript

---

## Estrutura de arquivos

```
src/data/
  links.ts          → objeto com 4 URLs de contato
  projects.ts       → tipo Project + array com 5 projetos
  services.ts       → tipo Service + array com 4 serviços
  technologies.ts   → tipo TechGroup + array com 5 grupos
  index.ts          → re-exporta tudo (único ponto de importação)
```

---

## Regra de importação

Componentes importam **apenas** de `../data` (nunca direto de `../data/projects`, etc.):

```ts
import { projects, services, technologies, links } from '../data';
import type { Project } from '../data';
```

Se um arquivo de dados for movido ou renomeado, apenas `index.ts` muda.

---

## `src/data/index.ts`

```ts
export { projects } from './projects';
export { services } from './services';
export { technologies } from './technologies';
export { links } from './links';
export type { Project } from './projects';
export type { Service } from './services';
export type { TechGroup } from './technologies';
```

---

## Tipos

### `projects.ts`

```ts
export type Project = {
  title: string;
  category: string;
  description: string;
  problem: string;
  tools: string[];
  link?: string;
};
```

Sem campo `status` — listagem simples, sem badge de estado.

### `services.ts`

```ts
export type Service = {
  title: string;
  description: string;
  items: string[];
  icon: string; // nome do ícone lucide-svelte
};
```

### `technologies.ts`

```ts
export type TechGroup = {
  title: string;
  items: string[];
};
```

### `links.ts`

```ts
export type Links = {
  whatsapp: string;
  whatsappCurriculo: string;
  linkedin: string;
  github: string;
};
```

---

## Dados genéricos de partida

Cada arquivo começa com placeholders marcados com `// EDITE AQUI`. Para substituir pelos dados reais: abrir o arquivo do domínio, buscar `EDITE AQUI`, substituir os valores.

### `links.ts` — preencher com dados reais imediatamente

```ts
export const links = {
  whatsapp: 'https://wa.me/SEU_NUMERO',                                      // EDITE AQUI
  whatsappCurriculo: 'https://wa.me/SEU_NUMERO?text=Olá%20Nicolas%2C%20gostaria%20de%20receber%20seu%20currículo.', // EDITE AQUI
  linkedin: 'https://linkedin.com/in/SEU_PERFIL',                            // EDITE AQUI
  github: 'https://github.com/SEU_USUARIO',                                  // EDITE AQUI
};
```

### `projects.ts` — 5 projetos genéricos

```ts
export const projects: Project[] = [
  {
    title: 'Projeto Um',
    category: 'Automação',
    description: 'Descrição breve do projeto e seu contexto.',
    problem: 'Problema que este projeto resolve.',
    tools: ['Python', 'Excel'],
    // link: 'https://...',
  },
  {
    title: 'Projeto Dois',
    category: 'Dashboard',
    description: 'Descrição breve do projeto e seu contexto.',
    problem: 'Problema que este projeto resolve.',
    tools: ['Power BI', 'SQL'],
  },
  {
    title: 'Projeto Três',
    category: 'Sistema Interno',
    description: 'Descrição breve do projeto e seu contexto.',
    problem: 'Problema que este projeto resolve.',
    tools: ['Node.js', 'PostgreSQL'],
  },
  {
    title: 'Projeto Quatro',
    category: 'Integração',
    description: 'Descrição breve do projeto e seu contexto.',
    problem: 'Problema que este projeto resolve.',
    tools: ['n8n', 'API REST'],
  },
  {
    title: 'Projeto Cinco',
    category: 'Web',
    description: 'Descrição breve do projeto e seu contexto.',
    problem: 'Problema que este projeto resolve.',
    tools: ['Astro', 'Svelte', 'TypeScript'],
    link: 'https://exemplo.com',
  },
];
```

### `services.ts` — 4 serviços genéricos

```ts
export const services: Service[] = [
  {
    title: 'Sites e Landing Pages',        // EDITE AQUI
    description: 'Descrição do serviço.',  // EDITE AQUI
    items: ['Entregável 1', 'Entregável 2', 'Entregável 3'],  // EDITE AQUI
    icon: 'Globe',
  },
  {
    title: 'Sistemas Internos',
    description: 'Descrição do serviço.',
    items: ['Entregável 1', 'Entregável 2', 'Entregável 3'],
    icon: 'LayoutDashboard',
  },
  {
    title: 'Automações e Integrações',
    description: 'Descrição do serviço.',
    items: ['Entregável 1', 'Entregável 2', 'Entregável 3'],
    icon: 'Workflow',
  },
  {
    title: 'Dashboards e Dados',
    description: 'Descrição do serviço.',
    items: ['Entregável 1', 'Entregável 2', 'Entregável 3'],
    icon: 'Database',
  },
];
```

### `technologies.ts` — grupos reais, itens substituíveis

```ts
export const technologies: TechGroup[] = [
  { title: 'Desenvolvimento Web',     items: ['Astro', 'Svelte', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Backend e Dados',         items: ['Node.js', 'PostgreSQL', 'Python'] },
  { title: 'BI e Dados',              items: ['Power BI', 'Excel'] },
  { title: 'Automação e Ferramentas', items: ['n8n', 'Zapier'] },
  { title: 'Sistemas e Processos',    items: ['ERP', 'CRM'] },
];
```

---

## Estratégia de manutenção

| Ação | O que editar |
|---|---|
| Novo projeto | Adicionar objeto ao array em `projects.ts` |
| Remover projeto | Remover objeto do array em `projects.ts` |
| Nova tecnologia | Adicionar string ao `items` do grupo em `technologies.ts` |
| Novo grupo de tecnologias | Adicionar objeto ao array em `technologies.ts` |
| Atualizar link/contato | Editar valor em `links.ts` |
| Novo serviço | Adicionar objeto ao array em `services.ts` |

Nenhum componente precisa ser modificado em nenhum desses casos.

---

## Validação em build-time

TypeScript com `strict: true`. Se um campo obrigatório estiver faltando ou com tipo errado, `bun run build` falha com erro explícito antes de publicar.

---

## O que este spec não cobre

- Conteúdo real dos projetos e serviços (a ser preenchido pelo usuário)
- Estrutura dos componentes (coberta em `2026-05-18-portfolio-nicolas-botelho-design.md`)
- Plano de execução (coberto em `2026-05-18-portfolio-plano-implementacao.md`)
