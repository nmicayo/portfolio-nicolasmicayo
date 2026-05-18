<script lang="ts">
  import SectionTitle from './SectionTitle.svelte';
  import { reveal } from '../lib/actions/reveal';

  const highlights = [
    'Desenvolvimento de sistemas internos sob medida',
    'Automação de processos operacionais e administrativos',
    'Dashboards e relatórios com Power BI e D3.js',
    'Integração entre plataformas e APIs externas',
    'Stack moderna: SvelteKit, TypeScript, PostgreSQL',
    'Deploy e infraestrutura com Docker e Dokploy',
    'Scraping e coleta automatizada de dados',
    'Soluções para logística, energia solar e gestão de ativos',
  ];
</script>

<div class="bg-[#111727] py-24 px-6">
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

    <!-- Esquerda -->
    <div use:reveal class="flex flex-col gap-6">
      <SectionTitle label="Sobre mim" title="Quem está por trás do código" />
      <p class="text-[#94A3B8] text-base leading-relaxed">
        Sou desenvolvedor full-stack com 7 anos de experiência em TI, especializado em
        transformar processos de negócio em soluções digitais eficientes. Trabalho com
        empresas de diferentes setores para digitalizar operações, automatizar fluxos e
        criar sistemas que realmente funcionam no dia a dia.
      </p>
      <p class="text-[#94A3B8] text-base leading-relaxed">
        Meu diferencial é conectar a visão técnica com o entendimento do negócio —
        não entrego só código, entrego resultados mensuráveis.
      </p>
    </div>

    <!-- Direita -->
    <div use:reveal={{ delay: 0.15 }}
      class="rounded-xl bg-[#1A2236] border-l-4 border-[#00D4A8] p-6 flex flex-col gap-3"
    >
      {#each highlights as item, i}
        <div use:reveal={{ delay: 0.05 * i, y: 12 }} class="flex items-start gap-3">
          <span class="text-[#00D4A8] mt-0.5 shrink-0">•</span>
          <span class="text-[#94A3B8] text-sm leading-relaxed">{item}</span>
        </div>
      {/each}
    </div>

  </div>
</div>
