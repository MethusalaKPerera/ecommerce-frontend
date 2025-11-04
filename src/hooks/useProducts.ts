import { useMemo } from 'react';
import { useProducts as useProductsContext } from '../context/ProductsContext';

// Note: Product type is not used in this hook implementation

interface UseProductsFilters {
  category?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function useProducts(filters?: UseProductsFilters) {
  const { products, addProduct, updateProduct, deleteProduct, getProductById } = useProductsContext();

  const filteredProducts = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return products;
    }

    return products.filter((product) => {
      // Filter by category
      if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Filter by search query (name or description)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Filter by price range
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  const stats = useMemo(() => {
    return {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
      lowStockCount: products.filter((p) => p.stock < 10).length,
      categories: categories.length,
    };
  }, [products, categories]);

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
}

