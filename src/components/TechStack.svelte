<script lang="ts">
  import { technologies } from '../data';
  import SectionTitle from './SectionTitle.svelte';
  import { reveal } from '../lib/actions/reveal';
</script>

<div class="bg-[#111727] py-24 px-6">
  <div class="max-w-6xl mx-auto flex flex-col gap-12">

    <div use:reveal class="text-center">
      <SectionTitle label="Arsenal técnico" title="Tecnologias" align="center" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each technologies as group, gi}
        <div use:reveal={{ delay: 0.1 * gi }} class="flex flex-col gap-3">
          <h3 class="font-mono text-sm text-[#00D4A8] font-semibold uppercase tracking-wider">
            {group.title}
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each group.items as item, ii}
              <span
                use:reveal={{ delay: 0.05 * ii + 0.1 * gi, y: 10 }}
                class="text-xs font-mono bg-[#1A2236] border border-[#1E2D40] text-[#94A3B8]
                       px-3 py-1.5 rounded-lg
                       hover:border-[#00D4A8]/50 hover:text-[#F8FAFC] transition-all duration-200 cursor-default"
              >
                {item}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

  </div>
</div>
