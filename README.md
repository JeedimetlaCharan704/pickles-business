# 🏺 PickleHouse - Premium E-Commerce Platform

A beautiful, premium-looking pickle e-commerce website with both vegetarian and non-vegetarian products, user authentication, admin panel, and full shopping experience.

## 🚀 Features

### Customer Features
- ✅ Beautiful homepage with hero section, featured products, testimonials
- ✅ Product catalog with advanced filters (category, spice level, price)
- ✅ Product detail page with image gallery, reviews, nutrition info
- ✅ Shopping cart with slide-in drawer
- ✅ Multi-step checkout flow
- ✅ User authentication (login/register)
- ✅ User profile with order history
- ✅ Wishlist functionality
- ✅ Responsive mobile design

### Admin Features
- ✅ Admin dashboard with analytics
- ✅ Product management (view, search)
- ✅ Order management with status tracking
- ✅ User management
- ✅ Review moderation

### Premium UI/UX
- ✅ Beautiful color scheme (Deep Green + Gold)
- ✅ Premium typography (Playfair Display + Inter)
- ✅ Smooth animations with Framer Motion
- ✅ Glassmorphism effects
- ✅ Hover animations on product cards
- ✅ Toast notifications
- ✅ Loading states
- ✅ Mobile-responsive design

## 🎨 Design System

### Colors
- **Primary:** #0F2A1D (Deep Forest Green)
- **Accent:** #C9A227 (Antique Gold)
- **Background:** #FAF7F2 (Ivory Cream)
- **Success:** #059669 (Green for veg)
- **Danger:** #DC2626 (Red for non-veg)

### Typography
- **Headings:** Playfair Display (elegant serif)
- **Body:** Inter (modern sans-serif)

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS
- Framer Motion (animations)
- Zustand (state management)
- React Router v6
- Lucide React (icons)
- React Hot Toast (notifications)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js 16+
- MongoDB (optional for demo)

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Server Setup
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## 🎭 Demo Accounts

### Admin Account
- **Email:** admin@demo.com
- **Password:** demo123

### Customer Account
- **Email:** customer@demo.com
- **Password:** demo123

## 🌐 Routes

### Public Routes
- `/` - Homepage
- `/shop` - Product catalog
- `/product/:id` - Product detail
- `/about` - About us
- `/contact` - Contact page
- `/login` - Login
- `/register` - Register

### Protected Routes
- `/profile` - User profile
- `/checkout` - Checkout

### Admin Routes
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/users` - User management

## 📱 Pages Included

1. **Home** - Hero, trust badges, featured products, story, categories, process, testimonials, newsletter
2. **Shop** - Filter sidebar, product grid, sorting
3. **Product Detail** - Image gallery, tabs, reviews, related products
4. **Cart** - Slide-in drawer with quantity controls
5. **Checkout** - Multi-step flow (cart → address → payment → confirmation)
6. **Login/Register** - Authentication forms
7. **Profile** - User info, orders, wishlist, addresses
8. **About** - Brand story, values
9. **Contact** - Contact form, info cards
10. **Admin Dashboard** - Stats, recent orders, top products
11. **Admin Products** - Product table with search
12. **Admin Orders** - Order management with filters

## 🎯 Demo Flow for Client Presentation

1. Show stunning homepage
2. Browse shop → filter non-veg products
3. Click product → view details
4. Add to cart → show cart drawer
5. Proceed to checkout → complete mock order
6. Login as admin → show dashboard
7. Show product management
8. Show order management
9. Demonstrate mobile responsiveness

## 📂 Project Structure

```
pickle-business/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/        # Images, fonts
│   │   ├── components/    # UI, layout, product, cart, admin
│   │   ├── pages/         # All pages
│   │   ├── store/         # Zustand stores
│   │   ├── data/          # Mock data
│   │   ├── services/      # API calls
│   │   └── utils/         # Helpers
│   └── package.json
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── package.json
└── README.md
```

## 🎨 Key Features

### Veg/Non-Veg Indicators
- 🟢 Green badge for vegetarian
- 🔴 Red badge for non-vegetarian

### Spice Level Meter
- 🌶️ Mild (1 chili)
- 🌶️🌶️ Medium (2 chilies)
- 🌶️🌶️🌶️ Hot (3 chilies)

### Product Cards
- Hover animations
- Quick add to cart
- Wishlist button
- Discount badges
- Rating display

## 🚀 Performance
- Lazy loading images
- Code splitting
- Optimized bundle size
- Fast page transitions

## 📞 Support

For questions or issues, please contact:
- Email: info@picklehouse.com
- Phone: +91 98765 43210

---

**Made with ❤️ for authentic Andhra pickles**
