import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { Button } from '../components/ui/Button';

const Wishlist = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">My Wishlist</h1>
          <p className="text-gray-300 text-lg">Items you love, saved for later</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            Start adding items you love! Browse our collection and click the heart icon to save your favorites.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
            <ShoppingCart className="w-5 h-5" /> Browse Shop
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
