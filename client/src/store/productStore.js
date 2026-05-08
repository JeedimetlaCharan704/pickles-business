import { create } from 'zustand';

export const useProductStore = create((set) => ({
  recentlyViewed: [],
  addToRecentlyViewed: (product) => {
    set((state) => {
      const filtered = state.recentlyViewed.filter((p) => p.id !== product.id);
      return { recentlyViewed: [product, ...filtered].slice(0, 10) };
    });
  },
}));
