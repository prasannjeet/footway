import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
    onFilterChange: (filterType: string, value: string) => void;
    selectedSize: string;
    selectedVendor: string;
    selectedProductGroup: string;
    sizes: string[];
    vendors: string[];
    productGroups: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, selectedSize, selectedVendor, selectedProductGroup, sizes, vendors, productGroups }) => {
    return (
        <div className="flex flex-col gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
                <Filter size={20} />
                <span className="font-medium">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onFilterChange('size', 'all')}
                    className={`px-4 py-2 rounded-md text-sm ${
                        selectedSize === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    All Sizes
                </button>
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onFilterChange('size', size)}
                        className={`px-4 py-2 rounded-md text-sm ${
                            selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onFilterChange('vendor', 'all')}
                    className={`px-4 py-2 rounded-md text-sm ${
                        selectedVendor === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    All Vendors
                </button>
                {vendors.map((vendor) => (
                    <button
                        key={vendor}
                        onClick={() => onFilterChange('vendor', vendor)}
                        className={`px-4 py-2 rounded-md text-sm ${
                            selectedVendor === vendor ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {vendor}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onFilterChange('productGroup', 'all')}
                    className={`px-4 py-2 rounded-md text-sm ${
                        selectedProductGroup === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    All Product Groups
                </button>
                {productGroups.map((group) => (
                    <button
                        key={group}
                        onClick={() => onFilterChange('productGroup', group)}
                        className={`px-4 py-2 rounded-md text-sm ${
                            selectedProductGroup === group ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {group}
                    </button>
                ))}
            </div>
        </div>
    );
};
