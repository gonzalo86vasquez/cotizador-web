'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant */
  variant?: 'default' | 'glass' | 'gradient-border' | 'elevated' | 'flat';
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
 * Card Component
 *
 * A flexible card component with multiple visual variants including
 * glassmorphism and gradient borders. Inspired by Stripe's card design.
 *
 * @example
 * ```tsx
 * <Card variant="default" padding="lg">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * <Card variant="glass" interactive>
 *   Interactive glass card
 * </Card>
 *
 * <Card variant="gradient-border" shine>
 *   Premium card with gradient border
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
      'rounded-2xl',
      'transition-all duration-200 ease-out'
    );

    const variantStyles = {
      default: clsx(
        'bg-white',
        'border border-neutral-100',
        'shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)]',
        interactive && 'hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_8px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.08)]'
      ),
      glass: clsx(
        'bg-white/80',
        'backdrop-blur-xl',
        'border border-white/50',
        'shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.04)]'
      ),
      'gradient-border': clsx(
        'bg-white',
        // Gradient border using pseudo-element
        'before:absolute before:inset-0 before:rounded-2xl before:p-[1px]',
        'before:bg-gradient-to-r before:from-violet-600 before:via-purple-600 before:to-cyan-500',
        'before:-z-10',
        'after:absolute after:inset-[1px] after:rounded-[15px] after:bg-white',
        'after:-z-10'
      ),
      elevated: clsx(
        'bg-white',
        'shadow-xl',
        interactive && 'hover:shadow-2xl'
      ),
      flat: clsx(
        'bg-neutral-50',
        'border border-neutral-100'
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
          'before:bg-gradient-to-br before:from-white/10 before:to-transparent',
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
            'border-b border-neutral-100',
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
            'border-t border-neutral-100 bg-neutral-50/50',
            padding !== 'none' && paddingStyles[padding],
            'rounded-b-2xl'
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
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-neutral-500">{description}</p>
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
