import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Header, IconButton, RadioButton} from '../../components';
import {connect} from 'react-redux';
import {COLORS, FONTS, SIZES, icons, images} from '../../constants';

const Information = ({navigation, appTheme}) => {
  return (
    <View style={{flex: 1}}>
      <Header title="Thông tin cá nhân" navigation={navigation} button="Lưu" />
      <ScrollView
        style={{
          flex: 1,
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: appTheme.backgroundColor,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        {/* save button */}
        <TouchableOpacity
          style={{marginTop: 25, marginHorizontal: 20, alignItems: 'flex-end'}}>
          <Text style={{color: COLORS.blueLight, ...FONTS.h2}}>Lưu</Text>
        </TouchableOpacity>
        {/* Name */}
        <View style={{marginTop: 15, marginHorizontal: 20}}>
          <Text style={{color: appTheme.textColor, ...FONTS.body3}}>
            Họ và tên
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput placeholder="Họ và tên" />
        </View>
        {/* Birthday */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: appTheme.textColor, ...FONTS.body3}}>
            Ngày sinh
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput placeholder="Ngày sinh" />
        </View>
        {/* Gender */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: appTheme.textColor, ...FONTS.body3}}>
            Giới tính
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View style={{width: SIZES.width / 4, alignItems: 'flex-end'}}>
            <RadioButton style={{borderColor: appTheme.textColor}} />
          </View>
          <View style={{width: SIZES.width / 3.5, alignItems: 'flex-end'}}>
            <RadioButton style={{borderColor: appTheme.textColor}} />
          </View>
          <View style={{width: SIZES.width / 3.5, alignItems: 'flex-end'}}>
            <RadioButton style={{borderColor: appTheme.textColor}} />
          </View>
        </View>
        {/* Phone */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: appTheme.textColor, ...FONTS.body3}}>
            Số điện thoại
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput placeholder="Số điện thoại" />
        </View>
        {/* Address */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: appTheme.textColor, ...FONTS.body3}}>
            Địa chỉ
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput placeholder="Địa chỉ" />
        </View>
        {/* Email */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: appTheme.textColor, ...FONTS.body3}}>Email</Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput placeholder="Email" />
        </View>
      </ScrollView>
    </View>
  );
};
function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
}

function mapDispatchToProp(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProp)(Information);
