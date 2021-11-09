import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SignUp} from '../screens';

const SignUpStack = createStackNavigator();
const SignUpStackNavigator = () => {
  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SignUpStack.Screen name="SignUp" component={SignUp} />
    </SignUpStack.Navigator>
  );
};

export default SignUpStackNavigator;
