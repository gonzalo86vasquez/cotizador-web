'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/catalogo?category=${category.slug}`}>
      <article className="group relative h-72 rounded-lg overflow-hidden card-glow hover:shadow-[0_0_0_1px_rgba(245,158,11,0.2),0_8px_24px_rgba(245,158,11,0.12),0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/95 via-[var(--color-background)]/60 to-[var(--color-background)]/20 group-hover:from-[var(--color-background)]/90 transition-colors duration-300" />
        </div>

        {/* Forge overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-forge-600/10 via-transparent to-forge-400/5" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6">
          {/* Product count badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/10">
              <Package className="w-4 h-4" />
              {category.productCount} productos
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-forge-200 transition-colors">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-300 mb-4 line-clamp-2 group-hover:text-neutral-200 transition-colors">
            {category.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-forge-300 group-hover:text-forge-200 transition-colors">
            <span>Ver productos</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-lg border border-forge-400/20" />
          </div>
        </div>
      </article>
    </Link>
  );
}
