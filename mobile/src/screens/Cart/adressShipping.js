import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Header, IconButton, LoadingProcess} from '../../components';
import {COLORS, FONTS, icons} from '../../constants';
import {connect} from 'react-redux';
import * as signInActionsCreator from '../SignIn/action';
import * as profileActionsCreator from '../Profile/action';
import {bindActionCreators} from 'redux';
import {Picker} from '@react-native-picker/picker';

const adressShipping = ({
  navigation,
  themeState,
  cartState,
  signInState,
  signInActions,
  profileActions,
}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;

  const [edit, setEdit] = React.useState(userInfo.address);
  const [hide, setHide] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const showEditAddressHandler = () => {
    setHide(true);
  };

  const editAddressHandler = async () => {
    setLoading(true);
    await profileActions.editProfile(
      userInfo.id,
      userInfo.name,
      userInfo.gender,
      userInfo.phone,
      userInfo.identityCard,
      userInfo.email,
      userInfo.password,
      edit,
      userInfo.birthday,
      userInfo.accumulatedPoints,
      userInfo.currentPoints,
    );
    await signInActions.getUser(userInfo.username);
    setHide(false);
    setLoading(false);
  };

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
            }}
            onPress={() => navigation.goBack()}>
            <IconButton
              icon={icons.edited}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
              onPress={showEditAddressHandler}
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
        {hide && (
          <View
            style={{
              backgroundColor:
                themeState.appTheme.name == 'dark'
                  ? COLORS.gray1
                  : COLORS.white,
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                borderBottomColor: themeState.appTheme.textColor,
                borderBottomWidth: 0.5,
                marginLeft: 10,
                marginRight: 20,
              }}>
              <TextInput
                style={{
                  paddingTop: 5,
                  color: themeState.appTheme.textColor,
                  ...FONTS.body3,
                  marginLeft: 10,
                }}
                value={edit}
                onChangeText={setEdit}
              />
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                marginRight: 10,
                marginTop: 7,
                paddingBottom: 5,
              }}
              onPress={editAddressHandler}>
              <Text style={{color: COLORS.blueLight, ...FONTS.h3}}>
                Cập nhật
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {loading && (
          <View zIndex={1} style={{height: 250}}>
            <LoadingProcess title="Đang tải ..." />
          </View>
        )}
        {/* <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            marginTop: 15,
          }}> */}
        {/* default address */}
        {/* <View
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
            /> */}
        {/* address */}
        {/* <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {userInfo.address}
            </Text>
          </TouchableOpacity>
        </View> */}
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
  return {
    signInActions: bindActionCreators(signInActionsCreator, dispatch),
    profileActions: bindActionCreators(profileActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(adressShipping);
