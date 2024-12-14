import React, { useEffect, useRef } from 'react';

interface ProductDetailsPopupProps {
    product: {
        merchantId: string;
        variantId: string;
        productName: string;
        supplierModelNumber: string;
        ean: string[];
        size: string;
        price: string | null;
        product_description: string;
        vendor: string;
        quantity: number;
        productType: string[];
        productGroup: string[];
        department: string[];
        image_url: string;
        created: string | null;
        updated: string | null;
    };
    onClose: () => void;
}

const ProductDetailsPopup: React.FC<ProductDetailsPopupProps> = ({ product, onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div ref={popupRef} className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <img src={product.image_url} alt={product.productName} className="w-full h-64 object-contain mb-4" />
                <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
                <div className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: product.product_description }} />
                <p className="text-gray-700 mb-2">Size: {product.size}</p>
                <p className="text-gray-700 mb-2">Vendor: {product.vendor}</p>
                <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>
                <p className="text-gray-700 mb-2">Product Type: {product.productType.join(', ')}</p>
                <p className="text-gray-700 mb-2">Product Group: {product.productGroup.join(', ')}</p>
                <p className="text-gray-700 mb-2">Department: {product.department.join(', ')}</p>
                <p className="text-gray-700 mb-2">EAN: {product.ean.join(', ')}</p>
                <p className="text-gray-700 mb-2">Supplier Model Number: {product.supplierModelNumber}</p>
            </div>
        </div>
    );
};

export default ProductDetailsPopup;
