'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width variant */
  size?: 'narrow' | 'default' | 'wide' | 'full';
  /** Add vertical padding for section spacing */
  section?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Center content vertically (for hero sections) */
  centered?: boolean;
}

/**
 * Container Component
 *
 * A responsive container for consistent page layouts.
 * Handles max-width, padding, and centering automatically.
 *
 * @example
 * ```tsx
 * <Container size="default">
 *   <h1>Page Content</h1>
 * </Container>
 *
 * <Container size="narrow" section="lg">
 *   <article>Blog post content...</article>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = 'default',
      section = 'none',
      centered = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      narrow: 'max-w-3xl', // 768px
      default: 'max-w-6xl', // 1152px
      wide: 'max-w-7xl', // 1280px
      full: 'max-w-full',
    };

    const sectionStyles = {
      none: '',
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-24',
      xl: 'py-32',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'mx-auto w-full',
          'px-4 sm:px-6 lg:px-8',
          sizeStyles[size],
          sectionStyles[section],
          centered && 'flex flex-col items-center justify-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
