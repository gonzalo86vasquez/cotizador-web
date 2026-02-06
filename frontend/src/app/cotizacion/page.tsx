'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Trash2, Send, CheckCircle } from 'lucide-react';
import { QuoteItemCard } from '@/components/features/QuoteItemCard';
import { useQuoteStore } from '@/store/quoteStore';
import { useHydration } from '@/hooks/useHydration';

export default function CotizacionPage() {
  const hydrated = useHydration();
  const { items, clearQuote, getTotalItems } = useQuoteStore();
  const [step, setStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rut: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    requestedDate: '',
    observations: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setStep('success');
  };

  const quoteNumber = `COT-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;

  // Wait for hydration to avoid mismatch
  if (!hydrated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Cotización Enviada!
          </h1>
          <p className="text-gray-600 mb-2">
            Tu solicitud ha sido recibida exitosamente.
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-6">{quoteNumber}</p>
          <div className="bg-blue-50 rounded-lg p-6 text-left mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">¿Qué sigue?</h3>
            <ul className="text-gray-600 space-y-2">
              <li>1. Recibirás un email de confirmación en breve</li>
              <li>2. Nuestro equipo revisará tu solicitud</li>
              <li>3. Te contactaremos en menos de 24 horas con la cotización formal</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tu cotización está vacía
          </h1>
          <p className="text-gray-600 mb-8">
            Agrega productos desde el catálogo para comenzar tu solicitud de cotización.
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Explorar catálogo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Cotización</h1>
      <p className="text-gray-600 mb-8">
        {step === 'cart' ? 'Revisa los productos seleccionados' : 'Completa tus datos para enviar la solicitud'}
      </p>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 'cart' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
            1
          </div>
          <span className="ml-2 font-medium text-gray-900">Productos</span>
        </div>
        <div className="w-16 h-1 mx-4 bg-gray-200">
          <div className={`h-full bg-blue-600 transition-all ${step !== 'cart' ? 'w-full' : 'w-0'}`} />
        </div>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <span className={`ml-2 font-medium ${step === 'form' ? 'text-gray-900' : 'text-gray-500'}`}>Datos</span>
        </div>
      </div>

      {step === 'cart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <QuoteItemCard key={item.product.id} item={item} />
            ))}

            <button
              onClick={clearQuote}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <Trash2 className="w-5 h-5" />
              Vaciar cotización
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Productos</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Unidades totales</span>
                  <span>{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Items urgentes</span>
                  <span className="text-orange-600">
                    {items.filter((i) => i.urgency === 'urgent').length}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  Los precios serán informados en la cotización formal que recibirás por email.
                </p>
                <button
                  onClick={() => setStep('form')}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa / Faena *</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RUT Empresa</label>
                <input
                  type="text"
                  name="rut"
                  placeholder="12.345.678-9"
                  value={formData.rut}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información de Entrega</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Región *</label>
                <select
                  name="region"
                  required
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar región</option>
                  <option value="I">I - Tarapacá</option>
                  <option value="II">II - Antofagasta</option>
                  <option value="III">III - Atacama</option>
                  <option value="IV">IV - Coquimbo</option>
                  <option value="V">V - Valparaíso</option>
                  <option value="RM">RM - Metropolitana</option>
                  <option value="VI">VI - O'Higgins</option>
                  <option value="VII">VII - Maule</option>
                  <option value="VIII">VIII - Biobío</option>
                  <option value="IX">IX - Araucanía</option>
                  <option value="X">X - Los Lagos</option>
                  <option value="XI">XI - Aysén</option>
                  <option value="XII">XII - Magallanes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha requerida</label>
                <input
                  type="date"
                  name="requestedDate"
                  value={formData.requestedDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Observaciones</h2>
            <textarea
              name="observations"
              rows={4}
              placeholder="Información adicional, especificaciones especiales, etc."
              value={formData.observations}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
            >
              Volver
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar Cotización
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
