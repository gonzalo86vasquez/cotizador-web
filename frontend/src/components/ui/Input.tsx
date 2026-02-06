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
 * Input Component
 *
 * A polished text input with support for labels, icons, and validation states.
 * Features a subtle focus ring animation inspired by Stripe's input design.
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
      'w-full rounded-xl border bg-white',
      'text-neutral-900 placeholder:text-neutral-400',
      'transition-all duration-150 ease-out',
      // Focus
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      // Hover (when not focused or disabled)
      'hover:border-neutral-300',
      // Size
      sizeStyles[size].input,
      sizeStyles[size].padding,
      sizeStyles[size].paddingRight,
      // States
      hasError
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
        : hasSuccess
          ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20'
          : 'border-neutral-200 focus:border-violet-500 focus:ring-violet-500/20',
      // Disabled
      disabled && 'bg-neutral-50 cursor-not-allowed opacity-60',
      className
    );

    return (
      <div className={clsx('space-y-1.5', fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-neutral-700"
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
                'text-neutral-400 pointer-events-none',
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
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            {hasSuccess && !isPassword && (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            )}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
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
              <span className={clsx('text-neutral-400', sizeStyles[size].icon)}>
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
                ? 'text-red-600'
                : hasSuccess
                  ? 'text-emerald-600'
                  : 'text-neutral-500'
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
