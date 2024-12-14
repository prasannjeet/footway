// API Response Types
export interface ApiProduct {
  merchantId: string;
  variantId: string;
  productName: string;
  supplierModelNumber: string;
  ean: string[];
  size: string;
  price: number | null;
  product_description: string;
  vendor: string;
  quantity: number;
  productType: string[];
  productGroup: string[];
  department: string[];
  image_url: string;
  created: string | null;
  updated: string | null;
}

export interface Merchant {
  id: string;
  name: string;
  count: number;
}

export interface Vendor {
  name: string;
  count: number;
}

export interface ApiResponse {
  totalItems: number;
  merchants: {
    total: number;
    values: Merchant[];
  };
  vendors: {
    total: number;
    values: Vendor[];
  };
}