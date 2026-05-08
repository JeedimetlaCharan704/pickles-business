import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Star, LogOut, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/reviews', icon: Star, label: 'Reviews' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex-shrink-0">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🏺</span>
            <span className="font-heading text-xl font-bold">
              Pickle<span className="text-accent">House</span>
            </span>
          </Link>

          <div className="mb-6 pb-6 border-b border-white/20">
            <p className="text-sm text-gray-300">Welcome back,</p>
            <p className="font-semibold">{user?.name}</p>
          </div>

          <nav className="space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  location.pathname === item.path
                    ? 'bg-accent text-primary font-semibold'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t border-white/20">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
