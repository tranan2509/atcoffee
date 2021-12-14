import React from 'react';
import {Text, TextStyle, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../constants';

const TabButton = ({containerStyle, label, selected, onPress, textStyle}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Text */}
      <Text
        style={{
          color: selected ? COLORS.primary : COLORS.gray,
          ...FONTS.body2,
          fontSize: 18,
          ...textStyle,
        }}>
        {label}
      </Text>

      {/* Line */}
      <View
        style={{
          marginTop: selected ? 3 : 4,
          height: selected ? 4 : 2,
          width: '100%',
          backgroundColor: selected ? COLORS.primary : COLORS.gray,
        }}
      />
    </TouchableOpacity>
  );
};

export default TabButton;
