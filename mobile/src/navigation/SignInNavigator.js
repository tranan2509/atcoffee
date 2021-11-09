import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SignIn} from '../screens';

const SignInStack = createStackNavigator();
const SignInStackNavigator = () => {
  return (
    <SignInStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SignInStack.Screen name="SignIn" component={SignIn} />
    </SignInStack.Navigator>
  );
};

export default SignInStackNavigator;
