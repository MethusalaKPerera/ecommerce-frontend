import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import './App.css';

// Navbar Component (using contexts)
// In App.tsx - Update your Navbar component
const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout, login } = useUser();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getCartCount();

  // Quick role switch function for development/testing
  const switchRole = () => {
    if (!user) {
      // If not logged in, login as admin
      login('admin@ecommerce.com', 'admin123');
    } else if (user.role === 'customer') {
      // Switch to admin
      login('admin@ecommerce.com', 'admin123');
    } else {
      // Switch to customer
      login('customer@ecommerce.com', 'customer123');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛍️ E-Commerce
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          {user?.role === 'admin' && (
            <li><Link to="/admin">Admin</Link></li>
          )}
          
          {/* Theme Toggle */}
          <li>
            <button onClick={toggleTheme} className="theme-toggle-btn" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
          
          {/* Role Switcher Button */}
          <li>
            <button onClick={switchRole} className="role-switch-btn">
              {user ? `Switch to ${user.role === 'admin' ? 'Customer' : 'Admin'}` : 'Login as Admin'}
            </button>
          </li>
          
          {user && (
            <li>
              <button onClick={logout} className="nav-logout-btn">
                Logout ({user.name})
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

function AppContent() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <ProductsProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </ProductsProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;