import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Location, Order, OrderDetail, Cart} from '../screens';

const LocationStack = createStackNavigator();
const LocationStackNavigator = () => {
  return (
    <LocationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LocationStack.Screen name="Location1" component={Location} />
      {/* <ProfileStack.Screen name="Order" component={Order} />
      <ProfileStack.Screen name="OrderDetail" component={OrderDetail} />
      <ProfileStack.Screen name="Cart" component={Cart} /> */}
    </LocationStack.Navigator>
  );
};

export default LocationStackNavigator;
