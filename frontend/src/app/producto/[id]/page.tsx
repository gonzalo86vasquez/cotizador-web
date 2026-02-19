'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShoppingCart, Check, Clock, ChevronLeft, ChevronRight, Plus, Minus, Truck, Shield, Package } from 'lucide-react';
import { getProductById } from '@/data/mock';
import { useQuoteStore } from '@/store/quoteStore';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useHydration } from '@/hooks/useHydration';

export default function ProductoPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = getProductById(productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const hydrated = useHydration();
  const addItem = useQuoteStore((state) => state.addItem);
  const items = useQuoteStore((state) => state.items);
  const isInQuote = hydrated && items.some((item) => item.product.id === productId);

  if (!product) {
    return (
      <Container size="narrow" section="xl" centered>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <Package className="w-10 h-10 text-neutral-400" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Producto no encontrado</h1>
          <p className="text-neutral-600 mb-8">El producto que buscas no existe o fue eliminado.</p>
          <Button
            variant="forge"
            size="lg"
            leftIcon={<ChevronLeft />}
            onClick={() => window.location.href = '/catalogo'}
          >
            Volver al catálogo
          </Button>
        </div>
      </Container>
    );
  }

  const handleAddToQuote = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Container size="wide" section="md">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-neutral-500 hover:text-teal-600 transition-colors"
            >
              Inicio
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li>
            <Link
              href="/catalogo"
              className="text-neutral-500 hover:text-teal-600 transition-colors"
            >
              Catálogo
            </Link>
          </li>
          <li className="text-neutral-300">/</li>
          <li className="text-neutral-900 font-medium truncate max-w-xs">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Back button */}
      <Button
        variant="ghost"
        size="md"
        leftIcon={<ChevronLeft />}
        className="mb-8"
        onClick={() => window.location.href = '/catalogo'}
      >
        Volver al catálogo
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div>
          {/* Main Image */}
          <Card variant="default" padding="none" className="overflow-hidden mb-4 group">
            <div className="relative aspect-square bg-neutral-50">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                priority
              />
              {/* Availability Badge */}
              <div className="absolute top-4 right-4">
                {product.inStock ? (
                  <Badge variant="success" size="lg" dot>
                    En Stock
                  </Badge>
                ) : (
                  <Badge variant="warning" size="lg" dot>
                    Bajo Pedido
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-teal-600 ring-2 ring-teal-500/20'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - vista ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Category */}
          <Badge variant="forge" size="md" className="mb-3">
            {product.categoryName}
          </Badge>

          {/* Product Name */}
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-3">
            {product.name}
          </h1>

          {/* SKU */}
          <p className="text-neutral-500 mb-6">SKU: <span className="font-mono">{product.sku}</span></p>

          {/* Description */}
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Compatible Models */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-3">
              Modelos Compatibles
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.compatibleModels.map((model) => (
                <Badge key={model} variant="default" size="md">
                  {model}
                </Badge>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <Card variant="elevated" padding="md" className="mb-8 bg-teal-50 border-teal-100">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white shadow-sm">
                <Truck className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-neutral-900 mb-1">
                  Tiempo estimado de entrega: {product.estimatedDeliveryDays} días
                </p>
                <p className="text-sm text-neutral-600">
                  {product.inStock
                    ? 'Disponible para despacho inmediato'
                    : 'Tiempo de fabricación incluido'}
                </p>
              </div>
            </div>
          </Card>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-3">
              Cantidad
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-600 hover:bg-neutral-50 transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center font-semibold text-neutral-900 border-x border-neutral-200 py-3 focus:outline-none focus:bg-neutral-50"
                  aria-label="Cantidad"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-neutral-600 hover:bg-neutral-50 transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm text-neutral-500">unidades</span>
            </div>
          </div>

          {/* Add to Quote Button */}
          <div className="space-y-3 mb-8">
            <Button
              variant={isAdded ? 'iron' : 'forge'}
              size="xl"
              fullWidth
              onClick={handleAddToQuote}
              disabled={!product.availableForQuote}
              leftIcon={
                isAdded ? <Check /> : <ShoppingCart />
              }
            >
              {isAdded
                ? 'Agregado a la cotización'
                : isInQuote
                  ? 'Agregar más unidades'
                  : 'Agregar a cotización'}
            </Button>

            {isInQuote && (
              <Button
                variant="outline-forge"
                size="lg"
                fullWidth
                rightIcon={<ChevronRight />}
                onClick={() => window.location.href = '/cotizacion'}
              >
                Ver mi cotización
              </Button>
            )}
          </div>

          {/* Guarantee */}
          <Card variant="flat" padding="md" className="border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-neutral-900 text-sm">Garantía de Calidad</p>
                <p className="text-xs text-neutral-600">Productos certificados y garantizados</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Especificaciones Técnicas
        </h2>
        <Card variant="default" padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                  <tr
                    key={key}
                    className={`border-b border-neutral-100 last:border-0 transition-colors hover:bg-neutral-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-neutral-900 w-1/3">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  );
}
