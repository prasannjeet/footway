import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  onFavorite: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onFavorite }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
};