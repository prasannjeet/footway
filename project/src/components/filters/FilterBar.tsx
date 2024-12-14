import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
    onFilterChange: (size: string) => void;
    selectedSize: string;
    sizes: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, selectedSize, sizes }) => {
    return (
        <div className="flex flex-col gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
                <Filter size={20} />
                <span className="font-medium">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onFilterChange('all')}
                    className={`px-4 py-2 rounded-md text-sm ${
                        selectedSize === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    All
                </button>
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onFilterChange(size)}
                        className={`px-4 py-2 rounded-md text-sm ${
                            selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};
