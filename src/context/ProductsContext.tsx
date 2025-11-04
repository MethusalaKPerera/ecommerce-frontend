import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import { mockProducts } from '../data/mockProducts';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(mockProducts);
      }
    } else {
      setProducts(mockProducts);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Omit<Product, 'id'>) => {
    setProducts(products.map(product =>
      product.id === id ? { ...updatedProduct, id } : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};