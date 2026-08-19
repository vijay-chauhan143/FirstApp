import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyView: React.FC<{ message?: string }> = ({ message = 'No items found.' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No listings</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
  },
});

export default EmptyView;
