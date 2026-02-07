'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Grid, List, X, Search } from 'lucide-react';
import { ProductCard } from '@/components/features/ProductCard';
import { products, categories, searchProducts, getCategoryBySlug } from '@/data/mock';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [availability, setAvailability] = useState<'all' | 'inStock' | 'onOrder'>('all');

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : [...products];

    if (selectedCategory) {
      const category = getCategoryBySlug(selectedCategory);
      if (category) {
        result = result.filter((p) => p.categoryId === category.id);
      }
    }

    if (availability === 'inStock') {
      result = result.filter((p) => p.inStock);
    } else if (availability === 'onOrder') {
      result = result.filter((p) => !p.inStock);
    }

    return result;
  }, [searchQuery, selectedCategory, availability]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setAvailability('all');
  };

  const hasFilters = searchQuery || selectedCategory || availability !== 'all';

  return (
    <Container size="wide" section="md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Catálogo de Productos
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          Explora nuestra línea completa de repuestos para molinos SAC
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <Card variant="glass" padding="lg" className="sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">Filtros</h2>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  Limpiar
                </Button>
              )}
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search />}
                size="md"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 border border-neutral-200 rounded-xl bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 hover:border-neutral-300 transition-all duration-150"
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Disponibilidad
              </label>
              <div className="space-y-3">
                {[
                  { value: 'all', label: 'Todos' },
                  { value: 'inStock', label: 'En stock' },
                  { value: 'onOrder', label: 'Bajo pedido' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === opt.value}
                      onChange={() => setAvailability(opt.value as typeof availability)}
                      className="w-4 h-4 text-violet-600 border-neutral-300 focus:ring-violet-500/20 focus:ring-2 transition-all"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <Card variant="default" padding="md" className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowFilters(true)}
                  leftIcon={<Filter />}
                  className="lg:hidden"
                >
                  Filtros
                </Button>
                <span className="text-sm font-medium text-neutral-600">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-neutral-200 rounded-lg p-1 bg-neutral-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-violet-600 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                  aria-label="Vista en grilla"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-violet-600 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                  aria-label="Vista en lista"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm font-medium text-neutral-500">Filtros activos:</span>
              {searchQuery && (
                <Badge
                  variant="primary"
                  size="md"
                  className="cursor-pointer hover:bg-violet-200 transition-colors"
                >
                  Búsqueda: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-violet-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge
                  variant="primary"
                  size="md"
                  className="cursor-pointer hover:bg-violet-200 transition-colors"
                >
                  {getCategoryBySlug(selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-1 hover:text-violet-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              )}
              {availability !== 'all' && (
                <Badge
                  variant="primary"
                  size="md"
                  className="cursor-pointer hover:bg-violet-200 transition-colors"
                >
                  {availability === 'inStock' ? 'En stock' : 'Bajo pedido'}
                  <button
                    onClick={() => setAvailability('all')}
                    className="ml-1 hover:text-violet-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card variant="default" padding="xl" className="text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-neutral-600 mb-6">
                  No hay productos que coincidan con los filtros seleccionados.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={clearFilters}
                >
                  Limpiar filtros
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Filtros</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Cerrar filtros"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Buscar por nombre o SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search />}
                  size="md"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Categoría
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 border border-neutral-200 rounded-xl bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Disponibilidad
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'inStock', label: 'En stock' },
                    { value: 'onOrder', label: 'Bajo pedido' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="availability-mobile"
                        checked={availability === opt.value}
                        onChange={() => setAvailability(opt.value as typeof availability)}
                        className="w-4 h-4 text-violet-600 border-neutral-300 focus:ring-violet-500/20 focus:ring-2 transition-all"
                      />
                      <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-neutral-100">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={clearFilters}
                  fullWidth
                >
                  Limpiar
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowFilters(false)}
                  fullWidth
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <Container size="wide" section="lg">
        <div className="animate-pulse">
          <div className="h-10 bg-neutral-200 rounded-lg w-64 mb-4"></div>
          <div className="h-6 bg-neutral-200 rounded-lg w-96 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-neutral-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </Container>
    }>
      <CatalogoContent />
    </Suspense>
  );
}
