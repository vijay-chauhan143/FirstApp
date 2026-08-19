import type { ItemFilters } from '../types/item';

export const isEmail = (value: string): boolean => /@/.test(value);

export const validateFilters = (filters: ItemFilters): string | null => {
  const trimmedAreaCode = filters.areaCode.trim();
  const minPrice = filters.minPrice.trim();
  const maxPrice = filters.maxPrice.trim();

  if (trimmedAreaCode && !/^\d{4,6}$/.test(trimmedAreaCode)) {
    return 'Area code must contain 4 to 6 digits.';
  }

  if (minPrice && Number.isNaN(Number(minPrice))) {
    return 'Minimum price must be a valid number.';
  }

  if (maxPrice && Number.isNaN(Number(maxPrice))) {
    return 'Maximum price must be a valid number.';
  }

  if (minPrice && maxPrice) {
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (min > max) {
      return 'Minimum price cannot be greater than maximum price.';
    }
  }

  return null;
};

export const isValidItemId = (itemId: string): boolean => {
  return !!itemId && itemId.trim().length > 0;
};
