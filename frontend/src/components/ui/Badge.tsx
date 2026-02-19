'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: 'default' | 'forge' | 'success' | 'warning' | 'error' | 'info';
  /** Size of the badge */
  size?: 'sm' | 'md' | 'lg';
  /** Show a dot indicator */
  dot?: boolean;
  /** Icon to show before text */
  icon?: ReactNode;
  /** Make the badge pill-shaped */
  pill?: boolean;
  /** Outline style instead of filled */
  outline?: boolean;
}

/**
 * Badge Component - FORGE Design System
 *
 * A compact label for status, categories, or counts.
 * Theme-aware with dark/light mode support.
 *
 * @example
 * ```tsx
 * <Badge variant="success">En Stock</Badge>
 *
 * <Badge variant="warning" dot>Bajo Pedido</Badge>
 *
 * <Badge variant="forge" icon={<Flame />}>
 *   Premium
 * </Badge>
 *
 * <Badge variant="error" outline>Urgente</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      dot = false,
      icon,
      pill = true,
      outline = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      'inline-flex items-center justify-center gap-1.5',
      'font-medium leading-none whitespace-nowrap',
      'transition-colors duration-150'
    );

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    };

    const radiusStyles = pill ? 'rounded-full' : 'rounded-md';

    const filledVariantStyles = {
      default: 'bg-[var(--color-background-muted)] text-[var(--color-foreground-muted)]',
      forge: clsx(
        'bg-[var(--color-primary-light)] text-[var(--forge-700)]',
        '[data-theme="light"]_&:bg-[var(--forge-100)] [data-theme="light"]_&:text-[var(--forge-800)]'
      ),
      success: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
      warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]',
      error: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
      info: 'bg-[var(--color-info-bg)] text-[var(--color-info)]',
    };

    const outlineVariantStyles = {
      default: 'bg-transparent border border-[var(--color-border-strong)] text-[var(--color-foreground-muted)]',
      forge: 'bg-transparent border border-[var(--forge-500)] text-[var(--forge-500)]',
      success: 'bg-transparent border border-[var(--color-success)] text-[var(--color-success)]',
      warning: 'bg-transparent border border-[var(--color-warning)] text-[var(--color-warning)]',
      error: 'bg-transparent border border-[var(--color-error)] text-[var(--color-error)]',
      info: 'bg-transparent border border-[var(--color-info)] text-[var(--color-info)]',
    };

    const dotColors = {
      default: 'bg-[var(--color-foreground-subtle)]',
      forge: 'bg-[var(--forge-500)]',
      success: 'bg-[var(--color-success)]',
      warning: 'bg-[var(--color-warning)]',
      error: 'bg-[var(--color-error)]',
      info: 'bg-[var(--color-info)]',
    };

    const iconSizes = {
      sm: 'w-3 h-3',
      md: 'w-3.5 h-3.5',
      lg: 'w-4 h-4',
    };

    const dotSizes = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          baseStyles,
          sizeStyles[size],
          radiusStyles,
          outline ? outlineVariantStyles[variant] : filledVariantStyles[variant],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={clsx(
              'rounded-full flex-shrink-0',
              dotSizes[size],
              dotColors[variant]
            )}
            aria-hidden="true"
          />
        )}
        {icon && (
          <span className={clsx(iconSizes[size], 'flex-shrink-0')}>
            {icon}
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
