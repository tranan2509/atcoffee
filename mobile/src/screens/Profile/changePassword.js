import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActionsCreators from './action';
import * as signInActionsCreators from '../SignIn/action';
import {Header, LoadingProcess} from '../../components';
import {COLORS, images, FONTS, icons} from '../../constants';

const changePassword = ({
  signInState,
  themeState,
  profileActions,
  profileState,
  navigation,
  signInActions,
}) => {
  const [email, setEmail] = React.useState('');
  const [resetHide, setResetHide] = React.useState(true);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;

  React.useEffect(() => {});
  const editPassword = async () => {
    setLoading(true);
    await signInActions.editPassword(userInfo, oldPassword, newPassword);
  };
  const editPasswordHandler = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Thông báo', 'Bạn phải nhập hết các trường!', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    } else if (newPassword === confirmPassword) {
      await editPassword();
      setLoading(false);
      Alert.alert('Thông báo', 'Bạn đã cập nhật mật khẩu mới thành công!', [
        {
          text: 'Bỏ qua',
          onPress: () => navigation.navigate('Profile'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('Profile')},
      ]);
    }
  };

  const resetPasswordHandler = async () => {
    const res = await resetPassword();
    if (res) {
      Alert.alert(
        'Thông báo',
        'Bạn kiểm tra email vừa nhập để nhận mật khẩu vừa được reset!',
        [
          {
            text: 'Bỏ qua',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {}},
        ],
      );
      setResetHide(false);
      console.log('profile', profileState);
    } else {
      Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại!', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    }
    setLoading(false);
  };
  const resetPassword = async () => {
    if (email === '') {
      Alert.alert('Thông báo', 'Bạn chưa nhập email!', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
      return false;
    } else {
      setLoading(true);
      await profileActions.resetPassword(email);
      return true;
    }
  };
  //console.log('profile', profileState);
  return (
    <View style={{flex: 1}}>
      <Header
        title={resetHide ? 'Nhập email của bạn' : 'Mật khẩu mới'}
        navigation={navigation}
      />
      <View
        style={{
          backgroundColor: themeState.appTheme.backgroundColor,
          flex: 1,
        }}>
        <View
          style={{
            //backgroundColor: themeState.appTheme.textColor,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
          }}>
          {resetHide ? (
            <View>
              <TextInput
                placeholder="Nhập email"
                value={email}
                onChangeText={setEmail}
                style={{
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 0.5,
                  marginHorizontal: 20,
                  backgroundColor: '#dedcdc',
                  paddingLeft: 10,
                  marginVertical: 5,
                  borderColor: 'rgba(0,0,0,2)',
                }}
              />
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={resetPasswordHandler}>
                <Text
                  style={{
                    color: themeState.appTheme.textColor,
                    ...FONTS.h2,
                    paddingRight: 20,
                    paddingTop: 10,
                  }}>
                  Tiếp tục
                </Text>
              </TouchableOpacity>
              {loading && <LoadingProcess title="Đang tải ..." />}
            </View>
          ) : (
            <View style={{marginVertical: 10}}>
              <TextInput
                placeholder="Nhập password vừa nhận"
                value={oldPassword}
                onChangeText={setOldPassword}
                style={{
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 0.5,
                  marginHorizontal: 20,
                  backgroundColor: '#dedcdc',
                  paddingLeft: 10,
                  marginVertical: 5,
                  borderColor: 'rgba(0,0,0,2)',
                }}
              />
              <TextInput
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                style={{
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 0.5,
                  marginHorizontal: 20,
                  backgroundColor: '#dedcdc',
                  paddingLeft: 10,
                  marginVertical: 5,
                  borderColor: 'rgba(0,0,0,2)',
                }}
              />
              <TextInput
                placeholder="Xác nhận lại khẩu mới"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={{
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 0.5,
                  marginHorizontal: 20,
                  backgroundColor: '#dedcdc',
                  paddingLeft: 10,
                  marginVertical: 5,
                  borderColor: 'rgba(0,0,0,2)',
                }}
              />
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={editPasswordHandler}>
                <Text
                  style={{
                    color: themeState.appTheme.textColor,
                    ...FONTS.h2,
                    paddingRight: 20,
                    paddingTop: 10,
                  }}>
                  Cập nhật
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    signInState: state.signInReducer,
    profileState: state.profileReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    profileActions: bindActionCreators(profileActionsCreators, dispatch),
    signInActions: bindActionCreators(signInActionsCreators, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(changePassword);
