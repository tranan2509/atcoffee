import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Header, IconButton} from '../../components';
import {COLORS, FONTS, icons} from '../../constants';
import {connect} from 'react-redux';

const adressShipping = ({navigation, themeState, cartState, signInState}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  return (
    <View style={{flex: 1}}>
      <Header title="Địa chỉ đã lưu" navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: themeState.appTheme.backgroundColor,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            paddingTop: 5,
          }}>
          {/* default address */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h3,
              }}>
              Mặc định
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.address}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            {/* address */}
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.address}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            marginTop: 15,
          }}>
          {/* default address */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h3,
              }}>
              Địa chỉ 1
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.address}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            {/* address */}
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.address}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    cartState: state.cartReducer,
    orderState: state.orderReducer,
    signInState: state.signInReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProp)(adressShipping);
