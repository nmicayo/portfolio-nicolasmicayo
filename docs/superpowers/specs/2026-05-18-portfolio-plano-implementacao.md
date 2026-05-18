# Plano de Implementação — Portfólio Nicolas Botelho

**Data:** 2026-05-18
**Spec:** `2026-05-18-portfolio-nicolas-botelho-design.md`
**Stack:** Astro · Svelte islands · TypeScript · Tailwind CSS v4 · Motion One · lucide-svelte

---

## Fase 1 — Setup do Projeto

### 1.1 Scaffold Astro
```bash
bun create astro@latest nicolasmicayo-portfolio
cd nicolasmicayo-portfolio
# opções: minimal, TypeScript strict, sem template de exemplo
```

### 1.2 Instalar integrações e dependências
```bash
bunx astro add svelte
bun add -D tailwindcss @tailwindcss/vite
bun add motion lucide-svelte
```

### 1.3 Configurar Tailwind CSS v4 no Astro
- Adicionar plugin `@tailwindcss/vite` em `astro.config.mjs` via `vite.plugins`
- Importar `@import "tailwindcss"` em `src/styles/global.css`
- Definir variáveis CSS da paleta em `:root` no `src/styles/global.css`

### 1.4 Configurar fontes (Google Fonts)
- Inter: pesos 400, 600, 700, 800
- JetBrains Mono: peso 400, 600
- Importar no `<head>` do `src/layouts/BaseLayout.astro`

### 1.5 Estrutura de pastas
Criar conforme spec:
```
src/components/
src/data/
src/layouts/
src/lib/actions/
src/pages/
src/styles/
public/
```

### 1.6 Confirmar build estático
- Manter Astro em modo estático padrão, sem SSR adapter
- Validar com `bun run build` após o layout base existir

---

## Fase 2 — Camada de Dados

### 2.1 `src/data/links.ts`
Exportar objeto `links` com:
- `whatsapp` — URL wa.me com número real
- `whatsappCurriculo` — URL wa.me com mensagem pré-preenchida
- `linkedin` — URL do perfil
- `github` — URL do perfil

### 2.2 `src/data/projects.ts`
Implementar tipo `Project` e array com os 5 projetos da spec:
1. Resultado Operacional por CT-e
2. Dashboard Executivo em Power BI
3. Automação e Integrações Operacionais
4. Radar Comercial de Leads
5. Portfólio Web Pessoal

Status colorido:
- `'Em desenvolvimento'` → amarelo (`#FBBF24`)
- `'Em uso'` → verde (`#10B981`)
- `'Protótipo'` → cinza (`#6B7280`)
- `'Aplicado'` → azul (`#06B6D4`)

### 2.3 `src/data/services.ts`
Implementar tipo `Service` e array com 4 serviços:
1. Sites e Landing Pages
2. Sistemas Internos
3. Automações e Integrações
4. Dashboards e Dados

Adicionar campo `icon: string` com nome do ícone lucide para cada serviço.

### 2.4 `src/data/technologies.ts`
Implementar tipo `TechGroup` e array com 5 grupos:
1. Desenvolvimento Web
2. Backend e Dados
3. BI e Dados
4. Automação e Ferramentas
5. Sistemas e Processos

---

## Fase 3 — Layout Base + CSS

### 3.1 `src/styles/global.css`
- Variáveis CSS: `--bg-primary`, `--bg-secondary`, `--bg-footer`, `--accent-teal`, `--accent-cyan`, `--accent-lime`, `--accent-yellow`, `--text-primary`, `--text-secondary`, `--border`
- Reset: `box-sizing: border-box`, `scroll-behavior: smooth`
- Keyframe `@keyframes float` para badges do hero
- Keyframe `@keyframes typewriter` não necessário (feito via JS no componente)

### 3.2 `src/layouts/BaseLayout.astro`
- `<head>` com title, description, og:title, og:description, og:image
- Import da fonte Google Fonts
- Import de `src/styles/global.css`
- Wrapper com fundo `#111727` e `<slot />`

### 3.3 `src/pages/index.astro`
- Importar `BaseLayout.astro` e montar todos os componentes em ordem
- Cada seção envolvida em `<section id="ancora">` para navegação
- Usar hidratação pontual: `Header`, `Hero` e `Projects` com `client:load`; seções animadas com `client:visible` quando necessário

---

## Fase 4 — Componentes Reutilizáveis

### 4.1 `SectionTitle.svelte`
Props: `label: string`, `title: string`, `align?: 'left' | 'center'`
- Label em fonte mono, cor teal, tamanho pequeno
- Título em branco, peso 700
- Linha decorativa teal abaixo do label

### 4.2 `ProjectCard.svelte`
Props: `project: Project`, `isOpen: boolean`, `onToggle: () => void`
- Estado fechado: badge categoria + título + badge status + chevron
- Estado aberto: expande com `transition:slide`
- Emite evento de toggle para o pai gerenciar qual está aberto

### 4.3 `ServiceCard.svelte`
Props: `service: Service`, `index: number`
- Número decorativo `0{index}` em teal opaco
- Ícone lucide
- Título, descrição, lista de entregáveis

---

## Fase 5 — Componentes de Seção

### 5.1 `Header.svelte`
- `fixed top-0 w-full z-50`
- `backdrop-blur-md bg-[#111727]/80`
- Nome + nav links + botão CTA
- Estado `menuOpen: boolean` para mobile
- Fechar menu ao clicar em link (scroll para âncora)
- Highlight do link ativo baseado em scroll position (IntersectionObserver)

### 5.2 `Hero.svelte`
- Grid 2 colunas desktop, 1 coluna mobile
- Typewriter: array de frases, intervalo de 2.5s, efeito de cursor piscando
- Implementar typewriter com `setInterval` em `onMount`, limpar em `onDestroy`
- Badges com classe `animate-float` (definida no `src/styles/global.css`)
- Gradiente radial como `::before` ou div absoluta com `pointer-events-none`

### 5.3 `About.svelte`
- 2 colunas desktop, 1 mobile
- Texto à esquerda, bloco com border-l teal à direita

### 5.4 `ProblemCards.svelte`
- Grid 2×2 desktop, 1 coluna mobile
- Fade-in com action `reveal` baseada em Motion One ao entrar no viewport
- Borda inferior teal expande no hover via CSS `::after` ou classe condicional

### 5.5 `Services.svelte`
- Grid 2×2 desktop, 1 coluna mobile
- Usar `ServiceCard.svelte`
- Fade-in escalonado: cada card com `transition-delay` diferente

### 5.6 `Projects.svelte`
- Lista vertical (não grid)
- Estado `openIndex: number | null = null`
- Passar `isOpen={openIndex === i}` e `onToggle={() => openIndex = openIndex === i ? null : i}` para cada `ProjectCard`

### 5.7 `TechStack.svelte`
- 5 grupos em layout de 2–3 colunas desktop, 1 mobile
- Badges com Motion One + atraso escalonado por grupo

### 5.8 `Experience.svelte`
- 2 colunas desktop, 1 mobile
- Coluna direita: lista com `border-l-2 border-teal-400`, cada item com ícone + texto

### 5.9 `Contact.svelte`
- Centralizado
- Título com gradiente CSS no texto (`background-clip: text`)
- 4 botões com links externos (`target="_blank" rel="noopener noreferrer"`)
- WhatsApp currículo: abre wa.me com mensagem codificada em URL

### 5.10 `Footer.svelte`
- Linha simples, fundo `#0D1120`
- Texto à esquerda, ícones à direita

---

## Fase 6 — Animações e Acessibilidade

### 6.1 Motion One reveal action
Criar `src/lib/actions/reveal.ts`:
```ts
import { animate, inView } from 'motion';

export function reveal(node: Element) {
  // action do Svelte que anima entrada quando o elemento entra no viewport
}
```
Usar como Svelte action: `<div use:reveal>` em componentes hidratados; usar `client:visible` para carregar seções animadas sob demanda.

### 6.2 CSS de animação
No `src/styles/global.css`:
```css
.fade-in { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.animate-float { animation: float 3s ease-in-out infinite; }
```
Usar CSS para float, cursor/typewriter e hovers simples; usar Motion One para entradas em viewport e sequenciamento.

### 6.3 Acessibilidade básica
- Botão hambúrguer com `aria-label` e `aria-expanded`
- Projetos accordion com `aria-expanded` nos botões
- Contraste verificado (teal `#00D4A8` em fundo `#111727` passa WCAG AA)
- `prefers-reduced-motion`: envolver animações em media query

---

## Fase 7 — SEO e Assets Estáticos

### 7.1 Meta tags
Configurar em `src/layouts/BaseLayout.astro` via `<head>`:
- `<title>`
- `<meta name="description">`
- `<meta property="og:*">`

### 7.2 Favicon
- Adicionar `favicon.png` em `public/`

### 7.3 OG Image
- Criar `og-image.png` (1200×630px) com nome e headline
- Adicionar em `public/`

---

## Fase 8 — Responsividade e Testes

### 8.1 Breakpoints a verificar
- 375px (iPhone SE)
- 768px (tablet)
- 1280px (desktop padrão)
- 1920px (desktop wide)

### 8.2 Checklist de responsividade
- [ ] Header: hambúrguer funciona no mobile
- [ ] Hero: empilha em 1 coluna no mobile
- [ ] Grids 2×2: viram 1 coluna no mobile
- [ ] Projetos: espaçamento adequado no mobile
- [ ] Botões de contato: wrap correto no mobile
- [ ] Fontes: legíveis em todos os tamanhos

---

## Fase 9 — Deploy

### 9.1 Vercel (opção recomendada)
```bash
bun run build
# Configurar no painel Vercel: framework = Astro, build = bun run build, output = dist
```

### 9.2 Variáveis
Sem variáveis de ambiente necessárias — todos os dados são estáticos.

### 9.3 Domínio
Configurar domínio personalizado no painel do Vercel após o primeiro deploy.

---

## Ordem de Execução Sugerida

```
1. Setup (Fase 1) → confirmar que roda localmente
2. Dados (Fase 2) → preencher com links e conteúdo reais
3. Layout base (Fase 3) → CSS, fontes, BaseLayout.astro
4. Componentes reutilizáveis (Fase 4)
5. Header + Hero (5.1 + 5.2) → primeira dobra funcionando
6. Seções em ordem (5.3 → 5.10)
7. Animações (Fase 6)
8. SEO + Assets (Fase 7)
9. Testes de responsividade (Fase 8)
10. Deploy (Fase 9)
```

---

## Critérios de Conclusão

- [ ] `bun run build` sem erros
- [ ] Todas as seções renderizando com conteúdo real
- [ ] Typewriter funcional no hero
- [ ] Accordion de projetos funcional (um por vez)
- [ ] Motion One aplicado nas entradas em viewport sem hidratar a página inteira
- [ ] Botões de contato abrindo links corretos
- [ ] Layout responsivo verificado em 375px, 768px, 1280px
- [ ] Deploy publicado e acessível via URL
- [ ] Repositório no GitHub com commits organizados
