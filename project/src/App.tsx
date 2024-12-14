import React, { useState } from 'react';
import { ChatMessage } from './components/chat/ChatMessage';
import { ChatInput } from './components/chat/ChatInput';
import { ProductGrid } from './components/products/ProductGrid';
import { FilterBar } from './components/filters/FilterBar';
import { useChat } from './hooks/useChat';
import { useProducts } from './hooks/useProducts';
import { ProductCategory } from './types/product';

function App() {
  const { messages, sendMessage } = useChat();
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  const handleFavorite = (productId: string) => {
    // TODO: Implement favorite functionality
    console.log('Favorited product:', productId);
  };

  const filteredProducts = products.filter(
    product => selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Product Display Area */}
      <div className="flex-1 overflow-auto p-6">
        <FilterBar
          onFilterChange={(category) => setSelectedCategory(category as ProductCategory)}
          selectedCategory={selectedCategory}
        />
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} onFavorite={handleFavorite} />
        )}
      </div>

      {/* Chat Interface */}
      <div className="w-96 flex flex-col border-l bg-white">
        <div className="flex-1 overflow-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;