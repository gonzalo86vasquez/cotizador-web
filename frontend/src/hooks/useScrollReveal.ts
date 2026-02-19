'use client';

import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  /** Threshold at which to trigger reveal (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Only trigger once */
  once?: boolean;
}

/**
 * Hook for scroll-triggered reveal animations
 *
 * Uses IntersectionObserver to add 'revealed' class when element enters viewport.
 * Works with [data-reveal] and [data-reveal-stagger] CSS classes.
 *
 * @example
 * ```tsx
 * const ref = useScrollReveal({ threshold: 0.15 });
 *
 * <div ref={ref} data-reveal="up">
 *   Content fades in from bottom
 * </div>
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px',
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return ref;
}
