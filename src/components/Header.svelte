<script lang="ts">
  import { Menu, X } from 'lucide-svelte';

  let menuOpen = $state(false);
  let activeSection = $state('inicio');

  const navItems = [
    { label: 'Início',      href: '#inicio',      id: 'inicio' },
    { label: 'Sobre',       href: '#sobre',        id: 'sobre' },
    { label: 'Serviços',    href: '#servicos',     id: 'servicos' },
    { label: 'Projetos',    href: '#projetos',     id: 'projetos' },
    { label: 'Tecnologias', href: '#tecnologias',  id: 'tecnologias' },
    { label: 'Contato',     href: '#contato',      id: 'contato' },
  ];

  function closeMenu() {
    menuOpen = false;
  }

  $effect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) activeSection = id; },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  });
</script>

<header class="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-[#111727]/80 border-b border-[#1E2D40]">
  <div class="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">

    <!-- Logo -->
    <a href="#inicio" class="font-bold text-lg text-[#00D4A8] font-['Inter']">
      Nicolas Botelho
    </a>

    <!-- Nav desktop -->
    <nav class="hidden md:flex items-center gap-8">
      {#each navItems as item}
        <a
          href={item.href}
          class="text-sm font-medium transition-colors duration-200 relative group
            {activeSection === item.id ? 'text-[#00D4A8]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'}"
        >
          {item.label}
          <span
            class="absolute -bottom-1 left-0 h-px bg-[#00D4A8] transition-all duration-200
              {activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}"
          ></span>
        </a>
      {/each}
    </nav>

    <!-- CTA desktop -->
    <a
      href="#contato"
      class="hidden md:inline-flex items-center px-4 py-2 rounded-lg border border-[#00D4A8]
             text-[#00D4A8] text-sm font-medium transition-all duration-200
             hover:bg-[#00D4A8] hover:text-[#111727]"
    >
      Falar comigo
    </a>

    <!-- Hambúrguer mobile -->
    <button
      class="md:hidden text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
      aria-label="Abrir menu"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      {#if menuOpen}
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>
</header>

<!-- Menu mobile overlay -->
{#if menuOpen}
  <div
    class="fixed inset-0 z-40 bg-[#111727] flex flex-col items-center justify-center gap-8 md:hidden"
  >
    {#each navItems as item}
      <a
        href={item.href}
        onclick={closeMenu}
        class="text-2xl font-semibold text-[#F8FAFC] hover:text-[#00D4A8] transition-colors"
      >
        {item.label}
      </a>
    {/each}
    <a
      href="#contato"
      onclick={closeMenu}
      class="mt-4 px-6 py-3 rounded-lg border border-[#00D4A8] text-[#00D4A8] text-lg font-medium
             hover:bg-[#00D4A8] hover:text-[#111727] transition-all duration-200"
    >
      Falar comigo
    </a>
  </div>
{/if}
