import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ProductGrid from './components/ProductGrid';
import { FilterBar } from './components/filters/FilterBar';
import { ProductCategory } from './types/product';
import IframeEmbed from './components/IframeEmbed';
import ProductDetailsPopup from './components/ProductDetailsPopup';

const SOCKET_URL = "https://a8kko0w0wk4okoogswgwg8kw.coolify.ooguy.com";

function App() {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
    const [selectedSize, setSelectedSize] = useState<string>('all');
    const [selectedVendor, setSelectedVendor] = useState<string>('all');
    const [selectedProductGroup, setSelectedProductGroup] = useState<string>('all');
    const [socketData, setSocketData] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        socket.on('update', (data) => {
            console.log('Received update:', data);
            setSocketData(data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sizes = socketData?.last_search?.items
        ? Array.from(new Set(socketData.last_search.items.map(item => item.size)))
        : [];

    const vendors = socketData?.last_search?.items
        ? Array.from(new Set(socketData.last_search.items.map(item => item.vendor)))
        : [];

    const productGroups = socketData?.last_search?.items
        ? Array.from(
            new Set(
                socketData.last_search.items.flatMap(item => item.productGroup || [])
            )
        )
        : [];

    const filteredProducts = socketData?.last_search?.items.filter(item =>
        (selectedSize === 'all' || item.size === selectedSize) &&
        (selectedVendor === 'all' || item.vendor === selectedVendor) &&
        (selectedProductGroup === 'all' || item.productGroup?.includes(selectedProductGroup))
    ) || [];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Product Display Area */}
            <div className="flex-1 overflow-auto p-6">
                <FilterBar
                    onFilterChange={(filterType, value) => {
                        if (filterType === 'size') {
                            setSelectedSize(value);
                        } else if (filterType === 'vendor') {
                            setSelectedVendor(value);
                        } else if (filterType === 'productGroup') {
                            setSelectedProductGroup(value);
                        }
                    }}
                    selectedSize={selectedSize}
                    selectedVendor={selectedVendor}
                    selectedProductGroup={selectedProductGroup}
                    sizes={sizes}
                    vendors={vendors}
                    productGroups={productGroups}
                />
                {filteredProducts.length > 0 ? (
                    <ProductGrid
                        products={filteredProducts}
                        onProductClick={setSelectedProduct}
                    />
                ) : (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">No products available or still loading...</p>
                    </div>
                )}
            </div>

            {/* Iframe Embed */}
            <div className="w-96 flex flex-col border-l bg-white">
                <IframeEmbed/>
            </div>

            {/* Product Details Popup */}
            {selectedProduct && (
                <ProductDetailsPopup
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

export default App;
