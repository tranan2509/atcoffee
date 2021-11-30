import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Location, Order, OrderDetail, Cart} from '../screens';

const ProfileStack = createStackNavigator();
const LocationStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Location" component={Location} />
      <ProfileStack.Screen name="Order" component={Order} />
      <ProfileStack.Screen name="OrderDetail" component={OrderDetail} />
      <ProfileStack.Screen name="Cart" component={Cart} />
    </ProfileStack.Navigator>
  );
};

export default LocationStackNavigator;
