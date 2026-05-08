import { motion } from 'framer-motion';
import { Package, Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { products, orders, users } from '../../data/mockData';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalProducts = products.length;

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: DollarSign, change: '+12.5%', color: 'bg-green-500' },
    { label: 'Total Orders', value: totalOrders, icon: ShoppingCart, change: '+8.2%', color: 'bg-blue-500' },
    { label: 'Total Users', value: totalUsers, icon: Users, change: '+15.3%', color: 'bg-purple-500' },
    { label: 'Total Products', value: totalProducts, icon: Package, change: '+4.1%', color: 'bg-accent' },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-3xl font-bold text-primary mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="card p-6">
            <h2 className="font-heading text-xl font-bold mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold">#{order.id}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">₹{order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="card p-6">
            <h2 className="font-heading text-xl font-bold mb-6">Top Products</h2>
            <div className="space-y-4">
              {products.sort((a, b) => b.reviews - a.reviews).slice(0, 5).map((product, index) => (
                <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.reviews} reviews</p>
                  </div>
                  <p className="font-bold text-accent">₹{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
