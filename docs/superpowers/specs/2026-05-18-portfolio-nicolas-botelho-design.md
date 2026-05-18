# Design Spec — Portfólio Web Pessoal Nicolas Botelho

**Data:** 2026-05-18
**Versão:** 1.1
**Status:** Aprovado para implementação

---

## 1. Objetivo

Landing page de página única para Nicolas Botelho. Serve dois públicos com peso igual:

- **Recrutadores** — candidatura a vagas de TI/Dev
- **Clientes freelance** — contratação de serviços pontuais

O posicionamento central é: desenvolvimento, dados e automação aplicados a processos de negócio.

---

## 2. Stack

| Camada | Tecnologia |
|---|---|
| Framework | Astro |
| UI interativa | Svelte islands |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| Animações | Motion One + CSS keyframes |
| Ícones | lucide-svelte |
| Build | Vite via Astro |
| Deploy | Vercel ou Cloudflare Pages |
| Dados | Arquivos locais `.ts` |

Sem backend, autenticação, banco de dados ou CMS na V1.

### 2.1 Referências e direção técnica

- `ddaniel.dev` foi analisado como referência real de UI/UX. Stack detectada: Vue 3, Vite, Tailwind CSS, CSS keyframes, `vue3-carousel`, toast e efeito WebGL/canvas provavelmente com OGL.
- O link do Dribbble foi tratado como referência visual de portfolio/CV/resume; o conteúdo direto ficou bloqueado por AWS WAF, então a extração detalhada depende de screenshot do mockup.
- Decisão final para este projeto: usar Astro como base estática, Svelte apenas para ilhas interativas, Tailwind para layout/tema e Motion One para microinterações e entradas em viewport.
- Evitar UI kit pesado. A identidade deve vir de layout, tipografia, espaçamento, paleta e microinterações próprias.

---

## 3. Identidade Visual

### Paleta de cores

| Token | Valor | Uso |
|---|---|---|
| `--bg-primary` | `#111727` | Fundo principal |
| `--bg-secondary` | `#1A2236` | Cards, seções alternadas |
| `--bg-footer` | `#0D1120` | Footer |
| `--accent-teal` | `#00D4A8` | Destaques, bordas ativas, ícones |
| `--accent-cyan` | `#06B6D4` | Gradientes, badges secundários |
| `--accent-lime` | `#89FF69` | Detalhes terminal/neon inspirados no `ddaniel.dev` |
| `--accent-yellow` | `#F2FF5B` | Realces pontuais, nunca como cor dominante |
| `--text-primary` | `#F8FAFC` | Títulos, textos principais |
| `--text-secondary` | `#94A3B8` | Descrições, textos de apoio |
| `--border` | `#1E2D40` | Bordas padrão de cards |

Referências visuais: portfólio escuro com acento teal vibrante (imagem de referência Rakib Hassan fornecida pelo cliente), atmosfera terminal/neon seletiva do `ddaniel.dev` e direção CV/resume do shot do Dribbble.

### Tipografia

- Fonte principal: **Inter** (Google Fonts)
- Fonte mono: **JetBrains Mono** (Google Fonts) — usada em labels de seção e badges técnicos
- Pesos usados: 400 (body), 600 (subtítulos), 700/800 (títulos hero)

### Estilo geral

- Cards com `rounded-xl`, `border border-[#1E2D40]`
- Sombras leves em hover: `shadow-teal-500/10`
- Gradiente radial teal muito sutil como decoração de fundo no Hero e Contato
- Backgrounds alternando entre `#111727` e `#1A2236` entre seções para criar ritmo visual
- Detalhes terminal/neon devem ser usados como acento, não como tema completo: labels mono, cursor do typewriter, pequenos highlights lime/yellow e efeitos de brilho moderados

---

## 4. Animações

Nível **moderado**:

- **Hero:** efeito typewriter na headline (alterna entre 4 frases)
- **Badges do hero:** animação CSS `float` leve (keyframe sobe/desce suavemente)
- **Seções:** fade-in via Motion One `inView` ao entrar no viewport
- **Cards:** hover com `translateY(-4px)` + acende borda teal
- **Projetos:** expansão com `transition:slide` nativo do Svelte
- **Tecnologias:** fade-in escalonado nos badges ao entrar na viewport
- **Scroll:** `scroll-behavior: smooth` entre âncoras

Evitar: partículas, parallax pesado e WebGL obrigatório. Cursor trail/canvas estilo `ddaniel.dev` fica fora da V1, a menos que seja aprovado explicitamente depois.

---

## 5. Arquitetura de Componentes

```
src/
  components/
    Header.svelte          → fixo, blur, hambúrguer mobile
    Hero.svelte            → duas colunas, typewriter, badges
    About.svelte           → texto + lista de pontos
    ProblemCards.svelte    → 4 cards com ícones
    Services.svelte        → 4 cards com número decorativo
    Projects.svelte        → accordion de 5 projetos
    TechStack.svelte       → grupos de badges
    Experience.svelte      → texto + linha do tempo lateral
    Contact.svelte         → CTA final + 4 botões
    Footer.svelte          → linha mínima
    SectionTitle.svelte    → componente reutilizável de título
    ProjectCard.svelte     → card expansível individual
    ServiceCard.svelte     → card de serviço individual
  data/
    projects.ts            → 5 projetos tipados
    services.ts            → 4 serviços tipados
    technologies.ts        → grupos de tecnologias
    links.ts               → WhatsApp, LinkedIn, GitHub, WhatsApp currículo
  layouts/
    BaseLayout.astro       → meta tags SEO, fonte, CSS global
  lib/
    actions/
      reveal.ts            → action Svelte usando Motion One inView
  pages/
    index.astro            → monta todas as seções e aplica hidratação pontual
  styles/
    global.css             → variáveis CSS da paleta + reset
public/
  favicon.png
  og-image.png             → imagem para Open Graph
```

Diretriz de hidratação Astro:
- `Header.svelte`, `Hero.svelte` e `Projects.svelte` usam `client:load`, pois dependem de estado/interação imediatamente.
- Seções com animação de entrada podem usar `client:visible` quando dependerem de Motion One.
- Componentes puramente estáticos devem renderizar sem hidratação sempre que possível.

---

## 6. Design das Seções

### 6.1 Header

- Posição: `fixed top-0`, z-index alto
- Fundo: `#111727` com `backdrop-blur-md` e opacidade 80%
- Altura: `64px`
- Esquerda: nome "Nicolas Botelho" em teal, fonte peso 700
- Direita: links de navegação com hover underline animado + botão "Falar comigo" (borda teal, hover preenche)
- Mobile: ícone hambúrguer → menu overlay full-screen com links centralizados, animação slide-down, fecha ao clicar em link

Links de navegação: Início · Sobre · Serviços · Projetos · Tecnologias · Contato

### 6.2 Hero

Layout duas colunas no desktop, uma coluna no mobile.

**Coluna esquerda:**
- Label mono acima: `[ Desenvolvimento · Dados · Automação ]` em teal
- Nome `Nicolas Botelho` — branco, peso 800, ~`text-5xl`
- Headline com typewriter em teal: alterna entre:
  - `"Desenvolvimento web"`
  - `"Automação de processos"`
  - `"Dashboards & BI"`
  - `"Sistemas internos"`
- Descrição 2 linhas em `#94A3B8`
- Botões: **"Ver projetos"** (fundo teal sólido) + **"Falar no WhatsApp"** (borda branca)

**Coluna direita:**
- Grid 2×3 de 6 badges flutuantes com animação float CSS
- Cada badge: borda teal, fundo `#1A2236`, ícone lucide + texto
- Badges: `Sistemas internos`, `Automação`, `Power BI`, `Front-end`, `Processos`, `Dados`

Background: gradiente radial teal em `opacity-10` no canto superior direito.

### 6.3 Sobre

Background `#111727`. Layout duas colunas desktop.

- Esquerda: `SectionTitle` + dois parágrafos em `#94A3B8`
- Direita: bloco com `border-l-4 border-teal`, fundo `#1A2236`, lista de 8 pontos com bullet `•` teal

### 6.4 O que eu resolvo

Background `#1A2236`. Grid 2×2 desktop, 1 coluna mobile.

4 cards com:
- Ícone lucide grande em teal
- Título em branco, peso 600
- Descrição em `#94A3B8`
- Borda inferior teal que expande no hover
- Fundo `#111727`, `rounded-xl`

| Card | Ícone | Título |
|---|---|---|
| 1 | `Workflow` | Processos manuais |
| 2 | `Database` | Dados espalhados |
| 3 | `LayoutDashboard` | Sistemas internos |
| 4 | `Globe` | Presença digital |

### 6.5 Serviços

Background `#111727`. Grid 2×2 desktop, 1 coluna mobile.

4 cards com:
- Número decorativo `01`–`04` em teal grande e opaco (canto superior direito)
- Ícone lucide em teal
- Título em branco, peso 700
- Descrição em `#94A3B8`
- Lista de entregáveis com `✓` em teal
- Hover: `translateY(-4px)` + borda teal acende
- Fundo `#1A2236`, `rounded-xl`

Serviços: Sites e Landing Pages · Sistemas Internos · Automações e Integrações · Dashboards e Dados

### 6.6 Projetos

Background `#1A2236`. Lista vertical de 5 cards expansíveis (accordion).

**Estado fechado:**
- Badge de categoria (teal, pequeno, fonte mono)
- Título do projeto (branco)
- Badge de status colorido: amarelo=Em desenvolvimento, verde=Em uso, cinza=Protótipo
- Ícone `ChevronDown` (rota para cima quando aberto)
- Fundo `#111727`, `rounded-lg`, `border border-[#1E2D40]`

**Estado aberto (um por vez):**
- Expande com `transition:slide` nativo do Svelte
- Descrição do projeto
- "Problema resolvido:" com ícone `AlertCircle` em amarelo
- Ferramentas como badges inline pequenos
- Link opcional com ícone `ExternalLink`

### 6.7 Tecnologias

Background `#111727`. 5 grupos.

Cada grupo:
- Título em teal, fonte mono, peso 600
- Badges inline: fundo `#1A2236`, borda `#1E2D40`, hover acende borda teal
- Fade-in escalonado ao entrar no viewport

Grupos: Desenvolvimento Web · Backend e Dados · BI e Dados · Automação e Ferramentas · Sistemas e Processos

### 6.8 Experiência Resumida

Background `#1A2236`. Layout duas colunas desktop.

- Esquerda: título + parágrafo descritivo
- Direita: 8 itens em lista com borda esquerda contínua teal (`border-l-2`), cada item com ícone teal + texto — visual de linha do tempo

### 6.9 Contato

Background `#111727`. Centralizado, estilo CTA final.

- Título grande: **"Vamos conversar?"** com gradiente `teal → cyan` no texto
- Subtexto em `#94A3B8`
- 4 botões em linha (wrap no mobile):
  - **WhatsApp** → fundo teal sólido, ícone `MessageCircle`
  - **LinkedIn** → borda teal, ícone `Linkedin`
  - **GitHub** → borda teal, ícone `Github`
  - **Solicitar currículo** → borda branca, ícone `Send` → abre WhatsApp com mensagem pré-preenchida: *"Olá Nicolas, gostaria de receber seu currículo."*
- Gradiente radial teal sutil atrás do título como decoração

> **Nota:** Não há download direto de PDF. O currículo é enviado via WhatsApp sob demanda para preservar dados pessoais.

### 6.10 Footer

Background `#0D1120`. Linha simples:
- Esquerda: `© 2026 Nicolas Botelho`
- Direita: ícones de redes sociais (WhatsApp, LinkedIn, GitHub) com hover teal

---

## 7. Modelo de Dados

### Project

```ts
export type Project = {
  title: string;
  category: string;
  description: string;
  problem: string;
  tools: string[];
  status: 'Em desenvolvimento' | 'Em uso' | 'Protótipo' | 'Aplicado';
  link?: string;
};
```

### Service

```ts
export type Service = {
  title: string;
  description: string;
  items: string[];
  icon: string; // nome do ícone lucide
};
```

### TechGroup

```ts
export type TechGroup = {
  title: string;
  items: string[];
};
```

### Links

```ts
export const links = {
  whatsapp: string;        // URL wa.me com número
  whatsappCurriculo: string; // URL wa.me com mensagem pré-preenchida
  linkedin: string;
  github: string;
};
```

---

## 8. SEO

```html
<title>Nicolas Botelho | Desenvolvimento, Dados e Automação</title>
<meta name="description" content="Portfólio de Nicolas Botelho, profissional de desenvolvimento, TI, dados e automação. Criação de sites, sistemas internos, dashboards e soluções digitais para empresas." />
<meta property="og:title" content="Nicolas Botelho | Desenvolvimento, Dados e Automação" />
<meta property="og:description" content="Portfólio de Nicolas Botelho, profissional de desenvolvimento, TI, dados e automação. Criação de sites, sistemas internos, dashboards e soluções digitais para empresas." />
<meta property="og:image" content="/og-image.png" />
```

Configurado em `src/layouts/BaseLayout.astro` via `<head>`.

---

## 9. Responsividade

| Breakpoint | Comportamento |
|---|---|
| Mobile (`< 768px`) | 1 coluna, hero empilhado, hambúrguer, botões grandes |
| Tablet (`768px–1024px`) | 2 colunas em cards, hero 1 coluna |
| Desktop (`> 1024px`) | Layout completo, hero 2 colunas, grids 2×2 |

---

## 10. Requisitos Funcionais

- Navegação suave entre seções via âncoras
- Typewriter no hero alterna entre 4 frases em loop
- Accordion de projetos: abre um por vez
- Botão "Solicitar currículo" abre WhatsApp com mensagem pré-preenchida
- Botões WhatsApp, LinkedIn e GitHub abrem em nova aba
- Layout responsivo em mobile, tablet e desktop
- Fade-in nas seções ao rolar com Motion One
- Hidratação Astro restrita aos componentes realmente interativos

---

## 11. Fora do Escopo (V1)

- Download direto de PDF do currículo
- Formulário de contato com envio por e-mail
- Blog, CMS, painel administrativo
- Login, banco de dados, backend
- Página individual por projeto
- Modo claro/escuro
- Multilíngue
- Analytics
- Cursor trail WebGL/OGL estilo `ddaniel.dev`

---

## 12. Critérios de Aceite

- [ ] Todas as seções implementadas e responsivas
- [ ] Typewriter funcional no hero
- [ ] Accordion de projetos funcional
- [ ] Botões de contato funcionam (WhatsApp, LinkedIn, GitHub, Solicitar currículo)
- [ ] Visual coerente com paleta teal/dark
- [ ] Detalhes terminal/neon aplicados com moderação
- [ ] Código organizado em componentes
- [ ] SEO básico configurado
- [ ] Deploy publicado (Vercel ou Cloudflare Pages)
- [ ] Projeto versionado no GitHub
