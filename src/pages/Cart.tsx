import React, { useState, useEffect } from 'react';
import { CartItem } from '../types/product';
import '../styles/Cart.css';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      const existingCart = localStorage.getItem('cart');
      if (existingCart) {
        setCartItems(JSON.parse(existingCart));
      }
    };

    loadCart();
    
    // Optional: Reload when window focuses (if user adds items in another tab)
    window.addEventListener('focus', loadCart);
    return () => window.removeEventListener('focus', loadCart);
  }, []);

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    saveCart(updatedCart);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-quantity">
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
        <div className="cart-actions">
          <button className="clear-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;