import React, { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { Product, CartItem } from '../types/product';
import '../styles/Products.css';

const Products: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);

  const handleAddToCart = (product: Product) => {
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({ ...product, quantity: 1 });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <p className="products-subtitle">Browse our amazing collection</p>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;