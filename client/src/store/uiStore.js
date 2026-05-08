import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  isLoading: false,
  toast: null,
  activeTab: 'home',

  toggleMobileMenu: () => {
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
  },

  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  showToast: (message, type = 'success') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },
}));
