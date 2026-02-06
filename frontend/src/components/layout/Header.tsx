'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useHydration } from '@/hooks/useHydration';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Catalogo', href: '/catalogo' },
  { name: 'Categorias', href: '/categorias' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const hydrated = useHydration();
  const itemCount = useQuoteStore((state) => state.getItemCount());

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalogo?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-100 shadow-sm'
          : 'bg-transparent'
      )}
    >
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white text-sm py-2">
        <Container size="wide">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              Especialistas en repuestos para molinos SAC
            </span>
            <span className="hidden md:flex items-center gap-4 text-white/90">
              <a href="mailto:contacto@cotizador.cl" className="hover:text-white transition-colors">
                contacto@cotizador.cl
              </a>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <a href="tel:+56223456789" className="hover:text-white transition-colors">
                +56 2 2345 6789
              </a>
            </span>
          </div>
        </Container>
      </div>

      {/* Main header */}
      <Container size="wide">
        <div className="flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
                  <span className="text-white font-bold text-xl tracking-tight">C</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                  CotizadorSAC
                </h1>
                <p className="text-xs text-neutral-500 font-medium tracking-wide">
                  Repuestos Industriales
                </p>
              </div>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div
              className={clsx(
                'relative w-full transition-all duration-200',
                isSearchFocused && 'scale-[1.02]'
              )}
            >
              <div
                className={clsx(
                  'relative flex items-center',
                  'bg-neutral-50 rounded-xl',
                  'border transition-all duration-200',
                  isSearchFocused
                    ? 'border-violet-300 ring-2 ring-violet-500/20 bg-white'
                    : 'border-neutral-200 hover:border-neutral-300'
                )}
              >
                <Search className="absolute left-4 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, SKU o descripcion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full h-11 pl-12 pr-24 bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 h-7 px-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all shadow-sm hover:shadow"
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Quote Cart */}
            <Link href="/cotizacion" className="relative group">
              <div className="flex items-center gap-2 h-11 px-5 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-[length:200%_100%] text-white rounded-xl font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:bg-[100%_0] transition-all duration-300">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Mi Cotizacion</span>
              </div>
              {hydrated && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 text-neutral-900 text-xs font-bold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white animate-scale-in">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
              aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
        </form>
      </Container>

      {/* Navigation */}
      <div className="border-t border-neutral-100">
        <Container size="wide">
          <nav
            className={clsx(
              'md:block',
              isMenuOpen ? 'block' : 'hidden'
            )}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-1 py-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block px-4 py-2.5 md:py-2',
                      'text-neutral-600 font-medium text-sm',
                      'rounded-lg',
                      'hover:text-neutral-900 hover:bg-neutral-50',
                      'transition-colors duration-150'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
