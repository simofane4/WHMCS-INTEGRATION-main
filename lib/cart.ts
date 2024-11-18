// Cart state management
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  domain: string;
  tld: string;
  price: number;
  period: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (domain: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const exists = items.find((i) => i.domain === item.domain);
        if (!exists) {
          set({ items: [...items, item] });
        }
      },
      removeItem: (domain) =>
        set({ items: get().items.filter((item) => item.domain !== domain) }),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + item.price, 0),
    }),
    {
      name: 'wget-cart',
    }
  )
);