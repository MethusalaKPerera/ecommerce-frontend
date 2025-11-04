import React, { useState, useMemo, useCallback } from 'react';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductsContext';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import Alert from '../components/common/Alert';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import '../styles/Products.css';

const Products: React.FC = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categories = useMemo(() => {
    return ['all', ...new Set(products.map((p) => p.category))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (priceRange.min && product.price < parseFloat(priceRange.min)) {
        return false;
      }
      if (priceRange.max && product.price > parseFloat(priceRange.max)) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    setAlertMessage(`${product.name} added to cart!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }, [addToCart]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
  }, []);

  return (
    <div className="products-container">
      {showAlert && (
        <div className="alert-container">
          <Alert variant="success" onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}

      <div className="products-header">
        <h1>Our Products</h1>
        <p className="products-subtitle">Browse our amazing collection</p>
      </div>

      {/* Search and Filter Section */}
      <div className="products-filters">
        <Card variant="glass">
          <div className="filters-content">
            {/* Search Input */}
            <div className="filter-group">
              <Input
                type="search"
                placeholder="Search products..."
                icon="🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="price-range">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                />
                <span className="price-separator">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedCategory !== 'all' || priceRange.min || priceRange.max) && (
              <div className="filter-group">
                <Button variant="outline" onClick={clearFilters} fullWidth>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="results-info">
            <p>
              Showing <strong>{filteredProducts.length}</strong> of{' '}
              <strong>{products.length}</strong> products
            </p>
          </div>
        </Card>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <Card variant="glass">
            <div className="no-products-content">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query</p>
              <Button variant="primary" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Products;
