import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Shield, Truck, Award, ChevronRight, Leaf } from 'lucide-react';
import { products } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.sort((a, b) => b.reviews - a.reviews).slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Leaf className="w-4 h-4 text-accent" />
              <span className="text-white text-sm font-medium">100% Homemade | No Preservatives</span>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Authentic Andhra
              <span className="block text-gradient">Pickles</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Handcrafted with love using grandmother's secret recipes. Experience the true taste of tradition in every jar.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <button className="btn-primary text-lg px-8 py-4">
                  Shop Now <ChevronRight className="w-5 h-5 inline" />
                </button>
              </Link>
              <Link to="/about">
                <button className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                  Our Story
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-accent">10K+</p>
                <p className="text-gray-400 text-sm">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <p className="text-3xl font-bold text-accent">50+</p>
                <p className="text-gray-400 text-sm">Unique Recipes</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <p className="text-3xl font-bold text-accent">4.9</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-gray-400 text-sm">Rating</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full animate-float"></div>
                <img
                  src="/images/hero-banner.png"
                  alt="Premium Pickles Collection"
                  className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
                />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: '100% Homemade', desc: 'No chemicals or preservatives' },
              { icon: Award, title: 'Premium Quality', desc: 'Handpicked ingredients' },
              { icon: Truck, title: 'Pan India Delivery', desc: 'Fast & secure shipping' },
              { icon: Star, title: '50+ Recipes', desc: 'Authentic traditional taste' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <badge.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">{badge.title}</h3>
                <p className="text-gray-600 text-sm">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our most loved pickles, handcrafted with passion</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <button className="btn-secondary">
                View All Products <ChevronRight className="w-5 h-5 inline" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/our-story.png"
                alt="Our Story"
                className="rounded-3xl shadow-large"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mt-4 mb-6">
                From Grandma's Kitchen to Your Table
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                For over three generations, our family has been crafting authentic Andhra pickles using time-honored recipes passed down from grandmother to granddaughter.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Every jar is made with love, using only the freshest ingredients sourced directly from local farmers. No preservatives, no chemicals – just pure, authentic taste.
              </p>
              <Link to="/about">
                <button className="btn-primary">
                  Learn More <ChevronRight className="w-5 h-5 inline" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title text-white">Shop by Category</h2>
            <p className="section-subtitle text-gray-300">Choose from our wide range of authentic pickles</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Vegetarian', desc: 'Traditional veg pickles', count: '15+ varieties', image: '/images/category-vegetarian.png', link: '/shop?category=veg' },
              { name: 'Non-Vegetarian', desc: 'Meat & seafood pickles', count: '10+ varieties', image: '/images/category-non-vegetarian.png', link: '/shop?category=non-veg' },
              { name: 'Combo Packs', desc: 'Best value bundles', count: '5+ combos', image: '/images/category-combo.png', link: '/shop?category=combo' },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={category.link} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading text-2xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-gray-300 text-sm">{category.count}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">From farm to your table, every step is crafted with care</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Fresh Ingredients', desc: 'Handpicked from local farms' },
              { step: '02', title: 'Traditional Prep', desc: 'Grandma\'s secret recipes' },
              { step: '03', title: 'Vacuum Sealed', desc: 'Freshness guaranteed' },
              { step: '04', title: 'Fast Delivery', desc: 'To your doorstep' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Join thousands of happy pickle lovers</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', review: 'Best pickles I\'ve ever had! Tastes exactly like my grandmother used to make.', rating: 5 },
              { name: 'Rajesh Kumar', review: 'The non-veg pickles are absolutely amazing. Fresh, spicy, and authentic!', rating: 5 },
              { name: 'Anita Reddy', review: 'Ordered the combo pack for my family. Everyone loved it! Will definitely order again.', rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Get 10% Off Your First Order
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Subscribe to our newsletter for exclusive offers and new product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
