import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants';

const LoadingProcess = ({containerStyle, title}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.lightGreen2,
        height: '40%',
        width: '50%',
        alignSelf: 'center',
        paddingTop: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyle,
      }}>
      <Text style={{paddingBottom: 10}}>{title}</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

export default LoadingProcess;
