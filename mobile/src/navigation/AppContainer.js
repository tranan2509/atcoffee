import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Tabs from './tabs';
import SignUpNavigator from './SignUpNavigator';
import SignInNavigator from './SignInNavigator';
import {Location, Order, OrderDetail, Notification} from '../screens';

const AppContainerStack = createStackNavigator();
const AppContainer = () => {
  return (
    <AppContainerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppContainerStack.Screen name="Main" component={Tabs} />
      <AppContainerStack.Screen name="SignIn" component={SignInNavigator} />
      <AppContainerStack.Screen name="SignUp" component={SignUpNavigator} />
      <AppContainerStack.Screen name="Notification" component={Notification} />
      <AppContainerStack.Screen name="Location" component={Location} />
      <AppContainerStack.Screen name="Order" component={Order} />
      <AppContainerStack.Screen name="OrderDetail" component={OrderDetail} />
    </AppContainerStack.Navigator>
  );
};

export default AppContainer;
