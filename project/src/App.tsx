import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ProductGrid from './components/ProductGrid';
import { FilterBar } from './components/filters/FilterBar';
import { ProductCategory } from './types/product';
import IframeEmbed from './components/IframeEmbed';

const SOCKET_URL = "https://a8kko0w0wk4okoogswgwg8kw.coolify.ooguy.com";

function App() {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
    const [selectedSize, setSelectedSize] = useState<string>('all');
    const [socketData, setSocketData] = useState(null);

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

    const filteredProducts = socketData?.last_search?.items.filter(item =>
        selectedSize === 'all' || item.size === selectedSize
    ) || [];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Product Display Area */}
            <div className="flex-1 overflow-auto p-6">
                <FilterBar
                    onFilterChange={(size) => setSelectedSize(size)}
                    selectedSize={selectedSize}
                    sizes={sizes}
                />
                {filteredProducts.length > 0 ? (
                    <ProductGrid
                        products={filteredProducts.map(item => ({
                            productName: item.productName || 'Unnamed Product',
                            product_description: item.product_description || 'No description available',
                            image_url: item.image_url || 'https://placehold.co/600x400', // Placeholder image
                            size: item.size || 'N/A',
                            vendor: item.vendor || 'Unknown Vendor',
                            variantId: item.variantId || `temp-${Math.random()}`, // Fallback key
                        }))}
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
        </div>
    );
}

export default App;
