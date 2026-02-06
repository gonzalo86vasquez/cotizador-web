import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, QuoteItem } from '@/types';

interface QuoteState {
  items: QuoteItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateNotes: (productId: number, notes: string) => void;
  updateUrgency: (productId: number, urgency: 'normal' | 'urgent') => void;
  clearQuote: () => void;
  getTotalItems: () => number;
  getItemCount: () => number;
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, notes: '', urgency: 'normal' as const },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      updateNotes: (productId, notes) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, notes } : item
          ),
        }));
      },

      updateUrgency: (productId, urgency) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, urgency } : item
          ),
        }));
      },

      clearQuote: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getItemCount: () => get().items.length,
    }),
    { name: 'cotizador-quote' }
  )
);
