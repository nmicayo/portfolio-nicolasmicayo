<script lang="ts">
  import { projects } from '../data';
  import SectionTitle from './SectionTitle.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import { reveal } from '../lib/actions/reveal';

  let openIndex = $state<number | null>(null);

  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }
</script>

<div class="bg-[#1A2236] py-24 px-6">
  <div class="max-w-6xl mx-auto flex flex-col gap-12">

    <div use:reveal class="text-center">
      <SectionTitle label="Trabalhos recentes" title="Projetos" align="center" />
    </div>

    <div class="flex flex-col gap-3">
      {#each projects as project, i}
        <div use:reveal={{ delay: 0.08 * i }}>
          <ProjectCard
            {project}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        </div>
      {/each}
    </div>

  </div>
</div>
