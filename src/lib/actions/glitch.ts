const CHARS = '!<>-_/[]{}=+*^?#░▒▓@$%&';

export function glitchDecode(node: HTMLElement, text: string) {
  const len = text.length;
  const resolved = new Set<number>();
  let rafId: number;
  let frame = 0;

  function update() {
    let output = '';
    for (let i = 0; i < len; i++) {
      if (resolved.has(i) || text[i] === ' ') {
        output += text[i];
      } else {
        output += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    node.textContent = output;

    // resolve ~2 chars per frame, faster as we near the end
    if (frame % 2 === 0 && resolved.size < len) {
      let attempts = 0;
      while (attempts < 3) {
        const idx = Math.floor(Math.random() * len);
        if (!resolved.has(idx)) { resolved.add(idx); break; }
        attempts++;
      }
    }

    frame++;
    if (resolved.size < len) {
      rafId = requestAnimationFrame(update);
    } else {
      node.textContent = text;
    }
  }

  rafId = requestAnimationFrame(update);

  return {
    destroy() { cancelAnimationFrame(rafId); },
  };
}
