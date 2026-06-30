import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from './DrawerNavigator';
import HomeScreen from '../screens/home/HomeScreen';
import DetailsScreen from '../screens/home/DetailsScreen';

export type HomeStackParamList = {
  Home: undefined;
  Details: { id: number; name: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const Hamburger: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 12 }}>
    <Text style={{ fontSize: 22 }}>☰</Text>
  </TouchableOpacity>
);

/**
 * HomeStack shows its own header (so header/hamburger can open the drawer).
 * The hamburger calls `navigation.getParent()?.openDrawer()` to open the drawer
 * which is provided by the higher-level Drawer navigator.
 */
const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => {
          const openDrawer = () => {
            const maybeDrawer = navigation.getParent?.()?.getParent?.();
            (maybeDrawer as DrawerNavigationProp<DrawerParamList> | undefined)?.openDrawer?.();
          };

          return {
            title: 'Home',
            headerLeft: () => <Hamburger onPress={openDrawer} />,
          };
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
