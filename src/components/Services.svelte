<script lang="ts">
  import { services } from '../data';
  import SectionTitle from './SectionTitle.svelte';
  import ServiceCard from './ServiceCard.svelte';
  import { reveal } from '../lib/actions/reveal';
</script>

<div class="bg-[#111727] py-24 px-6">
  <div class="max-w-6xl mx-auto flex flex-col gap-12">

    <div use:reveal class="text-center">
      <SectionTitle label="O que ofereço" title="Serviços" align="center" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each services as service, i}
        <ServiceCard {service} index={i} />
      {/each}
    </div>

  </div>
</div>
