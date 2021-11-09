import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Cart} from '../screens';

const CartStack = createStackNavigator();
const CartStackNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CartStack.Screen name="Cart" component={Cart} />
    </CartStack.Navigator>
  );
};

export default CartStackNavigator;
