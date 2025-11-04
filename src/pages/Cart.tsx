import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import '../styles/Cart.css';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="cart-subtitle">Your cart is empty</p>
        </div>
        
        <Card variant="glass">
          <div className="empty-cart">
            <span className="empty-cart-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/products">
              <Button variant="primary" size="large" icon="🛍️">
                Go Shopping
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-subtitle">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <Card key={item.id} variant="glass" hover={false}>
              <div className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-description">{item.description}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    <p className="item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="cart-summary-section">
          <Card variant="gradient">
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
              </div>

              <Button variant="primary" size="large" fullWidth icon="✓">
                Proceed to Checkout
              </Button>

              <Button 
                variant="outline" 
                size="medium" 
                fullWidth 
                onClick={clearCart}
                style={{ marginTop: '1rem' }}
              >
                Clear Cart
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;