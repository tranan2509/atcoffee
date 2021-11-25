import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {HeaderBar, IconButton} from '../../components';
import {SIZES, images, COLORS, FONTS, icons} from '../../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as signInActionsCreator from '../SignIn/action';

const Profile = ({themeState, navigation, signInActions}) => {
  const _logOut = callback => {
    signInActions.logOut();
    callback();
  };
  return (
    <View style={{flex: 1}}>
      <HeaderBar />
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
            }}>
            <Image
              source={images.avatarFemale}
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
              icon={images.avatarFemale}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              Nguyễn Thị Minh Thư
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
              10/02/2000
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
              Nữ
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
              0346279377
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
              2/5 đường 68 phường Hiệp Phú quận 9
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
              minhthuthum@gmail.com
            </Text>
          </View>
        </View>
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
    //error: state.error,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    signInActions: bindActionCreators(signInActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
