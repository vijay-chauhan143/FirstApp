import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
};

const PriceRangeInput: React.FC<Props> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price range</Text>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.helper}>Min</Text>
          <TextInput
            value={minPrice}
            onChangeText={onMinPriceChange}
            keyboardType="numeric"
            placeholder="1000000"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.helper}>Max</Text>
          <TextInput
            value={maxPrice}
            onChangeText={onMaxPriceChange}
            keyboardType="numeric"
            placeholder="5000000"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  helper: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 6,
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
});

export default PriceRangeInput;
