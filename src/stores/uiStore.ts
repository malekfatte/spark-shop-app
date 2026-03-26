// UI state store
import { create } from 'zustand';

interface UIStore {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  openCart: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  openCart: () => set({ isCartOpen: true }),
  activeCategory: "All",
  setActiveCategory: (cat) => set({ activeCategory: cat }),
}));
