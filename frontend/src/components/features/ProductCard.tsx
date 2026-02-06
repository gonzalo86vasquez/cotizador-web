'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check, Clock, Package } from 'lucide-react';
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
      <article className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_8px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.08)]">
        {/* Image Container */}
        <div className="relative h-52 bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay on hover */}
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

          {/* Quick add overlay - appears on hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToQuote}
              disabled={!product.availableForQuote}
              className={clsx(
                'w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all backdrop-blur-sm',
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : isInQuote
                    ? 'bg-white/90 text-violet-700'
                    : product.availableForQuote
                      ? 'bg-white/90 text-neutral-900 hover:bg-white'
                      : 'bg-neutral-200/90 text-neutral-500 cursor-not-allowed'
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
          {/* Category */}
          <span className="text-xs text-violet-600 font-semibold uppercase tracking-wider">
            {product.categoryName}
          </span>

          {/* Name */}
          <h3 className="mt-2 font-semibold text-neutral-900 line-clamp-2 group-hover:text-violet-600 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* SKU */}
          <p className="mt-2 text-sm text-neutral-500 font-mono">
            SKU: {product.sku}
          </p>

          {/* Compatible Models */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.compatibleModels.slice(0, 2).map((model) => (
              <span
                key={model}
                className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg font-medium"
              >
                {model}
              </span>
            ))}
            {product.compatibleModels.length > 2 && (
              <span className="text-xs text-neutral-400 px-2 py-1">
                +{product.compatibleModels.length - 2} mas
              </span>
            )}
          </div>

          {/* Delivery Time */}
          <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>{product.estimatedDeliveryDays} dias</span>
            </div>

            {/* Mobile add button */}
            <button
              onClick={handleAddToQuote}
              disabled={!product.availableForQuote}
              className={clsx(
                'md:hidden p-2.5 rounded-xl transition-all',
                isAdded
                  ? 'bg-emerald-500 text-white'
                  : isInQuote
                    ? 'bg-violet-100 text-violet-700'
                    : product.availableForQuote
                      ? 'bg-violet-600 text-white hover:bg-violet-700'
                      : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              )}
              aria-label={isAdded ? 'Agregado' : isInQuote ? 'En cotizacion' : 'Agregar a cotizacion'}
            >
              {isAdded ? (
                <Check className="w-5 h-5" />
              ) : isInQuote ? (
                <Check className="w-5 h-5" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        </div>
      </article>
    </Link>
  );
}
