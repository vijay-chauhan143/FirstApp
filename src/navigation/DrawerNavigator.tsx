import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import AboutScreen from '../screens/About/AboutScreen';

export type DrawerParamList = {
  Main: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * Drawer is the root navigator. It renders the BottomTabNavigator as the main
 * screen but uses `drawerType: 'front'` so the drawer overlays the tabs
 * (tabs remain visible while drawer is open). Gesture-related settings are
 * tuned to avoid conflicts with tab/swipe gestures.
 */
const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerType: 'front',
        swipeEdgeWidth: 32,
        overlayColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
