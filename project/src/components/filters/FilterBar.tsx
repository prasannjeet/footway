import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (category: string) => void;
  selectedCategory: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, selectedCategory }) => {
  const categories = ['all', 'clothing', 'shoes', 'accessories'];

  return (
    <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Filter size={20} />
        <span className="font-medium">Filters:</span>
      </div>
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};