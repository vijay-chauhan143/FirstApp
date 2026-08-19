import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppDispatch, RootState } from '../../redux/store';
import { clearFilters, fetchItems, setFilters } from '../../redux/itemsSlice';
import { validateFilters } from '../../utils/validation';
import type { Item, ItemFilters } from '../../types/item';
import FilterBar from '../../components/FilterBar';
import ItemCard from '../../components/ItemCard';
import LoadingView from '../../components/LoadingView';
import EmptyView from '../../components/EmptyView';
import ErrorView from '../../components/ErrorView';
import type { HomeStackParamList } from '../../navigation/HomeStackNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'ItemList'>;

const emptyFilters: ItemFilters = {
  category: '',
  areaCode: '',
  minPrice: '',
  maxPrice: '',
};

const ItemListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error, filters, page, hasMore, total } = useSelector((state: RootState) => state.items);
  const [draftFilters, setDraftFilters] = useState<ItemFilters>(filters);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const hasAppliedFilters = Boolean(
    filters.category ||
    filters.areaCode ||
    filters.minPrice ||
    filters.maxPrice,
  );

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  useEffect(() => {
    dispatch(fetchItems({ page: 1, limit: 20, refresh: true }));
  }, [dispatch]);

  const onFilterChange = useCallback((updated: Partial<ItemFilters>) => {
    setValidationMessage(null);
    setDraftFilters(previous => ({ ...previous, ...updated }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    const validationError = validateFilters(draftFilters);

    if (validationError) {
      setValidationMessage(validationError);
      return;
    }

    setValidationMessage(null);
    dispatch(setFilters(draftFilters));
    dispatch(fetchItems({ page: 1, limit: 20, refresh: true }));
  }, [dispatch, draftFilters]);

  const handleClearFilters = useCallback(() => {
    setValidationMessage(null);
    setDraftFilters(emptyFilters);
    dispatch(clearFilters());
    dispatch(fetchItems({ page: 1, limit: 20, refresh: true }));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(fetchItems({ page: 1, limit: 20, refresh: true }));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <ItemCard
        item={item}
        onPress={currentItem => {
          navigation.navigate('ItemDetail', { itemId: currentItem._id });
        }}
      />
    ),
    [navigation],
  );

  const itemCountText = useMemo(() => `${total} listings`, [total]);

  if (loading && items.length === 0) {
    return <LoadingView message="Loading listings..." />;
  }

  if (error && items.length === 0) {
    return <ErrorView message={error} />;
  }
  const handleLoadMore = () => {

    if (hasMore) {
      dispatch(fetchItems({ page: page + 1, limit: 20, refresh: false }));
    } else {
      console.error('No more listings to load.');
    }
  }
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FilterBar
        filters={draftFilters}
        hasActiveFilter={hasAppliedFilters}
        onFiltersChange={onFilterChange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        loading={loading}
      />

      {validationMessage ? <Text style={styles.banner}>{validationMessage}</Text> : null}
      {error && items.length > 0 ? <Text style={styles.banner}>{error}</Text> : null}

      {items.length === 0 && !loading ? (
        <EmptyView message="Try adjusting your filters or check for another area code." />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}

          // onEndReached={() => {
          //   if (!loading && hasMore) {
          //     handleLoadMore();
          //   }
          // }}
          // onEndReachedThreshold={0.5}

          ListHeaderComponent={
            <Text style={styles.listHeader}>
              {itemCountText}
            </Text>
          }

          ListFooterComponent={
            <>
              {loading && items.length > 0 && (
                <LoadingView message="Loading more listings..." />
              )}

              {!loading && (
                <TouchableOpacity
                  onPress={handleLoadMore}
                  style={{
                    padding: 12,
                    alignItems: 'center',
                  }}
                >
                  <Text>Load More</Text>
                </TouchableOpacity>
              )}
            </>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 16,
    paddingBottom: -30
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 0,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  banner: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    color: '#b91c1c',
  },
});

export default ItemListScreen;
