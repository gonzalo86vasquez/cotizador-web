'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Show loading spinner and disable button */
  isLoading?: boolean;
  /** Icon to show before children */
  leftIcon?: ReactNode;
  /** Icon to show after children */
  rightIcon?: ReactNode;
  /** Make button full width */
  fullWidth?: boolean;
  /** Make button square (for icon-only buttons) */
  isIconOnly?: boolean;
}

/**
 * Button Component
 *
 * A versatile button component with multiple variants, sizes, and states.
 * Inspired by Stripe's clean, professional button design.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 *
 * <Button variant="secondary" leftIcon={<Plus />}>
 *   Add Item
 * </Button>
 *
 * <Button variant="primary" isLoading>
 *   Processing...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      isIconOnly = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const baseStyles = clsx(
      // Base
      'inline-flex items-center justify-center gap-2',
      'font-medium leading-tight',
      'rounded-xl',
      'transition-all duration-150 ease-out',
      'cursor-pointer select-none whitespace-nowrap',
      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      // Disabled
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      // Active
      'active:scale-[0.98]'
    );

    const variantStyles = {
      primary: clsx(
        'bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500',
        'text-white',
        'shadow-[0_4px_14px_0_rgba(139,92,246,0.25)]',
        'hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.35)]',
        'hover:brightness-105',
        'focus-visible:ring-violet-500'
      ),
      secondary: clsx(
        'bg-white',
        'text-neutral-900',
        'border border-neutral-200',
        'shadow-sm',
        'hover:bg-neutral-50 hover:border-neutral-300',
        'focus-visible:ring-neutral-400'
      ),
      ghost: clsx(
        'bg-transparent',
        'text-neutral-600',
        'hover:bg-neutral-100 hover:text-neutral-900',
        'focus-visible:ring-neutral-400'
      ),
      danger: clsx(
        'bg-red-600',
        'text-white',
        'shadow-sm',
        'hover:bg-red-500',
        'focus-visible:ring-red-500'
      ),
      outline: clsx(
        'bg-transparent',
        'text-violet-600',
        'border border-violet-200',
        'hover:bg-violet-50 hover:border-violet-300',
        'focus-visible:ring-violet-500'
      ),
    };

    const sizeStyles = {
      xs: clsx('h-7 px-2.5 text-xs', isIconOnly && 'w-7 px-0'),
      sm: clsx('h-8 px-3 text-sm', isIconOnly && 'w-8 px-0'),
      md: clsx('h-10 px-4 text-sm', isIconOnly && 'w-10 px-0'),
      lg: clsx('h-12 px-6 text-base', isIconOnly && 'w-12 px-0'),
      xl: clsx('h-14 px-8 text-lg', isIconOnly && 'w-14 px-0'),
    };

    const iconSizeStyles = {
      xs: 'w-3.5 h-3.5',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className={clsx(iconSizeStyles[size], 'animate-spin')} />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className={clsx(iconSizeStyles[size], 'flex-shrink-0')}>
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className={clsx(iconSizeStyles[size], 'flex-shrink-0')}>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
