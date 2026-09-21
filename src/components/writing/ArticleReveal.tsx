'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Visible without JavaScript; each block animates only on its first appearance. */
export default function ArticleReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !('IntersectionObserver' in window)) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const blocks = Array.from(container.children);
    const seen = new Set<Element>();
    let observer: IntersectionObserver | undefined;

    function configure() {
      observer?.disconnect();
      blocks.forEach((block) => block.classList.remove('writing-revealed'));
      if (preference.matches) {
        // Switching motion back on must not replay blocks already on screen.
        blocks.forEach((block) => {
          if (block.getBoundingClientRect().top < window.innerHeight) seen.add(block);
        });
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          entry.target.classList.add('writing-revealed');
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      blocks.forEach((block) => {
        if (!seen.has(block)) observer?.observe(block);
      });
    }

    configure();
    preference.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', configure);
      blocks.forEach((block) => block.classList.remove('writing-revealed'));
    };
  }, []);

  return <div className="writing-content" ref={ref}>{children}</div>;
}
