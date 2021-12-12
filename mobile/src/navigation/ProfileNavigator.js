import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Profile, Information, ManageOrder} from '../screens';

const ProfileStack = createStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Information" component={Information} />
      <ProfileStack.Screen name="ManageOrder" component={ManageOrder} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
