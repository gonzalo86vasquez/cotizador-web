'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: 'default' | 'glass' | 'gradient-border' | 'elevated' | 'flat' | 'glow';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Enable hover effects */
  interactive?: boolean;
  /** Enable shine effect on hover */
  shine?: boolean;
  /** Custom header content */
  header?: ReactNode;
  /** Custom footer content */
  footer?: ReactNode;
}

/**
 * Card Component - FORGE Design System
 *
 * A flexible card component with industrial precision styling.
 * Theme-aware with dark/light mode support.
 *
 * @example
 * ```tsx
 * <Card variant="default" padding="lg">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * <Card variant="glass" interactive>
 *   Theme-aware glass card
 * </Card>
 *
 * <Card variant="glow" shine>
 *   Card with forge-orange glow effect
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      interactive = false,
      shine = false,
      header,
      footer,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      'relative',
      'rounded-lg',
      'transition-all duration-200 ease-out'
    );

    const variantStyles = {
      default: clsx(
        'bg-[var(--color-surface)]',
        'border border-[var(--color-border)]',
        'shadow-[var(--shadow-card)]',
        interactive && 'hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--color-border-strong)]'
      ),
      glass: clsx(
        'glass-card'
      ),
      'gradient-border': clsx(
        'bg-[var(--color-surface)]',
        // Gradient border using pseudo-element
        'before:absolute before:inset-0 before:rounded-lg before:p-[1px]',
        'before:bg-[var(--gradient-forge)]',
        'before:-z-10',
        'after:absolute after:inset-[1px] after:rounded-[11px] after:bg-[var(--color-surface)]',
        'after:-z-10'
      ),
      elevated: clsx(
        'bg-[var(--color-surface)]',
        'shadow-[var(--shadow-card-hover)]',
        interactive && 'hover:shadow-[var(--shadow-glow-forge)]'
      ),
      flat: clsx(
        'bg-[var(--color-background-muted)]',
        'border border-[var(--color-border)]'
      ),
      glow: clsx(
        'bg-[var(--color-surface)]',
        'border border-[var(--color-border)]',
        'shadow-[var(--shadow-card)]',
        'hover:shadow-[var(--shadow-card-hover)] hover:border-[rgba(249,115,22,0.3)]',
        'transition-all duration-300'
      ),
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const interactiveStyles = interactive
      ? 'cursor-pointer hover:-translate-y-0.5'
      : '';

    const shineStyles = shine
      ? clsx(
          'overflow-hidden',
          'before:absolute before:inset-0',
          'before:bg-gradient-to-br before:from-[var(--forge-500)]/10 before:to-transparent',
          'before:opacity-0 before:transition-opacity before:duration-200',
          'hover:before:opacity-100'
        )
      : '';

    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          interactiveStyles,
          shineStyles,
          className
        )}
        {...props}
      >
        {header && (
          <div className={clsx(
            'border-b border-[var(--color-border)]',
            padding !== 'none' && paddingStyles[padding]
          )}>
            {header}
          </div>
        )}

        <div className={clsx(paddingStyles[padding], 'relative z-10')}>
          {children}
        </div>

        {footer && (
          <div className={clsx(
            'border-t border-[var(--color-border)] bg-[var(--color-background-muted)]',
            padding !== 'none' && paddingStyles[padding],
            'rounded-b-lg'
          )}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Sub-components for semantic structure
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, description, action, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex items-start justify-between gap-4', className)}
      {...props}
    >
      <div className="space-y-1">
        {title && (
          <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-[var(--color-foreground-muted)]">{description}</p>
        )}
        {children}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex items-center justify-end gap-3', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
