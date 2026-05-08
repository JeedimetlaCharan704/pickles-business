import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Phone, Mail, Edit2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { orders } from '../data/mockData';

const Profile = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const userOrders = orders.filter(order => order.userId === user?.id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl font-bold text-primary mb-8">My Account</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {user?.name?.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-lg">{user?.name}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  {[
                    { id: 'profile', icon: User, label: 'Profile' },
                    { id: 'orders', icon: Package, label: 'Orders' },
                    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                    { id: 'addresses', icon: MapPin, label: 'Addresses' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? 'bg-accent text-primary font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="card p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl font-bold">Profile Details</h2>
                    <button className="flex items-center gap-2 text-accent hover:underline">
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Email</label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Phone</label>
                        <p className="font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4 text-accent" /> +91 98765 43210
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Account Type</label>
                        <p className="font-medium capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="card p-8">
                  <h2 className="font-heading text-2xl font-bold mb-6">Order History</h2>
                  {userOrders.length > 0 ? (
                    <div className="space-y-4">
                      {userOrders.map(order => (
                        <div key={order.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                            <div>
                              <p className="font-semibold text-lg">Order #{order.id}</p>
                              <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between pt-4 border-t">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-xl text-accent">₹{order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No orders yet</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="card p-8">
                  <h2 className="font-heading text-2xl font-bold mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="card p-8">
                  <h2 className="font-heading text-2xl font-bold mb-6">Saved Addresses</h2>
                  <div className="border-2 border-accent rounded-xl p-6 relative">
                    <span className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-2 py-1 rounded">
                      Default
                    </span>
                    <p className="font-semibold mb-2">{user?.name}</p>
                    <p className="text-gray-600">123 Main Street, Hyderabad</p>
                    <p className="text-gray-600">Telangana, 500001</p>
                    <p className="text-gray-600 mt-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> +91 98765 43210
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
