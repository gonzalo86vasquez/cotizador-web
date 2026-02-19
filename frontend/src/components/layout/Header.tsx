'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/store/quoteStore';
import { Container } from '@/components/ui/Container';
import { useHydration } from '@/hooks/useHydration';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Categorías', href: '/categorias' },
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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
        'sticky top-0 z-50 bg-[var(--color-surface)] transition-all duration-300',
        isScrolled
          ? 'border-b border-[var(--color-border)] shadow-sm'
          : 'border-b border-[var(--color-border-muted)]'
      )}
    >
      {/* Top info bar */}
      <div className="bg-[var(--iron-900)] border-b border-slate-800">
        <Container size="wide">
          <div className="flex justify-between items-center py-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-forge-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs tracking-[0.12em] text-[var(--color-foreground-muted)] uppercase font-medium">
                Especialistas en Molinos SAC · Chile
              </span>
            </div>
            <div className="hidden md:flex items-center gap-5 text-xs tracking-wide">
              <a
                href="mailto:contacto@cotizador.cl"
                className="text-[var(--color-foreground-muted)] hover:text-forge-400 transition-colors duration-150"
              >
                contacto@cotizador.cl
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="tel:+56223456789"
                className="text-[var(--color-foreground-muted)] hover:text-forge-400 transition-colors duration-150"
              >
                +56 2 2345 6789
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main header */}
      <Container size="wide">
        <div className="flex items-center justify-between gap-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forge-600 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-forge-700 group-hover:shadow-[0_4px_14px_rgba(245,158,11,0.35)]">
                <span
                  className="text-white font-extrabold text-lg leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  CS
                </span>
              </div>
              <div className="hidden sm:block">
                <div
                  className="text-[var(--color-foreground)] leading-none"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}
                >
                  Cotizador<span className="text-forge-600">SAC</span>
                </div>
                <div className="text-xs tracking-[0.12em] text-[var(--color-foreground-muted)] uppercase mt-0.5 font-medium">
                  Repuestos Industriales
                </div>
              </div>
            </div>
          </Link>

          {/* Search — Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <div
                className={clsx(
                  'relative flex items-center rounded-lg overflow-hidden transition-all duration-200',
                  isSearchFocused
                    ? 'ring-2 ring-forge-500/30 border-forge-400'
                    : 'border-[var(--color-border)]',
                  'border bg-[var(--color-background-muted)]'
                )}
              >
                <Search
                  className={clsx('absolute left-3.5 w-4 h-4', isSearchFocused ? 'text-forge-500' : 'text-[var(--color-foreground-muted)]')}
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre, SKU o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full h-10 pl-10 pr-20 bg-transparent text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 h-7 px-3 bg-forge-600 hover:bg-forge-700 text-white text-xs font-semibold rounded-lg transition-colors duration-150"
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/cotizacion" className="relative group">
              <div className="flex items-center gap-2 h-10 px-4 bg-forge-600 hover:bg-forge-700 text-white font-semibold rounded-lg transition-all duration-200 text-sm">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Mi Cotización</span>
              </div>
              {hydrated && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-emerald-500 text-white ring-2 ring-white animate-scale-in"
                  style={{ fontSize: '0.65rem' }}
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--color-foreground-muted)] hover:bg-[var(--color-background-muted)] transition-colors"
              aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search — Mobile */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative flex items-center rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-background-muted)]">
            <Search className="absolute left-3.5 w-4 h-4 text-[var(--color-foreground-muted)]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-transparent text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none text-sm"
            />
          </div>
        </form>
      </Container>

      {/* Navigation bar */}
      <div className="border-t border-[var(--color-border-muted)] bg-[var(--color-background-muted)]">
        <Container size="wide">
          <nav className={clsx('md:block', isMenuOpen ? 'block' : 'hidden')}>
            <ul className="flex flex-col md:flex-row md:items-center py-0.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2.5 md:py-2 text-sm font-semibold tracking-wide text-[var(--color-foreground-muted)] hover:text-forge-600 transition-colors duration-150"
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
