type RevealOptions = {
  delay?: number;
  y?: number;
  duration?: number;
};

export function reveal(node: Element, options: RevealOptions = {}) {
  const { delay = 0, y = 28, duration = 0.65 } = options;
  const el = node as HTMLElement;

  el.style.opacity = '0';
  el.style.transform = `translateY(${y}px)`;
  el.style.transition = [
    `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    `transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  ].join(', ');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.getBoundingClientRect();
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.disconnect();
        const totalMs = (delay + duration) * 1000;
        setTimeout(() => {
          el.style.transform = '';
          el.style.transition = '';
        }, totalMs);
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(el);

  return { destroy: () => observer.disconnect() };
}
