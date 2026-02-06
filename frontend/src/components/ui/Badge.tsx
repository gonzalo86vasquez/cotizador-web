'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
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
 * Badge Component
 *
 * A compact label for status, categories, or counts.
 * Features dot indicators and semantic color variants.
 *
 * @example
 * ```tsx
 * <Badge variant="success">En Stock</Badge>
 *
 * <Badge variant="warning" dot>Bajo Pedido</Badge>
 *
 * <Badge variant="primary" icon={<Clock />}>
 *   15 dias
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
      default: 'bg-neutral-100 text-neutral-700',
      primary: 'bg-violet-100 text-violet-700',
      success: 'bg-emerald-100 text-emerald-700',
      warning: 'bg-amber-100 text-amber-700',
      error: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
    };

    const outlineVariantStyles = {
      default: 'bg-transparent border border-neutral-300 text-neutral-700',
      primary: 'bg-transparent border border-violet-300 text-violet-700',
      success: 'bg-transparent border border-emerald-300 text-emerald-700',
      warning: 'bg-transparent border border-amber-300 text-amber-700',
      error: 'bg-transparent border border-red-300 text-red-700',
      info: 'bg-transparent border border-blue-300 text-blue-700',
    };

    const dotColors = {
      default: 'bg-neutral-500',
      primary: 'bg-violet-500',
      success: 'bg-emerald-500',
      warning: 'bg-amber-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
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
