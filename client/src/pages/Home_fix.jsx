import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Shield, Award, ChevronRight, Leaf } from 'lucide-react';
import { products } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary via-primary-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">
              Authentic Andhra <span className="text-accent">Pickles</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">Handcrafted with love using grandmother's secret recipes.</p>
            <Link to="/shop">
              <button className="bg-accent hover:bg-accent-dark text-primary font-semibold px-8 py-4 rounded-xl">
                Shop Now <ChevronRight className="w-5 h-5 inline" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Featured Products</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
