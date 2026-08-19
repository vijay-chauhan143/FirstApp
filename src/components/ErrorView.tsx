import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorView: React.FC<{ message?: string }> = ({ message = 'Something went wrong.' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unable to load listings</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#b91c1c',
  },
  message: {
    marginTop: 8,
    textAlign: 'center',
    color: '#475569',
    fontSize: 14,
  },
});

export default ErrorView;
