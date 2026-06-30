import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title?: string;
};

const Header: React.FC<Props> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'transparent' },
  title: { fontSize: 18, fontWeight: '700' },
});

export default Header;
