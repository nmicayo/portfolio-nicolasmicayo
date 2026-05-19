<script lang="ts">
  import { links } from '../data';
  import TerminalBlock from './TerminalBlock.svelte';
  import ScrambleRotate from './ScrambleRotate.svelte';

  const scramblePhrases = [
    'TRANSFORMO PROCESSOS EM SOLUÇÕES DIGITAIS',
    'DO BACKEND AO FRONT-END COM PRECISÃO',
    'AUTOMAÇÃO QUE ECONOMIZA SEU TEMPO',
    'DADOS QUE VIRAM DECISÕES DE NEGÓCIO',
    'SISTEMAS QUE ESCALEM COM SEU NEGÓCIO',
  ];
</script>

<div class="relative min-h-screen flex items-center bg-[#111727] pt-16 overflow-hidden">

  <!-- Gradiente radial decorativo -->
  <div
    class="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
    style="background: radial-gradient(circle at top right, #00D4A822 0%, transparent 70%);"
  ></div>

  <div class="max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

    <!-- Coluna esquerda -->
    <div class="flex flex-col gap-6">
      <span class="font-mono text-sm text-[#00D4A8] tracking-wider">
        [ Desenvolvimento · Dados · Automação ]
      </span>

      <div class="flex flex-col gap-1">
        <h1 class="flex items-center gap-3 font-mono font-bold leading-tight">
          <span class="text-[#00D4A8] text-5xl lg:text-6xl select-none">$</span>
          <ScrambleRotate
            phrases={['nicolas.botelho']}
            interval={3500}
            speed={25}
            resolvedColor="#F8FAFC"
            scramblingColor="#00D4A8"
            class="text-5xl lg:text-6xl font-bold"
          />
        </h1>
        <p class="mt-1">
          <ScrambleRotate phrases={scramblePhrases} />
        </p>
      </div>

      <p class="text-[#94A3B8] text-lg leading-relaxed max-w-md">
        Do desenvolvimento web à automação e dados — sistemas que resolvem
        problemas reais de negócio.
      </p>

      <div class="flex flex-wrap gap-4 pt-2">
        <a
          href="#projetos"
          class="px-6 py-3 rounded-lg bg-[#00D4A8] text-[#111727] font-semibold
                 hover:bg-[#00bfa0] transition-colors duration-200"
        >
          Ver projetos
        </a>
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          class="px-6 py-3 rounded-lg border border-white text-white font-semibold
                 hover:bg-white hover:text-[#111727] transition-all duration-200"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>

    <!-- Coluna direita — terminal -->
    <div class="w-full">
      <TerminalBlock />
    </div>

  </div>
</div>
