<script lang="ts">
  import { MessageCircle } from 'lucide-svelte';
  import LinkedInIcon from './LinkedInIcon.svelte';
  import GitHubIcon from './GitHubIcon.svelte';
  import { links } from '../data';
</script>

<footer class="bg-[#0D1120] border-t border-[#1E2D40] py-6 px-6">
  <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

    <span class="text-[#94A3B8] text-sm font-mono">
      © 2026 Nicolas Botelho
    </span>

    <div class="flex items-center gap-5">
      <a
        href={links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        class="text-[#94A3B8] hover:text-[#00D4A8] transition-colors duration-200"
      >
        <MessageCircle size={18} />
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        class="text-[#94A3B8] hover:text-[#00D4A8] transition-colors duration-200"
      >
        <LinkedInIcon size={18} />
      </a>
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        class="text-[#94A3B8] hover:text-[#00D4A8] transition-colors duration-200"
      >
        <GitHubIcon size={18} />
      </a>
    </div>

  </div>
</footer>
