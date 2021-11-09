import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Rewards} from '../screens';

const RewardsStack = createStackNavigator();
const RewardsStackNavigator = () => {
  return (
    <RewardsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RewardsStack.Screen name="Rewards" component={Rewards} />
    </RewardsStack.Navigator>
  );
};

export default RewardsStackNavigator;
