import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Headphones',
    category: 'Electronics',
    stock: 15
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Feature-rich smartwatch with health tracking',
    image: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Smart+Watch',
    category: 'Electronics',
    stock: 8
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    description: 'Durable backpack with laptop compartment',
    image: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=Backpack',
    category: 'Accessories',
    stock: 20
  },
  {
    id: 4,
    name: 'USB-C Cable',
    price: 12.99,
    description: 'Fast charging USB-C cable, 6ft long',
    image: 'https://via.placeholder.com/300/FFFF00/000000?text=USB+Cable',
    category: 'Accessories',
    stock: 50
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 59.99,
    description: 'Portable waterproof Bluetooth speaker',
    image: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=Speaker',
    category: 'Electronics',
    stock: 12
  },
  {
    id: 6,
    name: 'Phone Case',
    price: 19.99,
    description: 'Protective phone case with kickstand',
    image: 'https://via.placeholder.com/300/00FFFF/000000?text=Phone+Case',
    category: 'Accessories',
    stock: 30
  }
];