'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';
import { QuoteItem } from '@/types';
import { useQuoteStore } from '@/store/quoteStore';

interface QuoteItemCardProps {
  item: QuoteItem;
}

export function QuoteItemCard({ item }: QuoteItemCardProps) {
  const { updateQuantity, updateNotes, updateUrgency, removeItem } = useQuoteStore();
  const { product, quantity, notes, urgency } = item;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex gap-4">
        {/* Image */}
        <Link href={`/producto/${product.id}`} className="flex-shrink-0">
          <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <Link
                href={`/producto/${product.id}`}
                className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-1"
              >
                {product.name}
              </Link>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            </div>
            <button
              onClick={() => removeItem(product.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quantity and Urgency */}
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {/* Quantity */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Cantidad:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-1 font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="p-2 text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Urgency */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Urgencia:</span>
              <select
                value={urgency}
                onChange={(e) =>
                  updateUrgency(product.id, e.target.value as 'normal' | 'urgent')
                }
                className={`text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  urgency === 'urgent'
                    ? 'border-orange-300 bg-orange-50 text-orange-700'
                    : 'border-gray-300'
                }`}
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-3">
            <textarea
              placeholder="Agregar notas o especificaciones..."
              value={notes}
              onChange={(e) => updateNotes(product.id, e.target.value)}
              rows={2}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
