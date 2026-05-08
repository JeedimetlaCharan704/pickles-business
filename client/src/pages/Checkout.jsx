import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, Wallet, CheckCircle, Edit2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Checkout = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const total = getTotal();

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '+91 98765 43210',
    street: '123 Main Street, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
  });

  const [isEditing, setIsEditing] = useState(false);

  if (items.length === 0) {
    navigate('/shop');
    return null;
  }

  const handlePlaceOrder = () => {
    clearCart();
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-bold text-primary mb-8">
          Checkout
        </motion.h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {['Cart', 'Address', 'Payment', 'Confirm'].map((label, index) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 ${index + 1 <= step ? 'text-accent' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  index + 1 < step ? 'bg-accent text-primary' :
                  index + 1 === step ? 'bg-accent text-primary' : 'bg-gray-200'
                }`}>
                  {index + 1 < step ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className="font-medium hidden sm:inline">{label}</span>
              </div>
              {index < 3 && <div className={`w-16 sm:w-24 h-1 mx-2 ${index + 1 < step ? 'bg-accent' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
                <h2 className="font-heading text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-accent">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                <Button variant="primary" className="w-full mt-6" onClick={() => setStep(2)}>
                  Continue to Address
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
                <h2 className="font-heading text-2xl font-bold mb-6">Delivery Address</h2>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      placeholder="Your full name"
                    />
                    <Input
                      label="Phone Number"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <textarea
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        placeholder="House no, street, locality"
                        rows="2"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        placeholder="City"
                      />
                      <Input
                        label="State"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        placeholder="State"
                      />
                    </div>
                    <Input
                      label="Pincode"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="6-digit pincode"
                    />
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button variant="primary" className="flex-1" onClick={() => setIsEditing(false)}>
                        Save Address
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="border-2 border-accent rounded-xl p-6 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold">{address.name}</p>
                          <p className="text-gray-600">{address.street}</p>
                          <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                          <p className="text-gray-600 mt-2">Phone: {address.phone}</p>
                        </div>
                        <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4 text-accent" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button variant="primary" className="flex-1" onClick={() => setStep(3)}>
                        Continue to Payment
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
                <h2 className="font-heading text-2xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-4 mb-6">
                  {[
                    { id: 'cod', icon: Wallet, label: 'Cash on Delivery', desc: 'Pay when you receive' },
                    { id: 'upi', icon: CreditCard, label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
                    { id: 'card', icon: CreditCard, label: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === method.id ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-accent"
                      />
                      <method.icon className="w-6 h-6 text-accent" />
                      <div>
                        <p className="font-semibold">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button variant="primary" className="flex-1" onClick={handlePlaceOrder}>
                    Place Order - ₹{total}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Thank you for your order. You will receive a confirmation email shortly.
                </p>
                <Button variant="primary" onClick={() => navigate('/shop')}>
                  Continue Shopping
                </Button>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step < 4 && (
            <div className="card p-6 h-fit sticky top-24">
              <h3 className="font-heading text-xl font-bold mb-4">Order Total</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">{total >= 500 ? 'FREE' : '₹50'}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-accent">₹{total >= 500 ? total : total + 50}</span>
                </div>
              </div>
              {total < 500 && (
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                  Add ₹{500 - total} more for FREE delivery!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
