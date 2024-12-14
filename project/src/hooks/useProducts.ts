import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { transformApiProduct } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Replace with actual API endpoint
        const response = await fetch('/api/products');
        const data = await response.json();
        
        const transformedProducts = data.items.map(transformApiProduct);
        setProducts(transformedProducts);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};