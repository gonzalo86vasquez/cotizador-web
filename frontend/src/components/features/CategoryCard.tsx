'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { Category } from '@/types';
import { clsx } from 'clsx';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/catalogo?category=${category.slug}`}>
      <article className="group relative h-72 rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_4px_8px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/60 to-neutral-900/20 group-hover:from-neutral-900/90 transition-colors duration-300" />
        </div>

        {/* Glass card effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/10" />
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
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-300 mb-4 line-clamp-2 group-hover:text-neutral-200 transition-colors">
            {category.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-violet-300 group-hover:text-violet-200 transition-colors">
            <span>Ver productos</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl border border-white/10" />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, transparent 50%, rgba(6,182,212,0.3) 100%)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMaskComposite: 'xor',
                padding: '1px',
              }}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
