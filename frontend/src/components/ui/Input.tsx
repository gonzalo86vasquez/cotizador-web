'use client';

import { forwardRef, InputHTMLAttributes, ReactNode, useState, useId } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label for the input */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (also sets error state) */
  error?: string;
  /** Success message (also sets success state) */
  success?: string;
  /** Icon to show on the left side */
  leftIcon?: ReactNode;
  /** Icon to show on the right side */
  rightIcon?: ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Input Component - FORGE Design System
 *
 * A polished text input with theme-aware styling.
 * Features forge-orange focus rings and semantic validation states.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   leftIcon={<Mail />}
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password is required"
 * />
 *
 * <Input
 *   label="Username"
 *   success="Username is available"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      size = 'md',
      fullWidth = true,
      type = 'text',
      disabled,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    const sizeStyles = {
      sm: {
        input: 'h-8 text-sm',
        icon: 'w-4 h-4',
        padding: leftIcon ? 'pl-8' : 'pl-3',
        paddingRight: rightIcon || isPassword ? 'pr-8' : 'pr-3',
      },
      md: {
        input: 'h-10 text-sm',
        icon: 'w-5 h-5',
        padding: leftIcon ? 'pl-10' : 'pl-3',
        paddingRight: rightIcon || isPassword ? 'pr-10' : 'pr-3',
      },
      lg: {
        input: 'h-12 text-base',
        icon: 'w-5 h-5',
        padding: leftIcon ? 'pl-12' : 'pl-4',
        paddingRight: rightIcon || isPassword ? 'pr-12' : 'pr-4',
      },
    };

    const inputStyles = clsx(
      // Base
      'w-full rounded-lg border bg-[var(--color-surface)]',
      'text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)]',
      'transition-all duration-150 ease-out',
      // Focus
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      // Hover (when not focused or disabled)
      'hover:border-[var(--color-border-strong)]',
      // Size
      sizeStyles[size].input,
      sizeStyles[size].padding,
      sizeStyles[size].paddingRight,
      // States
      hasError
        ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
        : hasSuccess
          ? 'border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-[var(--color-success)]/20'
          : 'border-[var(--color-border)] focus:border-[var(--forge-500)] focus:ring-[var(--color-primary-light)]',
      // Disabled
      disabled && 'bg-[var(--color-background-muted)] cursor-not-allowed opacity-60',
      className
    );

    return (
      <div className={clsx('space-y-1.5', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[var(--color-foreground)]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={clsx(
                'absolute left-3 top-1/2 -translate-y-1/2',
                'text-[var(--color-foreground-subtle)] pointer-events-none',
                sizeStyles[size].icon
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={inputType}
            disabled={disabled}
            className={inputStyles}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            {...props}
          />

          {/* Right Icon / Password Toggle / Status Icon */}
          <div
            className={clsx(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'flex items-center gap-2'
            )}
          >
            {hasError && !isPassword && (
              <AlertCircle className="w-5 h-5 text-[var(--color-error)]" />
            )}
            {hasSuccess && !isPassword && (
              <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />
            )}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground)] focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className={sizeStyles[size].icon} />
                ) : (
                  <Eye className={sizeStyles[size].icon} />
                )}
              </button>
            )}
            {rightIcon && !isPassword && !hasError && !hasSuccess && (
              <span className={clsx('text-[var(--color-foreground-subtle)]', sizeStyles[size].icon)}>
                {rightIcon}
              </span>
            )}
          </div>
        </div>

        {/* Helper Text / Error / Success */}
        {(error || success || helperText) && (
          <p
            id={error ? `${id}-error` : `${id}-helper`}
            className={clsx(
              'text-sm',
              hasError
                ? 'text-[var(--color-error)]'
                : hasSuccess
                  ? 'text-[var(--color-success)]'
                  : 'text-[var(--color-foreground-muted)]'
            )}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
