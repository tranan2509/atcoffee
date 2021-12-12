import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {HeaderBar, IconButton} from '../../components';
import {SIZES, images, COLORS, FONTS, icons} from '../../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as signInActionsCreator from '../SignIn/action';
import {formatDate} from '../../common/format';

const Profile = ({
  themeState,
  navigation,
  signInActions,
  signInState,
  profileState,
  cartState,
}) => {
  const _logOut = callback => {
    signInActions.logOut();
    callback();
  };
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;

  // React.useEffect(() => {
  //   console.log('userInfo', signInState);
  // });
  return (
    <View style={{flex: 1}}>
      <HeaderBar
        userInfo={userInfo}
        navigation={navigation}
        amountProduct={cartState.cart.length}
      />
      <ScrollView
        style={{
          flex: 1,
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: themeState.appTheme.backgroundColor,
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                userInfo.gender == 'Khác'
                  ? icons.profile
                  : {uri: userInfo.image}
              }
              style={{height: 70, width: 70}}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            paddingTop: 5,
          }}>
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
              Giới thiệu
            </Text>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => navigation.navigate('Information')}>
              <Text
                style={{
                  paddingTop: 5,
                  color: COLORS.blueLight,
                  alignSelf: 'flex-end',

                  ...FONTS.body3,
                }}>
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
          {/* Name */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={
                userInfo.gender == 'Nữ'
                  ? images.avatarFemale
                  : userInfo.gender == 'Nam'
                  ? images.avatarMale
                  : icons.profile
              }
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.name}
            </Text>
          </View>
          {/* Birthday */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.birthday}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {formatDate(userInfo.dob)}
            </Text>
          </View>
          {/* Gender */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.gender}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.gender}
            </Text>
          </View>
          {/* Phone number */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.phone}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.phone}
            </Text>
          </View>
          {/* address */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.address}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.address}
            </Text>
          </View>
          {/* Email */}
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.mail}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.email}
            </Text>
          </View>
        </View>
        {/* reset password */}
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('ChangePassword', {forgot: true})}>
          <IconButton
            icon={icons.resetpassword}
            iconStyle={{tintColor: themeState.appTheme.textColor}}
          />
          <Text
            style={{
              paddingTop: 5,
              color: themeState.appTheme.textColor,
              ...FONTS.body3,
              marginLeft: 10,
            }}>
            Đổi mật khẩu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            marginTop: 10,
          }}
          onPress={() => _logOut(() => navigation.navigate('ManageOrder'))}>
          <IconButton
            icon={icons.logout}
            iconStyle={{tintColor: themeState.appTheme.textColor}}
          />
          <Text
            style={{
              paddingTop: 5,
              color: themeState.appTheme.textColor,
              ...FONTS.body3,
              marginLeft: 10,
            }}>
            Đơn hàng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            marginTop: 10,
          }}
          onPress={() => _logOut(() => navigation.push('SignIn'))}>
          <IconButton
            icon={icons.logout}
            iconStyle={{tintColor: themeState.appTheme.textColor}}
          />
          <Text
            style={{
              paddingTop: 5,
              color: themeState.appTheme.textColor,
              ...FONTS.body3,
              marginLeft: 10,
            }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    signInState: state.signInReducer,
    profileState: state.profileReducer,
    cartState: state.cartReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    signInActions: bindActionCreators(signInActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
