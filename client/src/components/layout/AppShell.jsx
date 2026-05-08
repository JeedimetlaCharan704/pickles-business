import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { CartDrawer } from '../cart/CartDrawer';
import { Toaster } from 'react-hot-toast';

export const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))]">
        {children}
      </main>
      <BottomNav />
      <CartDrawer />
      <Toaster position="top-right" />
    </div>
  );
};
