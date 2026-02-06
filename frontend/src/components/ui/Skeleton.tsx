'use client';

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Predefined shape */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Number of text lines to show */
  lines?: number;
  /** Animation style */
  animation?: 'pulse' | 'shimmer' | 'none';
}

/**
 * Skeleton Component
 *
 * A placeholder loading component that mimics content structure.
 * Features a smooth shimmer animation for better perceived performance.
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" width="80%" />
 *
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * <Skeleton variant="rounded" width="100%" height={200} />
 *
 * <Skeleton variant="text" lines={3} />
 * ```
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  animation = 'shimmer',
  className,
  style,
  ...props
}: SkeletonProps) {
  const baseStyles = clsx(
    'bg-neutral-200',
    animation === 'shimmer' && [
      'relative overflow-hidden',
      'before:absolute before:inset-0',
      'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
      'before:animate-[shimmer_2s_infinite]',
      'before:-translate-x-full',
    ],
    animation === 'pulse' && 'animate-pulse'
  );

  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const computedStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  // For multi-line text skeletons
  if (variant === 'text' && lines > 1) {
    return (
      <div className={clsx('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={clsx(baseStyles, variantStyles.text)}
            style={{
              width: index === lines - 1 ? '60%' : '100%',
              ...computedStyle,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(baseStyles, variantStyles[variant], className)}
      style={computedStyle}
      {...props}
    />
  );
}

// Preset skeleton components
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={clsx('rounded-2xl border border-neutral-100 p-6 space-y-4', className)}>
      <Skeleton variant="rounded" height={200} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" lines={2} />
      <div className="flex gap-2">
        <Skeleton variant="rounded" width={80} height={28} />
        <Skeleton variant="rounded" width={80} height={28} />
      </div>
    </div>
  );
}

export function SkeletonProductCard({ className }: { className?: string }) {
  return (
    <div className={clsx('rounded-2xl border border-neutral-100 overflow-hidden', className)}>
      <Skeleton variant="rectangular" height={192} />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="50%" />
        <div className="flex gap-2 pt-2">
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
        </div>
        <Skeleton variant="rounded" height={40} />
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = 48 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

export function SkeletonButton({ width = 120 }: { width?: number | string }) {
  return <Skeleton variant="rounded" width={width} height={40} />;
}

export default Skeleton;
