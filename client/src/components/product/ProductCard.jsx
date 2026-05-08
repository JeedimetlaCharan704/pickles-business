import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';

export const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useUIStore((state) => state.showToast);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        className="card overflow-hidden group cursor-pointer"
      >
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isVeg ? (
            <span className="veg-badge">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              Veg
            </span>
          ) : (
            <span className="nonveg-badge">
              <span className="w-2 h-2 bg-danger rounded-full"></span>
              Non-Veg
            </span>
          )}
          {product.originalPrice > product.price && (
            <span className="bg-accent text-primary text-xs font-bold px-2 py-1 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-white text-primary p-3 rounded-full hover:bg-accent transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-primary p-3 rounded-full hover:bg-accent transition-colors"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
          )}
          <span className="text-sm text-gray-500">| {product.weight}</span>
        </div>

        <div className="spice-meter mb-3">
          {[...Array(3)].map((_, i) => (
            <span key={i} className={`text-sm ${i < product.spiceLevel ? 'text-danger' : 'text-gray-300'}`}>
              🌶️
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-2 rounded-xl transition-all duration-300"
        >
          Add to Cart
        </motion.button>
      </div>
      </motion.div>
    </Link>
  );
};
