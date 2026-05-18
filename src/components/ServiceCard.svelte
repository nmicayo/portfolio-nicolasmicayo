<script lang="ts">
  import { Monitor, Globe, Workflow, BarChart2 } from 'lucide-svelte';
  import type { Service } from '../data';
  import { reveal } from '../lib/actions/reveal';

  interface Props {
    service: Service;
    index: number;
  }

  const iconMap: Record<string, typeof Monitor> = {
    Monitor, Globe, Workflow, BarChart2,
  };

  let { service, index }: Props = $props();

  const Icon = iconMap[service.icon] ?? Monitor;
  const num = String(index + 1).padStart(2, '0');
</script>

<div
  use:reveal={{ delay: 0.1 * index }}
  class="group relative bg-[#1A2236] rounded-xl p-6 border border-[#1E2D40]
         flex flex-col gap-4 overflow-hidden
         hover:-translate-y-1 transition-transform duration-300"
>
  <!-- Número decorativo -->
  <span
    class="absolute top-4 right-5 font-mono text-5xl font-bold text-[#00D4A8]/10
           group-hover:text-[#00D4A8]/20 transition-colors duration-300 select-none"
  >
    {num}
  </span>

  <!-- Borda teal no hover -->
  <div
    class="absolute inset-0 rounded-xl border border-[#00D4A8]/0
           group-hover:border-[#00D4A8]/40 transition-all duration-300 pointer-events-none"
  ></div>

  <Icon size={28} class="text-[#00D4A8]" />

  <div class="flex flex-col gap-1">
    <h3 class="text-[#F8FAFC] font-bold text-lg leading-snug">{service.title}</h3>
    <p class="text-[#94A3B8] text-sm leading-relaxed">{service.description}</p>
  </div>

  <ul class="flex flex-col gap-1.5 mt-auto">
    {#each service.items as item}
      <li class="flex items-center gap-2 text-sm text-[#94A3B8]">
        <span class="text-[#00D4A8] text-xs">✓</span>
        {item}
      </li>
    {/each}
  </ul>
</div>
