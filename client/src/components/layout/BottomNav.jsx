import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Home, Heart, Package, User } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export const BottomNav = () => {
  const location = useLocation();
  const { activeTab, setActiveTab } = useUIStore();

  const tabs = [
    { path: '/', label: 'Home', icon: Home, tab: 'home' },
    { path: '/shop', label: 'Shop', icon: ShoppingCart, tab: 'shop' },
    { path: '/wishlist', label: 'Wishlist', icon: Heart, tab: 'wishlist' },
    { path: '/orders', label: 'Orders', icon: Package, tab: 'orders' },
    { path: '/profile', label: 'Profile', icon: User, tab: 'profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 md:hidden"
         style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-16">
        {tabs.map(({ path, label, icon: Icon, tab }) => {
          const isActive = location.pathname === path || activeTab === tab;
          return (
            <Link
              key={tab}
              to={path}
              onClick={() => setActiveTab(tab)}
              className="flex flex-col items-center justify-center flex-1 h-full touch-target"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`p-1 rounded-xl transition-all ${isActive ? 'text-accent' : 'text-muted'}`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="h-1 w-full bg-accent rounded-full mt-1"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={`text-xs mt-1 ${isActive ? 'text-accent font-medium' : 'text-muted'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
