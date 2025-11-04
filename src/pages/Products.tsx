import React, { useState, useMemo, useCallback } from 'react';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductsContext';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import Alert from '../components/common/Alert';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import '../styles/Products.css';

const Products: React.FC = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchError, setSearchError] = useState('');
  const [priceError, setPriceError] = useState('');

  const categories = useMemo(() => {
    return ['all', ...new Set(products.map((p) => p.category))].sort();
  }, [products]);

  // Hot & New Products (shown when no active filters)
  const hotProducts = useMemo(() => {
    return products
      .filter(p => p.stock > 0)
      .sort((a, b) => b.price - a.price)
      .slice(0, 3);
  }, [products]);

  const newProducts = useMemo(() => {
    return products
      .filter(p => p.stock > 0)
      .slice(-3)
      .reverse();
  }, [products]);

  // Validate search input with real-time feedback
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Check for invalid characters first
    const invalidChars = /[<>{}[\]\\|]/;
    if (invalidChars.test(value)) {
      setSearchError('❌ Invalid characters detected! Only letters, numbers, and spaces allowed');
      setSearchQuery(value); // Still update to show the error
      return;
    }
    
    // Validate search query length
    if (value.length > 50) {
      setSearchError('❌ Search query too long! Maximum 50 characters allowed');
      setSearchQuery(value); // Still update to show the error
      return;
    }
    
    // Valid input - clear error and update query
    setSearchError('');
    setSearchQuery(value);
  };

  // FIXED: Handle Enter key press for search - using onKeyDown instead
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Validate before searching
      if (searchError) {
        return; // Don't search if there's an error
      }
      
      if (searchQuery.trim()) {
        // Search is already happening via state, just provide feedback
        const resultCount = filteredProducts.length;
        setAlertMessage(
          resultCount > 0 
            ? `✓ Found ${resultCount} product${resultCount !== 1 ? 's' : ''} for "${searchQuery}"`
            : `No products found for "${searchQuery}"`
        );
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    }
  };

  // Validate price inputs with visual feedback
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    // Allow empty value
    if (value === '') {
      setPriceError('');
      setPriceRange({ ...priceRange, [type]: value });
      return;
    }

    // Check if it's a valid number
    if (isNaN(Number(value))) {
      setPriceError('❌ Please enter valid numbers only');
      setPriceRange({ ...priceRange, [type]: value });
      return;
    }

    const numValue = parseFloat(value);
    
    // Check for negative values
    if (numValue < 0) {
      setPriceError('❌ Price cannot be negative');
      setPriceRange({ ...priceRange, [type]: value });
      return;
    }

    // Check min vs max relationship
    if (type === 'min' && priceRange.max && numValue > parseFloat(priceRange.max)) {
      setPriceError('❌ Minimum price cannot exceed maximum price');
      setPriceRange({ ...priceRange, [type]: value });
      return;
    }

    if (type === 'max' && priceRange.min && numValue < parseFloat(priceRange.min)) {
      setPriceError('❌ Maximum price cannot be less than minimum price');
      setPriceRange({ ...priceRange, [type]: value });
      return;
    }

    // Valid input
    setPriceError('');
    setPriceRange({ ...priceRange, [type]: value });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter - more flexible matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const searchTerms = query.split(' ').filter(term => term.length > 0);
        
        // Check if any search term matches
        const matchesSearch = searchTerms.some(term => 
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
        );
        
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
    setSearchError('');
    setPriceError('');
  }, []);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || priceRange.min || priceRange.max;

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
            {/* Search Input - FIXED with onKeyDown */}
            <div className="filter-group">
              <div className={`search-input-wrapper ${searchError ? 'has-error' : ''}`}>
                <Input
                  type="search"
                  placeholder="Try: headphones, watch, keyboard, wallet..."
                  icon="🔍"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  fullWidth
                />
              </div>
              {searchError && (
                <span className="error-text error-shake">{searchError}</span>
              )}
              {!searchQuery && !searchError && (
                <span className="search-hint">💡 Try: "wireless", "phone", "laptop" (Press Enter to search)</span>
              )}
              {searchQuery && !searchError && (
                <span className="success-text">✓ Valid search - Press Enter or just type to filter</span>
              )}
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
              <div className={`price-range ${priceError ? 'has-error' : ''}`}>
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  min="0"
                  step="0.01"
                />
                <span className="price-separator">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              {priceError && <span className="error-text error-shake">{priceError}</span>}
              {!priceError && (priceRange.min || priceRange.max) && (
                <span className="success-text">✓ Price range applied</span>
              )}
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
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

      {/* Hot & New Products Section - Only show when no filters active */}
      {!hasActiveFilters && (
        <>
          {/* Hot Products */}
          <section className="featured-section">
            <div className="featured-header">
              <h2>🔥 Hot Products</h2>
              <p>Our most popular items right now</p>
            </div>
            <div className="featured-grid">
              {hotProducts.map((product) => (
                <div key={product.id} className="featured-card-wrapper">
                  <Badge variant="danger" className="featured-badge">Hot</Badge>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* New Products */}
          <section className="featured-section">
            <div className="featured-header">
              <h2>✨ New Arrivals</h2>
              <p>Fresh additions to our collection</p>
            </div>
            <div className="featured-grid">
              {newProducts.map((product) => (
                <div key={product.id} className="featured-card-wrapper">
                  <Badge variant="success" className="featured-badge">New</Badge>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Divider before all products */}
          <div className="section-divider">
            <h2>All Products</h2>
          </div>
        </>
      )}

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