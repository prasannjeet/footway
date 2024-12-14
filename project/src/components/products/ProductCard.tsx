import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onFavorite: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onFavorite }) => {
  return (
    <div className="group relative rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
        <button
          onClick={() => onFavorite(product.id)}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm hover:bg-gray-100"
        >
          <Heart size={20} />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  );
};