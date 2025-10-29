import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our E-Commerce Store</h1>
      <p>Your one-stop shop for amazing products!</p>
      <div className="home-features">
        <div className="feature">
          <h3>🛍️ Browse Products</h3>
          <p>Discover our wide range of products</p>
        </div>
        <div className="feature">
          <h3>🛒 Easy Shopping</h3>
          <p>Add items to cart with one click</p>
        </div>
        <div className="feature">
          <h3>⚡ Fast Checkout</h3>
          <p>Quick and secure payment process</p>
        </div>
      </div>
    </div>
  );
};

export default Home;