'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'forge' | 'iron' | 'ghost' | 'danger' | 'outline-forge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  isIconOnly?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'forge',
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
      'inline-flex items-center justify-center gap-2',
      'font-semibold leading-tight',
      'rounded-lg',
      'transition-all duration-150 ease-out',
      'cursor-pointer select-none whitespace-nowrap',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'active:scale-[0.98]'
    );

    const variantStyles = {
      forge: clsx(
        'bg-[var(--forge-600)] text-white',
        'shadow-[0_4px_14px_0_rgba(249,115,22,0.25)]',
        'hover:bg-[var(--forge-500)] hover:shadow-[0_6px_20px_0_rgba(249,115,22,0.35)]',
        'focus-visible:ring-[var(--forge-500)]'
      ),
      iron: clsx(
        'bg-[var(--iron-800)] text-[var(--iron-50)]',
        'border border-[var(--color-border)] shadow-sm',
        'hover:bg-[var(--iron-700)]',
        'focus-visible:ring-[var(--forge-500)]',
        // Light theme variant
        '[data-theme="light"]_&:bg-[var(--slate-100)]',
        '[data-theme="light"]_&:text-[var(--slate-900)]',
        '[data-theme="light"]_&:hover:bg-[var(--slate-200)]'
      ),
      ghost: clsx(
        'bg-transparent text-[var(--color-foreground-muted)]',
        'hover:bg-[var(--color-background-muted)] hover:text-[var(--color-foreground)]',
        'focus-visible:ring-[var(--forge-500)]'
      ),
      danger: clsx(
        'bg-[var(--color-error)] text-white shadow-sm',
        'hover:brightness-110',
        'focus-visible:ring-[var(--color-error)]'
      ),
      'outline-forge': clsx(
        'bg-transparent text-[var(--forge-500)]',
        'border border-[var(--forge-500)]',
        'hover:bg-[var(--color-primary-light)] hover:border-[var(--forge-600)]',
        'focus-visible:ring-[var(--forge-500)]'
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
            {leftIcon && <span className={clsx(iconSizeStyles[size], 'flex-shrink-0')}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={clsx(iconSizeStyles[size], 'flex-shrink-0')}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
