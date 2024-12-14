export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'clothing' | 'shoes' | 'accessories';
  images: string[];
  sizes?: string[];
  colors?: string[];
  availability: boolean;
  merchant: string;
  vendor: string;
  department: string;
};

export type ProductCategory = 'all' | 'clothing' | 'shoes' | 'accessories';