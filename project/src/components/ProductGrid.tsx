import React from 'react';
import ProductTile from './ProductTile';

interface ProductGridProps {
    products: Array<{
        productName: string;
        product_description: string;
        image_url: string;
        size: string;
        vendor: string;
        variantId: string;
    }>;
    onProductClick: (product: any) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
    const uniqueProducts = Array.from(
        new Map(products.map(product => [product.productName, product])).values()
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uniqueProducts.map((product) => (
                <ProductTile key={product.variantId} product={product} onClick={() => onProductClick(product)} />
            ))}
        </div>
    );
};

export default ProductGrid;
