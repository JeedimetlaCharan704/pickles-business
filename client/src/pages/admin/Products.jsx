import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { products } from '../../data/mockData';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="font-heading text-3xl font-bold text-primary">Products</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
          />
        </div>

        {/* Products Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.weight}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
