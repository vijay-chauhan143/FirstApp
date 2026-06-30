import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

type Props = { size?: 'small' | 'large' | number };

const Loader: React.FC<Props> = ({ size = 'large' }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} />
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});

export default Loader;
