'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, Clock } from 'lucide-react';
import { Product } from '@/types';
import { useQuoteStore } from '@/store/quoteStore';
import { useHydration } from '@/hooks/useHydration';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { clsx } from 'clsx';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const hydrated = useHydration();
  const addItem = useQuoteStore((state) => state.addItem);
  const items = useQuoteStore((state) => state.items);
  const isInQuote = hydrated && items.some((item) => item.product.id === product.id);

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link href={`/producto/${product.id}`}>
      <article className="group relative bg-[var(--color-surface)] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 card-glow hover:shadow-[0_0_0_1px_rgba(245,158,11,0.2),0_8px_24px_rgba(245,158,11,0.12),0_16px_48px_rgba(0,0,0,0.4)]">
        {/* Image Container */}
        <div className="relative h-52 bg-gradient-to-br from-[var(--color-muted)] to-[var(--color-surface-alt)] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            {product.inStock ? (
              <Badge variant="success" dot className="shadow-lg">
                En Stock
              </Badge>
            ) : (
              <Badge variant="warning" dot className="shadow-lg">
                Bajo Pedido
              </Badge>
            )}
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToQuote}
              disabled={!product.availableForQuote}
              className={clsx(
                'w-full py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all backdrop-blur-sm',
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : isInQuote
                    ? 'bg-white/90 text-forge-700'
                    : product.availableForQuote
                      ? 'bg-white/90 text-[var(--color-foreground)] hover:bg-white'
                      : 'bg-[var(--color-muted)] text-[var(--color-foreground-subtle)] cursor-not-allowed'
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Agregado
                </>
              ) : isInQuote ? (
                <>
                  <Check className="w-4 h-4" />
                  En cotizacion
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Agregar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="text-xs text-forge-600 font-semibold uppercase tracking-wider">
            {product.categoryName}
          </span>

          <h3 className="mt-2 font-semibold text-[var(--color-foreground)] line-clamp-2 group-hover:text-forge-500 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-[var(--color-foreground-subtle)] font-mono">
            SKU: {product.sku}
          </p>

          {/* Compatible Models */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.compatibleModels.slice(0, 2).map((model) => (
              <span
                key={model}
                className="text-xs bg-[var(--color-muted)] text-[var(--color-foreground-muted)] px-2 py-1 rounded-lg font-medium"
              >
                {model}
              </span>
            ))}
            {product.compatibleModels.length > 2 && (
              <span className="text-xs text-[var(--color-foreground-subtle)] px-2 py-1">
                +{product.compatibleModels.length - 2} mas
              </span>
            )}
          </div>

          {/* Delivery Time */}
          <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[var(--color-foreground-muted)]">
              <Clock className="w-4 h-4 text-[var(--color-foreground-subtle)]" />
              <span>{product.estimatedDeliveryDays} dias</span>
            </div>

            {/* Mobile add button */}
            <button
              onClick={handleAddToQuote}
              disabled={!product.availableForQuote}
              className={clsx(
                'md:hidden p-2.5 rounded-lg transition-all',
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : isInQuote
                    ? 'bg-forge-100 text-forge-700'
                    : product.availableForQuote
                      ? 'bg-forge-600 text-white hover:bg-forge-700'
                      : 'bg-[var(--color-muted)] text-[var(--color-foreground-subtle)] cursor-not-allowed'
              )}
              aria-label={isAdded ? 'Agregado' : isInQuote ? 'En cotizacion' : 'Agregar a cotizacion'}
            >
              {isAdded || isInQuote ? (
                <Check className="w-5 h-5" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
