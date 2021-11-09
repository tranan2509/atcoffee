import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {HeaderBar, IconButton} from '../../components';
import {SIZES, images, COLORS, FONTS, icons} from '../../constants';
import {connect} from 'react-redux';

const Profile = ({appTheme}) => {
  return (
    <View style={{flex: 1}}>
      <HeaderBar />
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          {/* Avatar */}
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              backgroundColor: COLORS.white,
              padding: 10,
              marginBottom: 10,
            }}>
            <Image
              source={images.avatarFemale}
              style={{height: 70, width: 70}}
            />
          </View>
          <View>
            <Text
              style={{
                paddingTop: 5,
                color: appTheme.textColor,
                marginBottom: 10,
                ...FONTS.body3,
              }}>
              Nguyễn Thị Minh Thư
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingBottom: 20,
          }}>
          <IconButton
            icon={icons.info}
            iconStyle={{tintColor: appTheme.textColor}}
          />
          <Text
            style={{
              paddingTop: 5,
              color: appTheme.textColor,
              ...FONTS.body3,
              marginLeft: 10,
            }}>
            Thông tin cá nhân
          </Text>
        </View>
        <View
          style={{
            backgroundColor: appTheme.textColor,
            height: 0.75,
            width: 250,
            marginLeft: 56,
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 20,
          }}>
          <IconButton
            icon={icons.logout}
            iconStyle={{tintColor: appTheme.textColor}}
          />
          <Text
            style={{
              paddingTop: 5,
              color: appTheme.textColor,
              ...FONTS.body3,
              marginLeft: 10,
            }}>
            Đăng xuất
          </Text>
        </View>
        <View
          style={{
            backgroundColor: appTheme.textColor,
            height: 0.75,
            width: 250,
            marginLeft: 56,
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
