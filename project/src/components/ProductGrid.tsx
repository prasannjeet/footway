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
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductTile key={product.variantId} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
