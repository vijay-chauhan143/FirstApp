import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getItemById, getItems } from '../api/itemApi';
import { submitInterest } from '../api/interestApi';
import type { Item, ItemFilters, PaginationMeta } from '../types/item';
import type { RootState } from './store';

interface ItemsState {
  items: Item[];
  filters: ItemFilters;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  selectedItem: Item | null;
  selectedItemLoading: boolean;
  selectedItemError: string | null;
  submittingInterest: boolean;
  interestError: string | null;
  interestSuccess: string | null;
}

const initialFilters: ItemFilters = {
  category: '',
  areaCode: '',
  minPrice: '',
  maxPrice: '',
};

const initialState: ItemsState = {
  items: [],
  filters: initialFilters,
  loading: false,
  error: null,
  page: 1,
  limit: 20,
  total: 0,
  hasMore: true,
  selectedItem: null,
  selectedItemLoading: false,
  selectedItemError: null,
  submittingInterest: false,
  interestError: null,
  interestSuccess: null,
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (
    payload: { page?: number; limit?: number; refresh?: boolean } = {},
    thunkApi,
  ) => {
    console.log('fetchItems called with payload:', payload.page);
    const state = thunkApi.getState() as RootState;
    const { page, limit = state.items.limit || 20, refresh = false } = payload;
    const result = await getItems({
      ...state.items.filters,
      page,
      limit,
    });
console.log('fetchItems result:', result);
    return {
      ...result,
      refresh,
    };
  },
);

export const fetchItemById = createAsyncThunk('items/fetchItemById', async (itemId: string) => {
  return getItemById(itemId);
});

export const submitItemInterest = createAsyncThunk(
  'items/submitItemInterest',
  async (itemId: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    if (!itemId || !itemId.trim()) {
      throw new Error('Please provide a valid item ID.');
    }

    const response = await submitInterest({ itemId });
    return {
      itemId,
      interest: response,
      userId: state.user?.id ?? 'CURRENT_USER_ID',
    };
  },
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<ItemFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
      state.error = null;
    },
    clearFilters(state) {
      state.filters = initialFilters;
      state.page = 1;
      state.error = null;
      state.items = [];
    },
    resetInterestFeedback(state) {
      state.interestError = null;
      state.interestSuccess = null;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
      state.selectedItemError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        const { items, pagination, refresh } = action.payload;
        console.log('fetchItems fulfilled with items:', pagination);
        state.loading = false;
        state.error = null;
        state.items = refresh || pagination.page === 1 ? items : [...state.items, ...items];
        state.page = pagination.page;
        state.limit = pagination.limit;
        state.total = pagination.total;
        state.hasMore = pagination.hasMore;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Unable to load listings. Please try again.';
      })
      .addCase(fetchItemById.pending, state => {
        state.selectedItemLoading = true;
        state.selectedItemError = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.selectedItemLoading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.selectedItemLoading = false;
        state.selectedItemError = action.error?.message || 'Unable to load item details.';
      })
      .addCase(submitItemInterest.pending, state => {
        state.submittingInterest = true;
        state.interestError = null;
        state.interestSuccess = null;
      })
      .addCase(submitItemInterest.fulfilled, state => {
        state.submittingInterest = false;
        state.interestSuccess = 'Interest submitted successfully';
      })
      .addCase(submitItemInterest.rejected, (state, action) => {
        state.submittingInterest = false;
        state.interestError = action.error?.message || 'Unable to submit interest. Please try again.';
      });
  },
});

export const { setFilters, clearFilters, resetInterestFeedback, clearSelectedItem } = itemsSlice.actions;
export default itemsSlice.reducer;

export const selectItemsState = (state: RootState) => state.items;
export const selectItems = (state: RootState) => state.items.items;
export const selectFilters = (state: RootState) => state.items.filters;
export const selectPagination = (state: RootState): PaginationMeta => ({
  page: state.items.page,
  limit: state.items.limit,
  total: state.items.total,
  hasMore: state.items.hasMore,
});
