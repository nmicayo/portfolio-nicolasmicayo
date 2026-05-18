<script lang="ts">
  import { ChevronDown, ExternalLink, AlertCircle } from 'lucide-svelte';
  import { slide } from 'svelte/transition';
  import type { Project } from '../data';

  interface Props {
    project: Project;
    isOpen: boolean;
    onToggle: () => void;
  }

  let { project, isOpen, onToggle }: Props = $props();
</script>

<div class="rounded-lg border border-[#1E2D40] bg-[#111727] overflow-hidden">

  <!-- Cabeçalho clicável -->
  <button
    onclick={onToggle}
    aria-expanded={isOpen}
    class="w-full flex items-center justify-between gap-4 px-5 py-4
           hover:bg-[#1A2236] transition-colors duration-200 text-left"
  >
    <div class="flex items-center gap-3 min-w-0">
      <span class="font-mono text-xs text-[#00D4A8] bg-[#00D4A8]/10 px-2 py-0.5 rounded shrink-0">
        {project.category}
      </span>
      <span class="text-[#F8FAFC] font-semibold truncate">{project.title}</span>
    </div>
    <ChevronDown
      size={18}
      class="text-[#94A3B8] shrink-0 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
    />
  </button>

  <!-- Conteúdo expandido -->
  {#if isOpen}
    <div transition:slide={{ duration: 280 }} class="border-t border-[#1E2D40] px-5 py-5 flex flex-col gap-4">

      <p class="text-[#94A3B8] text-sm leading-relaxed">{project.description}</p>

      <div class="flex items-start gap-2">
        <AlertCircle size={15} class="text-[#F2FF5B] mt-0.5 shrink-0" />
        <p class="text-sm text-[#94A3B8]">
          <span class="text-[#F2FF5B] font-medium">Problema resolvido: </span>
          {project.problem}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        {#each project.tools as tool}
          <span class="font-mono text-xs bg-[#1A2236] border border-[#1E2D40] text-[#94A3B8] px-2 py-1 rounded">
            {tool}
          </span>
        {/each}
      </div>

      {#if project.link}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-sm text-[#00D4A8] hover:underline"
        >
          Ver projeto <ExternalLink size={13} />
        </a>
      {/if}

    </div>
  {/if}

</div>
