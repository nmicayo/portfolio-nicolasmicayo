<script lang="ts">
  import { MessageCircle, Send } from 'lucide-svelte';
  import LinkedInIcon from './LinkedInIcon.svelte';
  import GitHubIcon from './GitHubIcon.svelte';
  import { links } from '../data';
  import { reveal } from '../lib/actions/reveal';
</script>

<div class="relative bg-[#111727] py-24 px-6 overflow-hidden">

  <!-- Gradiente radial decorativo -->
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
    style="background: radial-gradient(circle, #00D4A811 0%, transparent 70%);"
  ></div>

  <div class="relative max-w-2xl mx-auto flex flex-col items-center gap-8 text-center">

    <div use:reveal>
      <p class="font-mono text-sm text-[#00D4A8] uppercase tracking-widest mb-3">Vamos trabalhar juntos</p>
      <h2
        class="text-4xl lg:text-5xl font-extrabold"
        style="background: linear-gradient(90deg, #00D4A8, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
      >
        Vamos conversar?
      </h2>
    </div>

    <p use:reveal={{ delay: 0.1 }} class="text-[#94A3B8] text-lg leading-relaxed">
      Tem um projeto em mente ou quer saber mais sobre meu trabalho?
      Estou disponível para projetos freelance e oportunidades em TI.
    </p>

    <div use:reveal={{ delay: 0.2 }} class="flex flex-wrap justify-center gap-4">
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#00D4A8] text-[#111727]
               font-semibold hover:bg-[#00bfa0] transition-colors duration-200"
      >
        <MessageCircle size={18} /> WhatsApp
      </a>

      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#00D4A8]
               text-[#00D4A8] font-semibold hover:bg-[#00D4A8] hover:text-[#111727] transition-all duration-200"
      >
        <LinkedInIcon size={18} /> LinkedIn
      </a>

      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#00D4A8]
               text-[#00D4A8] font-semibold hover:bg-[#00D4A8] hover:text-[#111727] transition-all duration-200"
      >
        <GitHubIcon size={18} /> GitHub
      </a>

      <a
        href={links.whatsappCurriculo}
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 px-5 py-3 rounded-lg border border-white
               text-white font-semibold hover:bg-white hover:text-[#111727] transition-all duration-200"
      >
        <Send size={18} /> Solicitar currículo
      </a>
    </div>

  </div>
</div>
