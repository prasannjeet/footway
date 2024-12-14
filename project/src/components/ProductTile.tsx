import React from 'react';

interface ProductTileProps {
    product: {
        productName: string;
        product_description: string;
        image_url: string;
        size: string;
        vendor: string;
        variantId: string;
    };
}

const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
    return (
        <div className="border p-4 rounded shadow-md">
            <img
                src={product.image_url}
                alt={product.productName || 'Product Image'}
                className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{product.productName || 'Unnamed Product'}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.product_description || 'No description available'}</p>
            <p className="text-sm text-gray-600 mb-2">Size: {product.size || 'N/A'}</p>
            <p className="text-sm text-gray-600">Vendor: {product.vendor || 'Unknown Vendor'}</p>
        </div>
    );
};

export default ProductTile;
