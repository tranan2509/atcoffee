import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Profile, Information} from '../screens';

const ProfileStack = createStackNavigator();
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Information" component={Information} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
