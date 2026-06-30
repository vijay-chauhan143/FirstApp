import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from './DrawerNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

export type BottomTabParamList = {
  HomeStack: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * Bottom tabs remain visible at all times. The Home stack shows a header
 * with a hamburger that opens the drawer (the drawer overlays the tabs).
 */
const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
      {/* HomeStack handles its own header (and hamburger) */}
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ title: 'Home' }} />

      {/* For simple screens (Profile/Settings) add a header with hamburger */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'Profile',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                const maybeDrawer = navigation.getParent?.();
                (maybeDrawer as DrawerNavigationProp<DrawerParamList> | undefined)?.openDrawer?.();
              }}
              style={{ paddingHorizontal: 12 }}
            >
              <Text style={{ fontSize: 22 }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                const maybeDrawer = navigation.getParent?.();
                (maybeDrawer as DrawerNavigationProp<DrawerParamList> | undefined)?.openDrawer?.();
              }}
              style={{ paddingHorizontal: 12 }}
            >
              <Text style={{ fontSize: 22 }}>☰</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
