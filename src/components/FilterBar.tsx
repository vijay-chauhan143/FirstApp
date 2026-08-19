import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ItemFilters } from '../types/item';
import PriceRangeInput from './PriceRangeInput';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  filters: ItemFilters;
  hasActiveFilter?: boolean;
  onFiltersChange: (updated: Partial<ItemFilters>) => void;
  onApply: () => void;
  onClear: () => void;
  loading: boolean;
};

const categories = ['All', 'Residential', 'Commercial', 'Rental', 'Industrial', 'Agricultural'];

const FilterBar: React.FC<Props> = ({ filters, hasActiveFilter = false, onFiltersChange, onApply, onClear, loading }) => {
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const selectedCategory = filters.category || 'All';

  const closeSheet = () => setShowFilterSheet(false);

  const handleApply = () => {
    closeSheet();
    onApply();
  };

  const handleClear = () => {
    closeSheet();
    onClear();
  };

  return (
    <View style={[styles.container, hasActiveFilter && styles.containerActive]}>

      <TouchableOpacity onPress={() => setShowFilterSheet(true)} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.sectionTitle}>Filters</Text> <Ionicons name="filter-outline" size={24} color="#333" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={showFilterSheet}
        animationType="slide"
        onRequestClose={closeSheet}
      >
        <KeyboardAvoidingView
          style={styles.modalRoot}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable
            style={styles.sheetOverlay}
            onPress={closeSheet}
          />

          <View style={styles.sheetContent}>
            <View style={styles.handle} />

            <Text style={styles.sheetTitle}>Filters</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Category</Text>

              <View style={styles.categoryList}>
                {categories.map(category => {
                  const isSelected = selectedCategory === category;

                  return (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.categoryOption,
                        isSelected && styles.categoryOptionSelected,
                      ]}
                      onPress={() => {
                        onFiltersChange({
                          category: category === 'All' ? '' : category,
                        });
                      }}
                    >
                      <Text
                        style={[
                          styles.categoryOptionText,
                          isSelected &&
                          styles.categoryOptionTextSelected,
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Area code</Text>

              <TextInput
                value={filters.areaCode}
                onChangeText={value =>
                  onFiltersChange({ areaCode: value })
                }
                placeholder="Enter area code"
                placeholderTextColor="#94a3b8"
                keyboardType="number-pad"
                returnKeyType="done"
                style={styles.input}
              />
            </View>

            <PriceRangeInput
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onMinPriceChange={value =>
                onFiltersChange({ minPrice: value })
              }
              onMaxPriceChange={value =>
                onFiltersChange({ maxPrice: value })
              }
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
                disabled={loading}
              >
                <Text style={styles.clearText}>Clear Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}
                disabled={loading}
              >
                <Text style={styles.applyText}>
                  {loading ? 'Applying...' : 'Apply Filter'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    borderColor: '#e2e8f0',
  },
  containerActive: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  sheetOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },

  sheetContent: {
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  // sheetOverlay: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   backgroundColor: 'rgba(15, 23, 42, 0.35)',
  // },
  // sheetContent: {
  //   backgroundColor: '#f8fafc',
  //   borderTopLeftRadius: 24,
  //   borderTopRightRadius: 24,
  //   paddingHorizontal: 16,
  //   paddingTop: 12,
  //   paddingBottom: 24,
  //   maxHeight: '85%',
  // },
  handle: {
    width: 48,
    height: 5,
    backgroundColor: '#cbd5e1',
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbe4ef',
    marginBottom: 8,
  },
  categoryOptionSelected: {
    backgroundColor: '#dff7f4',
    borderColor: '#0ea5a4',
  },
  categoryOptionText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryOptionTextSelected: {
    color: '#0f766e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbe4ef',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0f172a',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  clearText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  applyText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FilterBar;
