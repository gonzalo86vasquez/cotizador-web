'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { clsx } from 'clsx';

export interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  /** Enable stagger animation for children */
  stagger?: boolean;
  /** Threshold at which to trigger reveal (0-1) */
  threshold?: number;
  /** Only trigger once */
  once?: boolean;
  children: ReactNode;
}

/**
 * ScrollReveal Component - FORGE Design System
 *
 * Wrapper component for scroll-triggered animations.
 * Automatically adds 'revealed' class when element enters viewport.
 *
 * @example
 * ```tsx
 * <ScrollReveal direction="up">
 *   <h2>Fades in from bottom</h2>
 * </ScrollReveal>
 *
 * <ScrollReveal stagger>
 *   <div>Item 1 (delay: 0ms)</div>
 *   <div>Item 2 (delay: 80ms)</div>
 *   <div>Item 3 (delay: 160ms)</div>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  direction = 'up',
  stagger = false,
  threshold = 0.15,
  once = true,
  children,
  className,
  ...props
}: ScrollRevealProps) {
  const ref = useScrollReveal({ threshold, once });

  return (
    <div
      ref={ref}
      data-reveal={stagger ? undefined : direction}
      data-reveal-stagger={stagger ? '' : undefined}
      className={clsx(className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
