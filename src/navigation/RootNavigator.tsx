import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';

// For simplicity, start with App flow. In production you'd wire auth state here.
const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
