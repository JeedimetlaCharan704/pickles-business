import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { products } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';

const Shop = () => {
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    spiceLevel: 'all',
    priceRange: 'all',
    sortBy: 'popular',
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    if (cat) {
      setFilters(prev => ({ ...prev, category: cat }));
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredProducts = products
    .filter(product => {
      if (searchQuery && 
          !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.spiceLevel !== 'all' && product.spiceLevel !== parseInt(filters.spiceLevel)) return false;
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === 'under200' && product.price >= 200) return false;
        if (filters.priceRange === '200to300' && (product.price < 200 || product.price > 300)) return false;
        if (filters.priceRange === 'over300' && product.price <= 300) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'popular') return b.reviews - a.reviews;
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {searchQuery ? `Search: "${searchQuery}"` : 'Our Collection'}
          </h1>
          <p className="text-gray-300 text-lg">
            {searchQuery ? `Showing results for "${searchQuery}"` : 'Discover authentic Andhra pickles, handcrafted with love'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card p-6 sticky top-24">
              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Products' },
                    { value: 'veg', label: 'Vegetarian' },
                    { value: 'non-veg', label: 'Non-Vegetarian' },
                    { value: 'combo', label: 'Combo Packs' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={option.value}
                        checked={filters.category === option.value}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="accent-accent"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Spice Level */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Spice Level</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Levels' },
                    { value: '1', label: '🌶️ Mild' },
                    { value: '2', label: '🌶️🌶️ Medium' },
                    { value: '3', label: '🌶️🌶️🌶️ Hot' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="spiceLevel"
                        value={option.value}
                        checked={filters.spiceLevel === option.value}
                        onChange={(e) => setFilters({ ...filters, spiceLevel: e.target.value })}
                        className="accent-accent"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Prices' },
                    { value: 'under200', label: 'Under ₹200' },
                    { value: '200to300', label: '₹200 - ₹300' },
                    { value: 'over300', label: 'Over ₹300' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={option.value}
                        checked={filters.priceRange === option.value}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        className="accent-accent"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setFilters({ category: 'all', spiceLevel: 'all', priceRange: 'all', sortBy: 'popular' })}
                className="w-full text-sm text-accent hover:underline"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> products
              </p>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-white transition-colors"
                >
                  <Filter className="w-5 h-5" /> Filters
                </button>

                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full sm:w-auto appearance-none px-4 py-2 pr-10 border rounded-xl bg-white cursor-pointer focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="lg:hidden mb-8 card p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading text-lg font-bold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Same filter options as desktop */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Category</h4>
                    <div className="space-y-2">
                      {[
                        { value: 'all', label: 'All Products' },
                        { value: 'veg', label: 'Vegetarian' },
                        { value: 'non-veg', label: 'Non-Vegetarian' },
                        { value: 'combo', label: 'Combo Packs' },
                      ].map(option => (
                        <label key={option.value} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="mobile-category"
                            value={option.value}
                            checked={filters.category === option.value}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="accent-accent"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your filters</p>
                <button
                  onClick={() => setFilters({ category: 'all', spiceLevel: 'all', priceRange: 'all', sortBy: 'popular' })}
                  className="btn-primary mt-4"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
