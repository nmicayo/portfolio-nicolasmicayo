<script lang="ts">
  import { Workflow, Database, LayoutDashboard, Globe } from 'lucide-svelte';
  import SectionTitle from './SectionTitle.svelte';
  import { reveal } from '../lib/actions/reveal';

  const cards = [
    {
      icon: Workflow,
      title: 'Processos manuais',
      description: 'Tarefas repetitivas que consomem tempo da equipe e são propensas a erros humanos.',
    },
    {
      icon: Database,
      title: 'Dados espalhados',
      description: 'Informações em planilhas, sistemas diferentes e sem visibilidade consolidada.',
    },
    {
      icon: LayoutDashboard,
      title: 'Sistemas internos',
      description: 'Falta de ferramentas adequadas para gestão de ativos, frotas, leads ou operações.',
    },
    {
      icon: Globe,
      title: 'Presença digital',
      description: 'Sites lentos, sem conversão ou que não representam o potencial do negócio.',
    },
  ];
</script>

<div class="bg-[#1A2236] py-24 px-6">
  <div class="max-w-6xl mx-auto flex flex-col gap-12">

    <div use:reveal class="text-center">
      <SectionTitle label="Dores que resolvo" title="O que eu resolvo" align="center" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each cards as card, i}
        <div
          use:reveal={{ delay: 0.1 * i }}
          class="group relative bg-[#111727] rounded-xl p-6 border border-[#1E2D40]
                 flex flex-col gap-4 overflow-hidden
                 hover:-translate-y-1 transition-transform duration-300"
        >
          <!-- Borda inferior teal no hover -->
          <div
            class="absolute bottom-0 left-0 h-0.5 bg-[#00D4A8] w-0 group-hover:w-full transition-all duration-400"
          ></div>

          <card.icon size={32} class="text-[#00D4A8]" />
          <h3 class="text-[#F8FAFC] font-semibold text-lg">{card.title}</h3>
          <p class="text-[#94A3B8] text-sm leading-relaxed">{card.description}</p>
        </div>
      {/each}
    </div>

  </div>
</div>
