<script lang="ts">
  import { glitchDecode } from '../lib/actions/glitch';

  interface Props {
    label: string;
    title: string;
    align?: 'left' | 'center';
  }

  let { label, title, align = 'left' }: Props = $props();

  let titleNode = $state<HTMLElement | null>(null);
  let triggered = false;

  $effect(() => {
    if (!titleNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          glitchDecode(titleNode!, title);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(titleNode);
    return () => observer.disconnect();
  });

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
</script>

<div class="flex flex-col gap-2 {alignClass}">
  <div class="flex items-center gap-2">
    {#if align === 'center'}
      <span class="w-8 h-px bg-[#00D4A8]"></span>
    {/if}
    <span class="font-mono text-xs text-[#00D4A8] uppercase tracking-widest">{label}</span>
    {#if align === 'center'}
      <span class="w-8 h-px bg-[#00D4A8]"></span>
    {:else}
      <span class="w-8 h-px bg-[#00D4A8]"></span>
    {/if}
  </div>
  <h2
    bind:this={titleNode}
    class="text-3xl lg:text-4xl font-bold text-[#F8FAFC]"
  >
    {title}
  </h2>
</div>
