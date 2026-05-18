<script lang="ts">
  import { onMount } from 'svelte';
  import { glitchDecode } from '../lib/actions/glitch';

  type Line = {
    cmd: string;
    output: string;
    outputColor?: string;
    glitch?: boolean;
  };

  const lines: Line[] = [
    {
      cmd: 'nicolas.role()',
      output: 'Desenvolvedor Full-Stack',
      outputColor: '#F8FAFC',
    },
    {
      cmd: 'nicolas.focus()',
      output: 'Web  ·  Automação  ·  Dados',
      outputColor: '#00D4A8',
    },
    {
      cmd: 'nicolas.experience()',
      output: '7 anos em TI & desenvolvimento',
      outputColor: '#89FF69',
      glitch: true,
    },
    {
      cmd: 'nicolas.status()',
      output: 'Disponível para novos projetos',
      outputColor: '#F2FF5B',
    },
  ];

  type CompletedLine = Line & { id: number };

  let completedLines = $state<CompletedLine[]>([]);
  let currentCmd = $state('');
  let currentLineIdx = $state(0);
  let phase = $state<'typing' | 'output' | 'done'>('typing');
  let glitchNodes = $state<Record<number, HTMLElement | null>>({});
  let showCursor = $state(true);

  onMount(() => {
    let cmdIdx = 0;
    let lineIdx = 0;
    let typeInterval: ReturnType<typeof setInterval>;
    let cursorInterval: ReturnType<typeof setInterval>;

    cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 530);

    function typeCmd() {
      const cmd = lines[lineIdx].cmd;
      phase = 'typing';
      currentCmd = '';
      cmdIdx = 0;
      typeInterval = setInterval(() => {
        cmdIdx++;
        currentCmd = cmd.slice(0, cmdIdx);
        if (cmdIdx === cmd.length) {
          clearInterval(typeInterval);
          setTimeout(showOutput, 350);
        }
      }, 65);
    }

    function showOutput() {
      phase = 'output';
      const line = lines[lineIdx];
      const completed: CompletedLine = { ...line, id: lineIdx };
      completedLines = [...completedLines, completed];

      if (line.glitch) {
        // wait one tick for the DOM node to render, then trigger glitch
        setTimeout(() => {
          const node = glitchNodes[lineIdx];
          if (node) glitchDecode(node, line.output);
        }, 50);
      }

      lineIdx++;
      if (lineIdx < lines.length) {
        setTimeout(typeCmd, 900);
      } else {
        phase = 'done';
        currentCmd = '';
      }
    }

    // slight delay before starting
    setTimeout(typeCmd, 600);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  });
</script>

<div class="rounded-xl bg-[#0D1120] border border-[#1E2D40] overflow-hidden shadow-xl shadow-black/40">

  <!-- Barra do terminal -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-[#1E2D40] bg-[#111727]">
    <span class="w-3 h-3 rounded-full bg-red-500/70"></span>
    <span class="w-3 h-3 rounded-full bg-yellow-400/70"></span>
    <span class="w-3 h-3 rounded-full bg-green-400/70"></span>
    <span class="ml-3 text-xs font-mono text-[#94A3B8]">nicolas@portfolio:~</span>
  </div>

  <!-- Corpo do terminal -->
  <div class="p-5 font-mono text-sm space-y-4 min-h-[240px]">

    <!-- Linhas concluídas -->
    {#each completedLines as line (line.id)}
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-[#00D4A8]">$</span>
          <span class="text-[#94A3B8]">{line.cmd}</span>
        </div>
        <div class="pl-4">
          {#if line.glitch}
            <span
              bind:this={glitchNodes[line.id]}
              style="color: {line.outputColor ?? '#F8FAFC'};"
              class="font-semibold"
            ></span>
          {:else}
            <span style="color: {line.outputColor ?? '#F8FAFC'};" class="font-semibold">
              {line.output}
            </span>
          {/if}
        </div>
      </div>
    {/each}

    <!-- Linha sendo digitada no momento -->
    {#if phase !== 'done'}
      <div class="flex items-center gap-2">
        <span class="text-[#00D4A8]">$</span>
        <span class="text-[#94A3B8]">{currentCmd}</span>
        <span
          class="inline-block w-2 h-4 bg-[#00D4A8] transition-opacity duration-100"
          style="opacity: {showCursor ? 1 : 0};"
        ></span>
      </div>
    {:else}
      <!-- Cursor final piscando -->
      <div class="flex items-center gap-2">
        <span class="text-[#00D4A8]">$</span>
        <span
          class="inline-block w-2 h-4 bg-[#00D4A8] transition-opacity duration-100"
          style="opacity: {showCursor ? 1 : 0};"
        ></span>
      </div>
    {/if}

  </div>
</div>
