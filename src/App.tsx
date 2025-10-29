import ProductCard from './components/products/ProductCard';
import { Product } from './types/product';
import './App.css';

function App() {
  const sampleProduct: Product = {
    id: 1,
    name: 'Sample Product',
    price: 29.99,
    description: 'This is a sample product for testing',
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 10
  };

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="App">
      <div style={{ maxWidth: '300px', margin: '50px auto' }}>
        <h2>Product Card Demo</h2>
        <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}

export default App;