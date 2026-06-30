import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/BottomTabNavigator';

type Props = BottomTabScreenProps<BottomTabParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      <Text style={styles.info}>App settings go here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  info: { fontSize: 16, color: '#6b7280', textAlign: 'center' },
});

export default SettingsScreen;
