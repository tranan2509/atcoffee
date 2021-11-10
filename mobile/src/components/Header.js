import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import IconButton from './IconButton';
import {COLORS, SIZES, icons, FONTS} from '../constants';

const Header = ({title, navigation}) => {
  return (
    <SafeAreaView
      style={{
        height: 120,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.radius,
          alignItems: 'center',
          marginTop: Platform.OS === 'android' ? 30 : 0,
        }}>
        {/* Back Button */}
        <IconButton
          icon={icons.leftArrow}
          onPress={() => navigation.goBack()}
        />
        {/* Title */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.white, ...FONTS.h1, fontSize: 25}}>
            {title}
          </Text>
        </View>
        {/* Empty */}
        <View style={{width: 25}} />
      </View>
    </SafeAreaView>
  );
};

export default Header;
