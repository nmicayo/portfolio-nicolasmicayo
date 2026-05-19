<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    phrases: string[];
    interval?: number;
    speed?: number;
    class?: string;
    resolvedColor?: string;
    scramblingColor?: string;
    mono?: boolean;
  }

  let {
    phrases,
    interval = 2800,
    speed = 30,
    class: className = '',
    resolvedColor = '#00D4A8',
    scramblingColor = '#89FF69',
    mono = true,
  }: Props = $props();

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&';

  let displayed = $state(phrases[0] ?? '');
  let isScrambling = $state(false);

  onMount(() => {
    let phraseIndex = 0;
    let cycleTimeout: ReturnType<typeof setTimeout>;

    function scrambleTo(target: string) {
      isScrambling = true;
      const len = Math.max(displayed.length, target.length);
      const resolved = new Array(len).fill(false);
      let frame = 0;
      let rafId: number;

      function tick() {
        let out = '';
        for (let i = 0; i < len; i++) {
          if (resolved[i]) {
            out += target[i] ?? '';
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        displayed = out;

        // resolve ~2 chars per tick, faster at the end
        const remaining = resolved.filter(Boolean).length;
        const toResolve = remaining > len * 0.7 ? 3 : 2;
        let added = 0;
        while (added < toResolve) {
          const idx = Math.floor(Math.random() * len);
          if (!resolved[idx]) { resolved[idx] = true; added++; }
          if (resolved.every(Boolean)) break;
        }

        frame++;
        if (!resolved.every(Boolean)) {
          rafId = setTimeout(tick, speed);
        } else {
          displayed = target;
          isScrambling = false;
          schedule();
        }
      }

      tick();
      return () => clearTimeout(rafId);
    }

    function schedule() {
      cycleTimeout = setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        scrambleTo(phrases[phraseIndex]);
      }, interval);
    }

    schedule();

    return () => clearTimeout(cycleTimeout);
  });
</script>

<span
  class="{mono ? 'font-mono font-semibold tracking-wide' : ''} select-none {className}"
  style="
    color: {isScrambling ? scramblingColor : resolvedColor};
    text-shadow: {isScrambling ? `0 0 12px ${scramblingColor}88` : `0 0 8px ${resolvedColor}44`};
  "
>
  {displayed}
</span>
