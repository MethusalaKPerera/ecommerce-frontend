import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoginModal from '../components/common/LoginModal';
import { useUser } from '../context/UserContext';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Badge variant="secondary" pill>✨ New Collection 2025</Badge>
          <h1 className="hero-title">
            Discover Your Perfect
            <span className="gradient-text"> Style</span>
          </h1>
          <p className="hero-subtitle">
            Elevate your shopping experience with our curated collection of premium products
          </p>
          <div className="hero-buttons">
            <Link to="/products">
              <Button variant="primary" size="large" icon="→">
                Shop Now
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="large">
                View Collection
              </Button>
            </Link>
          </div>

          {/* Login Button - Only show if not logged in */}
          {!user && (
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Button 
                variant="ghost" 
                onClick={() => setIsLoginModalOpen(true)}
                icon="🔐"
              >
                Login to Access Admin Panel
              </Button>
            </div>
          )}
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="floating-card card-1">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" alt="Product" />
          </div>
          <div className="floating-card card-2">
            <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80" alt="Product" />
          </div>
          <div className="floating-card card-3">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" alt="Product" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Browse our diverse collection</p>
        </div>
        
        <div className="categories-grid">
          <Link to="/products" className="category-card">
            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80" alt="Electronics" />
            <div className="category-overlay">
              <h3>Electronics</h3>
              <p>Latest Tech Gadgets</p>
            </div>
          </Link>
          
          <Link to="/products" className="category-card">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80" alt="Fashion" />
            <div className="category-overlay">
              <h3>Fashion</h3>
              <p>Trendy Clothing</p>
            </div>
          </Link>
          
          <Link to="/products" className="category-card">
            <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80" alt="Accessories" />
            <div className="category-overlay">
              <h3>Accessories</h3>
              <p>Premium Collection</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>Experience the difference with our premium service</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon gradient-1">
              <span>🚚</span>
            </div>
            <h3>Free Shipping</h3>
            <p>Free delivery on orders over $50. Shop without worries!</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon gradient-2">
              <span>🔒</span>
            </div>
            <h3>Secure Payment</h3>
            <p>100% secure transactions with encrypted checkout</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon gradient-3">
              <span>⚡</span>
            </div>
            <h3>Fast Delivery</h3>
            <p>Get your orders delivered within 2-3 business days</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon gradient-4">
              <span>🎁</span>
            </div>
            <h3>Special Offers</h3>
            <p>Exclusive deals and discounts for our customers</p>
          </div>
        </div>
      </section>

      {/* Trending Products Preview */}
      <section className="trending-section">
        <div className="section-header">
          <h2>Trending Now</h2>
          <p>Check out our most popular products</p>
        </div>
        
        <div className="trending-grid">
          <Card variant="glass" hover>
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" 
              alt="Trending Product"
              className="trending-image"
            />
            <div className="trending-content">
              <div className="trending-header">
                <h3>Wireless Headphones</h3>
                <Badge variant="danger" pill>Hot</Badge>
              </div>
              <p className="trending-price">$79.99</p>
              <Link to="/products">
                <Button variant="primary" fullWidth icon="🛒">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>

          <Card variant="glass" hover>
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" 
              alt="Trending Product"
              className="trending-image"
            />
            <div className="trending-content">
              <div className="trending-header">
                <h3>Smart Watch</h3>
                <Badge variant="success" pill>New</Badge>
              </div>
              <p className="trending-price">$199.99</p>
              <Link to="/products">
                <Button variant="primary" fullWidth icon="🛒">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>

          <Card variant="glass" hover>
            <img 
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80" 
              alt="Trending Product"
              className="trending-image"
            />
            <div className="trending-content">
              <div className="trending-header">
                <h3>Premium Sunglasses</h3>
                <Badge variant="warning" pill>Sale</Badge>
              </div>
              <p className="trending-price">$49.99</p>
              <Link to="/products">
                <Button variant="primary" fullWidth icon="🛒">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/products">
            <Button variant="secondary" size="large" icon="→">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <Card variant="gradient">
          <div className="newsletter-content">
            <h2>Stay Updated!</h2>
            <p>Subscribe to our newsletter for exclusive deals and updates</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <Button variant="secondary" size="large">
                Subscribe
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default Home;