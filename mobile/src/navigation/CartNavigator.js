import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Cart} from '../screens';
import addressShipping from '../screens/Cart/adressShipping';
import promotionAvailable from '../screens/Cart/promotionAvailable';
const CartStack = createStackNavigator();
const CartStackNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CartStack.Screen name="Cart" component={Cart} />
      <CartStack.Screen name="Address" component={addressShipping} />
      <CartStack.Screen name="PromoAvai" component={promotionAvailable} />
    </CartStack.Navigator>
  );
};

export default CartStackNavigator;
