import { create } from 'zustand';
import { users } from '../data/mockData';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  
  login: (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ 
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        isAuthenticated: true,
        isAdmin: user.role === 'admin'
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  register: (name, email, password) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }
    const newUser = { id: String(users.length + 1), name, email, role: 'customer' };
    set({ 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      isAuthenticated: true,
      isAdmin: false
    });
    return { success: true };
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },
}));
