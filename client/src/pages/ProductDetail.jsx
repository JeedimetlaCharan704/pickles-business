import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield } from 'lucide-react';
import { products, reviews as allReviews } from '../data/mockData';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { ProductCard } from '../components/product/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useUIStore((state) => state.showToast);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const productReviews = allReviews.filter(r => r.productId === id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-accent">Shop</Link>
            <span>/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Info */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              {product.isVeg ? (
                <span className="veg-badge">
                  <span className="w-2 h-2 bg-success rounded-full"></span> Vegetarian
                </span>
              ) : (
                <span className="nonveg-badge">
                  <span className="w-2 h-2 bg-danger rounded-full"></span> Non-Vegetarian
                </span>
              )}
              {product.originalPrice > product.price && (
                <span className="bg-accent text-primary text-sm font-bold px-3 py-1 rounded-full">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <h1 className="font-heading text-4xl font-bold text-primary mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
              <div className="spice-meter">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < product.spiceLevel ? '' : 'opacity-30'}`}>🌶️</span>
                ))}
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-accent">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-gray-500">| {product.weight}</span>
            </div>

            <p className="text-gray-600 text-lg mb-8">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button className="p-3 border rounded-xl hover:bg-gray-100 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                <Truck className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders above ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                <Shield className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-semibold text-sm">Freshness Guarantee</p>
                  <p className="text-xs text-gray-500">100% quality assured</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="card p-8 mb-16">
          <div className="flex gap-8 border-b mb-6">
            {['description', 'ingredients', 'nutrition', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <p className="text-gray-600 text-lg">{product.description}</p>
          )}

          {activeTab === 'ingredients' && (
            <p className="text-gray-600 text-lg">{product.ingredients}</p>
          )}

          {activeTab === 'nutrition' && (
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{product.nutrition.calories}</p>
                <p className="text-sm text-gray-500">Calories</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{product.nutrition.protein}</p>
                <p className="text-sm text-gray-500">Protein</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{product.nutrition.fat}</p>
                <p className="text-sm text-gray-500">Fat</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-primary">{product.nutrition.carbs}</p>
                <p className="text-sm text-gray-500">Carbs</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {productReviews.length > 0 ? (
                productReviews.map(review => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                        {review.userName[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{review.userName}</p>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet</p>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
