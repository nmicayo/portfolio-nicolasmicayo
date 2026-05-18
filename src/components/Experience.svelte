<script lang="ts">
  import {
    Code2, BarChart2, Workflow, Settings2,
    Database, Users, Server, TrendingUp,
  } from 'lucide-svelte';
  import SectionTitle from './SectionTitle.svelte';
  import { reveal } from '../lib/actions/reveal';

  const timeline = [
    { icon: Code2,       text: 'Full-Stack com SvelteKit 5 + TypeScript' },
    { icon: Server,      text: 'Sistemas SaaS multi-tenant com Better Auth' },
    { icon: BarChart2,   text: 'Dashboards de BI para logística (Power BI + D3.js)' },
    { icon: Workflow,    text: 'Automação de processos com Puppeteer e n8n' },
    { icon: Database,    text: 'Banco de dados type-safe com Kysely + PostgreSQL' },
    { icon: TrendingUp,  text: 'CRM com funil de vendas para energia fotovoltaica' },
    { icon: Settings2,   text: 'Gestão de inventário e ativos corporativos' },
    { icon: Users,       text: 'Deploy containerizado com Docker + Dokploy' },
  ];
</script>

<div class="bg-[#1A2236] py-24 px-6">
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

    <!-- Esquerda -->
    <div use:reveal class="flex flex-col gap-6">
      <SectionTitle label="Trajetória" title="Experiência Resumida" />
      <p class="text-[#94A3B8] text-base leading-relaxed">
        Sete anos construindo soluções digitais para empresas — de sistemas internos
        e automações a dashboards analíticos e plataformas SaaS. Cada projeto
        é uma oportunidade de resolver um problema real com tecnologia bem aplicada.
      </p>
      <p class="text-[#94A3B8] text-base leading-relaxed">
        Atuo desde a concepção até o deploy, passando por modelagem de dados,
        integrações com APIs externas e infraestrutura containerizada.
      </p>
    </div>

    <!-- Direita — timeline -->
    <div class="flex flex-col gap-0 border-l-2 border-[#00D4A8]/30 pl-6">
      {#each timeline as item, i}
        <div
          use:reveal={{ delay: 0.07 * i, y: 16 }}
          class="relative flex items-start gap-3 pb-5 last:pb-0"
        >
          <!-- Dot na linha -->
          <div
            class="absolute -left-[29px] mt-0.5 w-3.5 h-3.5 rounded-full
                   bg-[#1A2236] border-2 border-[#00D4A8]/60"
          ></div>
          <item.icon size={16} class="text-[#00D4A8] mt-0.5 shrink-0" />
          <span class="text-[#94A3B8] text-sm leading-relaxed">{item.text}</span>
        </div>
      {/each}
    </div>

  </div>
</div>
