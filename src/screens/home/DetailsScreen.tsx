import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import AppButton from '../../components/AppButton';

type Props = NativeStackScreenProps<HomeStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <View style={styles.row}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{String(id)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      <AppButton title="Go To Profile" onPress={() => navigation.navigate('Profile' as any)} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  label: { width: 80, fontSize: 16, color: '#374151', fontWeight: '600' },
  value: { fontSize: 16, color: '#111827' },
  button: { marginTop: 24 },
});

export default DetailsScreen;
