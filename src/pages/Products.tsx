import React, { useState } from 'react';
import ProductCard from '../components/products/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { Product } from '../types/product';
import '../styles/Products.css';

const Products: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
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