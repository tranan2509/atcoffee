import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Tabs from './tabs';
import SignUpNavigator from './SignUpNavigator';
import SignInNavigator from './SignInNavigator';
import CartNavigator from './CartNavigator';
import LocationStackNavigator from './LocationNavigator';
import {
  Order,
  OrderDetail,
  Notification,
  Location,
  changePassword,
  ManageOrder,
  detailsOrder,
} from '../screens';

const AppContainerStack = createStackNavigator();
const AppContainer = () => {
  return (
    <AppContainerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppContainerStack.Screen name="SignIn" component={SignInNavigator} />
      <AppContainerStack.Screen name="Main" component={Tabs} />
      <AppContainerStack.Screen name="SignUp" component={SignUpNavigator} />
      {/* <AppContainerStack.Screen name="Notification" component={Notification} /> */}
      <AppContainerStack.Screen name="Location" component={Location} />
      <AppContainerStack.Screen name="Order" component={Order} />
      <AppContainerStack.Screen name="OrderDetail" component={OrderDetail} />
      <AppContainerStack.Screen name="Cart" component={CartNavigator} />
      <AppContainerStack.Screen name="ManageOrder" component={ManageOrder} />
      <AppContainerStack.Screen name="DetailOrder" component={detailsOrder} />
      <AppContainerStack.Screen
        name="ChangePassword"
        component={changePassword}
      />
    </AppContainerStack.Navigator>
  );
};

export default AppContainer;
