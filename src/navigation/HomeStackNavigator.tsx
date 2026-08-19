import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemListScreen from '../screens/home/ItemListScreen';
import ItemDetailScreen from '../screens/home/ItemDetailScreen';

export type HomeStackParamList = {
  ItemList: undefined;
  ItemDetail: { itemId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ItemList"
      // screenOptions={{
      //   headerShown: true,
      //   headerTitle: 'Marketplace',
      //   headerTitleAlign: 'left',
      //   headerShadowVisible: false,
      //   headerStyle: {
      //     backgroundColor: '#f8fafc',
      //   },
      // }}
    >
      <Stack.Screen name="ItemList" component={ItemListScreen} options={{ title: 'Home' }}/>
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ title: 'Listing Detail' }} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
