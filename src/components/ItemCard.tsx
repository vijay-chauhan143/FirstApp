import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Item } from '../types/item';

type Props = {
  item: Item;
  onPress: (item: Item) => void;
};

const ItemCard: React.FC<Props> = ({ item, onPress }) => {
  const statusColors: Record<string, string> = {
    Available: '#16a34a',
    Pending: '#f59e0b',
    Sold: '#dc2626',
  };

  const priceText = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress(item)}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: `${statusColors[item.status] || '#64748b'}22` }]}>
          <Text style={[styles.statusText, { color: statusColors[item.status] || '#64748b' }]}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.category}>{item.category}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Area</Text>
        <Text style={styles.metaValue}>{item.areaCode}</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Price</Text>
        <Text style={styles.price}>₹{priceText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  category: {
    color: '#475569',
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metaLabel: {
    color: '#64748b',
    fontSize: 13,
  },
  metaValue: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '600',
  },
  price: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default React.memo(ItemCard);
