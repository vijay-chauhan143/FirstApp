import { api } from './client';
import type { Item, ItemFilters, ItemsResponse } from '../types/item';

const normalizeItem = (item: any): Item => {
  const normalized = item ?? {};

  return {
    _id: String(normalized._id ?? normalized.id ?? ''),
    title: String(normalized.title ?? 'Untitled Listing'),
    category: String(normalized.category ?? 'General'),
    areaCode: String(normalized.areaCode ?? normalized.area_code ?? ''),
    price: Number(normalized.price ?? 0),
    status: String(normalized.status ?? 'Available') as Item['status'],
    description: String(normalized.description ?? 'No description available.'),
    city: normalized.city ? String(normalized.city) : undefined,
    bedrooms: normalized.bedrooms !== undefined ? Number(normalized.bedrooms) : undefined,
    bathrooms: normalized.bathrooms !== undefined ? Number(normalized.bathrooms) : undefined,
    imageUrl: normalized.imageUrl ? String(normalized.imageUrl) : undefined,
    createdAt: normalized.createdAt ? String(normalized.createdAt) : undefined,
  };
};

const normalizeItemsResponse = (payload: any): ItemsResponse => {
  // debugger
  const data = payload?.data ?? payload;
  const itemsSource = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data) ? data : [];
console.log('payload', payload);
  const paginationSource = data?.pagination ?? {
    page: payload.pagination?.page ?? 1,
    limit: payload.pagination?.limit ?? 20,
    total: payload.pagination?.total ?? itemsSource.length,
    hasMore: payload.pagination?.hasMore ?? false,
  };

  return {
    items: itemsSource.map(normalizeItem),
    pagination: {
      page: Number(paginationSource.page ?? 1),
      limit: Number(paginationSource.limit ?? itemsSource.length ?? 20),
      total: Number(paginationSource.total ?? itemsSource.length),
      hasMore: Boolean(paginationSource.hasMore ?? false),
    },
  };
};

const buildQueryParams = (params: Partial<ItemFilters> & { page?: number; limit?: number } = {}) => {
  const cleanParams: Record<string, string | number> = {};

  if (params.category) {
    cleanParams.category = params.category;
  }

  if (params.areaCode) {
    cleanParams.areaCode = params.areaCode;
  }

  if (params.minPrice !== '' && params.minPrice !== undefined && params.minPrice !== null) {
    cleanParams.minPrice = Number(params.minPrice);
  }

  if (params.maxPrice !== '' && params.maxPrice !== undefined && params.maxPrice !== null) {
    cleanParams.maxPrice = Number(params.maxPrice);
  }

  if (params.page) {
    cleanParams.page = params.page;
  }

  if (params.limit) {
    cleanParams.limit = params.limit;
  }

  return cleanParams;
};

export const getItems = async (
  params: Partial<ItemFilters> & { page?: number; limit?: number } = {},
): Promise<ItemsResponse> => {
  const response = await api.get('/api/items', {
    params: buildQueryParams(params),
  });
console.log('========',response.data);
  return normalizeItemsResponse(response.data);
};

export const getItemById = async (itemId: string): Promise<Item> => {
  const response = await api.get(`/api/items/${itemId}`);

  const payload = response.data?.data ?? response.data;
  return normalizeItem(payload);
};
