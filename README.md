# 🛍️ E-Commerce Frontend Application

A modern, full-featured e-commerce web application built with React, TypeScript, and Vite. This application demonstrates professional React patterns, state management with Context API, form validation, routing, and optimization techniques.

## 🌟 Features

### Customer Features
- **Product Browsing**: Beautiful product gallery with detailed information
- **Search & Filter**: Real-time search by name, category, and price range
- **Shopping Cart**: Add, remove, and manage cart items
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works seamlessly on all devices

### Admin Features
- **Product Management**: Full CRUD operations for products
- **Dashboard Statistics**: View total products, inventory value, low stock alerts, and categories
- **Form Validation**: Professional form validation using React Hook Form with Yup
- **Real-time Updates**: Instant updates across the application

### Technical Features
- **React Hooks**: Custom hooks (useProducts, useFetch) for reusability
- **Error Handling**: ErrorBoundary for graceful error management
- **Performance**: Optimized with React.memo and useCallback
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Glassmorphism design with smooth animations

## 📁 Project Structure

```
ecommerce-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/              # Static assets
│   ├── components/
│   │   ├── cart/           # Cart-related components
│   │   ├── common/         # Reusable UI components
│   │   │   ├── Alert.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── LoginModal.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── products/
│   │       └── ProductCard.tsx
│   ├── context/            # Context providers
│   │   ├── CartContext.tsx
│   │   ├── ProductsContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── UserContext.tsx
│   ├── data/
│   │   └── mockProducts.ts # Mock product data
│   ├── hooks/              # Custom React hooks
│   │   ├── useFetch.ts
│   │   └── useProducts.ts
│   ├── pages/              # Page components
│   │   ├── Admin.tsx
│   │   ├── Cart.tsx
│   │   ├── Home.tsx
│   │   └── Products.tsx
│   ├── styles/             # Component styles
│   │   ├── Admin.css
│   │   ├── Alert.css
│   │   ├── App.css
│   │   ├── Badge.css
│   │   ├── Button.css
│   │   ├── Card.css
│   │   ├── Cart.css
│   │   ├── ErrorBoundary.css
│   │   ├── Home.css
│   │   ├── Input.css
│   │   ├── Loading.css
│   │   ├── Modal.css
│   │   ├── ProductCard.css
│   │   └── Products.css
│   ├── types/
│   │   └── product.ts
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   ├── App.css
│   ├── index.css           # Global styles
│   └── main.tsx            # App entry point
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication

### Customer Account
- **Email**: `customer@ecommerce.com`
- **Password**: `customer123`

### Admin Account
- **Email**: `admin@ecommerce.com`
- **Password**: `admin123`

You can switch between accounts using the role switcher button in the navbar.

## 🛠️ Technologies Used

### Core
- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Fast build tool and dev server
- **React Router DOM**: Client-side routing

### Form Management
- **React Hook Form**: Form state management
- **Yup**: Schema validation
- **@hookform/resolvers**: Form validation integration

### Styling
- **CSS3**: Custom stylesheets
- **CSS Variables**: Theme management
- **Animations**: Smooth transitions and animations

### State Management
- **Context API**: Global state management
- **Custom Hooks**: Reusable state logic

## 📚 Key Concepts Demonstrated

### React Patterns
- ✅ Functional Components with Hooks
- ✅ Custom Hooks (useFetch, useProducts)
- ✅ Component Composition
- ✅ Props and State Management
- ✅ Effect Management (useEffect)
- ✅ Memoization (React.memo, useMemo, useCallback)

### State Management
- ✅ Context API
- ✅ Provider Pattern
- ✅ Custom Context Hooks
- ✅ Local State vs Global State

### Forms & Validation
- ✅ Controlled Components
- ✅ Uncontrolled Components with React Hook Form
- ✅ Schema-based Validation with Yup
- ✅ Error Handling

### Performance Optimization
- ✅ React.memo for component memoization
- ✅ useCallback for function memoization
- ✅ useMemo for computed values
- ✅ Code splitting

### Error Handling
- ✅ Error Boundaries
- ✅ Graceful Error UI
- ✅ Error Logging

### UI/UX
- ✅ Responsive Design
- ✅ Dark/Light Theme
- ✅ Loading States
- ✅ Toast Notifications
- ✅ Modal Components
- ✅ Glassmorphism Design

## 🎨 UI Components

### Common Components
- **Button**: Multiple variants (primary, secondary, outline, danger, etc.)
- **Card**: Glass effect variants
- **Input**: Form inputs with validation
- **Modal**: Overlay dialogs
- **Alert**: Toast notifications
- **Badge**: Status indicators
- **Loading**: Spinner animations
- **ErrorBoundary**: Error fallback UI

### Page Components
- **Home**: Landing page with hero section
- **Products**: Product listing with search/filter
- **Cart**: Shopping cart management
- **Admin**: Product management dashboard

## 🧪 Testing

Run the linter:
```bash
npm run lint
```

## 📝 Git Workflow

The project follows a branching strategy:

- **main**: Production-ready code
- **development**: Integration branch for features
- **feature/**: Feature branches for daily development work

Example workflow:
```bash
# Create feature branch
git checkout -b feature/day4-admin-crud development

# Make changes and commit
git add .
git commit -m "feat: implement Admin page for product CRUD"

# Push and create PR
git push -u origin feature/day4-admin-crud
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📸 Screenshots

### Home Page
Modern landing page with hero section, categories, features, and trending products.

### Products Page
Product listing with search, category filter, and price range filters.

### Cart Page
Shopping cart with item management and checkout interface.

### Admin Dashboard
Comprehensive dashboard with statistics and product management CRUD operations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with descriptive messages
5. Push to your branch
6. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as part of a React Frontend Development course covering:
- Day 1-2: Setup, Components, Routing
- Day 3: State Management with Context API
- Day 4: Professional Patterns & Deep Dive (CRUD, Forms, Hooks)
- Day 5: Advanced Features, Optimization & Final Project

## 🎯 Future Enhancements

- [ ] Add product reviews and ratings
- [ ] Implement checkout process
- [ ] Add payment integration
- [ ] User profile management
- [ ] Order history
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Image upload for products
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Made with ❤️ using React, TypeScript, and modern web technologies**
