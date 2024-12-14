import { ApiProduct, ApiResponse } from '../types/api';
import { Product } from '../types/product';

export const transformApiProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.variantId,
    name: apiProduct.productName,
    description: apiProduct.product_description.replace(/<[^>]*>/g, ''),
    price: apiProduct.price || 0,
    category: mapProductTypeToCategory(apiProduct.productType[0]),
    images: [apiProduct.image_url],
    sizes: [apiProduct.size],
    availability: apiProduct.quantity > 0,
    merchant: apiProduct.merchantId,
    vendor: apiProduct.vendor,
    department: apiProduct.department[0],
  };
};

const mapProductTypeToCategory = (type: string): 'clothing' | 'shoes' | 'accessories' => {
  const typeMap: Record<string, 'clothing' | 'shoes' | 'accessories'> = {
    'Apparels': 'clothing',
    'Shoes': 'shoes',
    'Accessories': 'accessories',
  };
  return typeMap[type] || 'accessories';
};