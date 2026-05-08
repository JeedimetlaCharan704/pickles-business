import { motion } from 'framer-motion';
import { Package, ShoppingCart, ChevronRight, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { orders } from '../data/mockData';
import { Button } from '../components/ui/Button';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const userOrders = user ? orders.filter(order => order.userId === user.id) : [];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: 'bg-green-100 text-green-800', iconColor: 'text-green-600' };
      case 'shipped':
        return { icon: Truck, color: 'bg-blue-100 text-blue-800', iconColor: 'text-blue-600' };
      case 'processing':
        return { icon: Clock, color: 'bg-yellow-100 text-yellow-800', iconColor: 'text-yellow-600' };
      case 'pending':
        return { icon: Clock, color: 'bg-gray-100 text-gray-800', iconColor: 'text-gray-600' };
      case 'cancelled':
        return { icon: XCircle, color: 'bg-red-100 text-red-800', iconColor: 'text-red-600' };
      default:
        return { icon: Clock, color: 'bg-gray-100 text-gray-800', iconColor: 'text-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">My Orders</h1>
          <p className="text-gray-300 text-lg">Track your orders and view history</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map(order => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-heading text-xl font-bold text-primary">Order #{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${statusConfig.color}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <p className="font-bold text-2xl text-accent">₹{order.total}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">{item.name}</span>
                            <span className="text-xs text-gray-400">x {item.quantity}</span>
                          </div>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 pt-4 border-t">
                    <button className="flex items-center gap-2 text-accent hover:underline font-medium">
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-primary mb-4">No Orders Yet</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button variant="primary" size="lg" onClick={() => navigate('/shop')}>
              <ShoppingCart className="w-5 h-5" /> Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
