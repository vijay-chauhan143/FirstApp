export type ItemStatus = 'Available' | 'Pending' | 'Sold';

export interface Item {
  _id: string;
  title: string;
  category: string;
  areaCode: string;
  price: number;
  status: ItemStatus;
  description: string;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  imageUrl?: string;
  createdAt?: string;
}

export interface ItemFilters {
  category: string;
  areaCode: string;
  minPrice: string;
  maxPrice: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ItemsResponse {
  items: Item[];
  pagination: PaginationMeta;
}
