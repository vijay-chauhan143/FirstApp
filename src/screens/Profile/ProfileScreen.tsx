import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/BottomTabNavigator';
import AppButton from '../../components/Button/AppButton';

type Props = BottomTabScreenProps<BottomTabParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.info}>This is the profile screen.</Text>
      <AppButton title="Go Back" onPress={() => navigation.goBack()} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  info: { fontSize: 16, color: '#6b7280', marginBottom: 20, textAlign: 'center' },
  button: {},
});

export default ProfileScreen;
