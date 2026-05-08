import { Link } from 'react-router-dom';
import { X, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-20 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏺</span>
              <span className="font-heading text-2xl font-bold">
                Pickle<span className="text-accent">House</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Authentic handmade Andhra pickles crafted with love and tradition. 
              Every jar tells a story of heritage and flavor.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary transition-all" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary transition-all" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 2c-2.717 0-3.056.01-4.122.06-.842.038-1.296.176-1.605.29a2.878 2.878 0 0 0-1.04.683 2.882 2.882 0 0 0-.683 1.04c-.114.309-.252.763-.29 1.605-.047 1.066-.06 1.405-.06 4.122 0 2.717.01 3.056.06 4.122.038.842.176 1.296.29 1.605.163.435.399.796.683 1.04.284.284.645.52 1.04.683.309.114.763.252 1.605.29 1.066.047 1.405.06 4.122.06 2.717 0 3.056-.01 4.122-.06.842-.038 1.296-.176 1.605-.29a2.878 2.878 0 0 0 1.04-.683 2.882 2.882 0 0 0 .683-1.04c.114-.309.252-.763.29-1.605.047-1.066.06-1.405.06-4.122 0-2.717-.01-3.056-.06-4.122-.038-.842-.176-1.296-.29-1.605a2.878 2.878 0 0 0-.683-1.04 2.882 2.882 0 0 0-1.04-.683c-.309-.114-.763-.252-1.605-.29C15.056 4.013 14.717 4 12 4zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm6.406-11.845a1.146 1.146 0 1 0 0 2.292 1.146 1.146 0 0 0 0-2.292z"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:text-primary transition-all" aria-label="X (Twitter)">
                <X className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-accent transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/shop?category=veg" className="text-gray-300 hover:text-accent transition-colors">Vegetarian Pickles</Link></li>
              <li><Link to="/shop?category=non-veg" className="text-gray-300 hover:text-accent transition-colors">Non-Vegetarian Pickles</Link></li>
              <li><Link to="/shop?category=combo" className="text-gray-300 hover:text-accent transition-colors">Combo Packs</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-accent transition-colors">Gift Packs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-300">123 Main Street, Hyderabad, Telangana 500001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-gray-300">info@picklehouse.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2026 PickleHouse. All rights reserved. Made with ❤️ in Andhra Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
};
