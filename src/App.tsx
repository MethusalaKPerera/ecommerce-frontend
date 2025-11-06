import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoginModal from './components/common/LoginModal';
import Alert from './components/common/Alert';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import './App.css';

// Navbar Component
const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleAdminClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAlertMessage('Please login to access Admin panel');
      setShowAlert(true);
      setIsLoginModalOpen(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else if (user.role !== 'admin') {
      e.preventDefault();
      setAlertMessage('Access Denied: Admin privileges required');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    setAlertMessage('Logged out successfully');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    navigate('/');
  };

  return (
    <>
      {showAlert && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10000 }}>
          <Alert variant="info" onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}

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
            <li>
              <Link to="/admin" onClick={handleAdminClick}>
                Admin
              </Link>
            </li>
            
            {/* Theme Toggle */}
            <li>
              <button 
                onClick={toggleTheme} 
                className="theme-toggle-btn" 
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </li>
            
            {/* Login/Logout Button */}
            {user ? (
              <li>
                <button onClick={handleLogout} className="nav-logout-btn">
                  Logout ({user.role === 'admin' ? 'Admin User' : 'Customer'})
                </button>
              </li>
            ) : (
              <li>
                <button onClick={() => setIsLoginModalOpen(true)} className="nav-login-btn">
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
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