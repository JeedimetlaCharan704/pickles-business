import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Shield, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { products } from '../../data/mockData';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();
  const { toggleCart, getItemCount } = useCartStore();
  const { setLoading } = useUIStore();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  const searchResults = searchQuery.length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = () => {
    setShowSearch(false);
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchSelect = (productId) => {
    setShowSearch(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={false}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150 bg-white/70 shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🏺</span>
            <span className="font-heading text-2xl font-bold text-primary">
              Pickle<span className="text-accent">House</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-accent font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-accent font-medium transition-colors">Shop</Link>
            <Link to="/about" className="text-gray-700 hover:text-accent font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-accent font-medium transition-colors">Contact</Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button onClick={() => setShowSearch(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-primary" />
            </button>

            {/* Cart Button */}
            <button onClick={toggleCart} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-1 text-primary hover:text-accent transition-colors">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Admin</span>
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-accent transition-colors">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-danger font-medium transition-colors">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <button className="btn-primary">Login</button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-accent font-medium py-2">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-accent font-medium py-2">Shop</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-accent font-medium py-2">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-accent font-medium py-2">Contact</Link>
              {isAuthenticated ? (
                <>
                  {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-primary hover:text-accent font-medium py-2">Admin Panel</Link>}
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-accent font-medium py-2">Profile</Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block text-danger font-medium py-2">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}><button className="btn-primary w-full">Login</button></Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-white">
            <div className="max-w-3xl mx-auto px-4 py-6">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  placeholder="Search pickles..."
                  className="input-field flex-1 text-lg"
                />
                <button onClick={handleSearchSubmit} className="btn-primary px-6 py-3">Search</button>
              </div>

              {searchQuery.length > 0 && (
                <div className="mt-4">
                  {searchResults.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500 mb-2">{searchResults.length} result{searchResults.length > 1 ? 's' : ''}</p>
                      {searchResults.slice(0, 8).map(product => (
                        <button
                          key={product.id}
                          onClick={() => handleSearchSelect(product.id)}
                          className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                        >
                          <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <p className="font-semibold text-primary">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.weight} • {product.category}</p>
                          </div>
                          <span className="font-bold text-accent">₹{product.price}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No products found for "{searchQuery}"</p>
                  )}
                </div>
              )}

              {searchQuery.length === 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted mb-3">Popular Searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Mango', 'Chicken', 'Gongura', 'Combo', 'Lemon', 'Crab'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-gray-100 hover:bg-accent hover:text-primary rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
