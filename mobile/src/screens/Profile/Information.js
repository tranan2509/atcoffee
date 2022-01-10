import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Header, RadioButton} from '../../components';
import {connect} from 'react-redux';
import {COLORS, FONTS, SIZES, icons, images} from '../../constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {formatDate} from '../../common/format';
import {bindActionCreators} from 'redux';
import * as profileActionsCreators from './action';
import * as signInActionsCreator from '../SignIn/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Information = ({
  navigation,
  themeState,
  signInState,
  profileActions,
  signInActions,
}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  let date = formatDate(userInfo.dob);
  const [dob, setDob] = React.useState(false);
  const [yourDob, setYourDob] = React.useState(date);
  const [name, setName] = React.useState(userInfo.name);
  const [identityCard, setIdentityCard] = React.useState(userInfo.identityCard);
  const [selectedMale, setSelectedMale] = React.useState(false);
  const [selectedFemale, setSelectedFemale] = React.useState(false);
  const [selectedOther, setSelectedOther] = React.useState(false);
  const [phone, setPhone] = React.useState(userInfo.phone);
  const [email, setEmail] = React.useState(userInfo.email);
  const [address, setAddress] = React.useState(userInfo.address);
  const [birthday, setBirthday] = React.useState(userInfo.dob);
  const onConfirm = async date => {
    await hideDatePicker();
    setYourDob(formatDate(date));
    setBirthday(date);
  };
  const showDateTimePicker = () => {
    setDob(true);
  };
  React.useEffect(() => {
    if (userInfo.gender == 'Nữ') {
      setSelectedFemale(true);
      setSelectedMale(false);
      setSelectedOther(false);
    } else if (userInfo.gender == 'Nam') {
      setSelectedMale(true);
      setSelectedFemale(false);
      setSelectedOther(false);
    } else {
      setSelectedOther(true);
      setSelectedMale(false);
      setSelectedFemale(false);
    }
  }, []);

  const hideDatePicker = () => {
    setDob(false);
  };

  const editProfileHandler = async callback => {
    let gender;
    if (selectedFemale) {
      gender = 'Nữ';
    } else if (selectedMale) {
      gender = 'Nam';
    } else {
      gender = 'Khác';
    }
    await profileActions.editProfile(
      userInfo.id,
      name,
      gender,
      phone,
      identityCard,
      email,
      userInfo.password,
      address,
      birthday,
      userInfo.accumulatedPoints,
      userInfo.currentPoints,
    );
    await signInActions.getUser(userInfo.username);
    callback();
  };
  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      extraHeight={120}
      enableAutomaticScroll={true}
      extraScrollHeight={120}
      enableOnAndroid={true}
      keyboardShouldPersistTaps={'handled'}
      enableResetScrollToCoords={false}>
      <Header title="Thông tin cá nhân" navigation={navigation} button="Lưu" />
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
        {/* save button */}
        <TouchableOpacity
          style={{marginTop: 25, marginHorizontal: 20, alignItems: 'flex-end'}}
          onPress={() =>
            editProfileHandler(() => navigation.navigate('Profile'))
          }>
          <Text
            style={{
              color:
                themeState.appTheme.name === 'dark'
                  ? COLORS.perano
                  : COLORS.blueLight,
              textDecorationLine: 'underline',
              ...FONTS.h2,
            }}>
            Lưu
          </Text>
        </TouchableOpacity>
        {/* Name */}
        <View style={{marginTop: 15, marginHorizontal: 20}}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
            Họ và tên
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: themeState.appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{fontSize: 15, color: 'black'}}
          />
        </View>
        {/* Birthday */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
            Ngày sinh
          </Text>
        </View>
        <TouchableOpacity
          style={{
            borderColor: COLORS.gray,
            backgroundColor: themeState.appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onPress={showDateTimePicker}>
          <TextInput
            editable={false}
            value={yourDob}
            style={{fontSize: 15, color: 'black'}}
          />
        </TouchableOpacity>
        {/* idcard */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
            CMND/CCCD
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: themeState.appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput
            value={identityCard}
            onChangeText={setIdentityCard}
            style={{fontSize: 15, color: 'black'}}
          />
        </View>
        {/* Gender */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
            Giới tính
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            paddingBottom: 10,
          }}>
          <TouchableOpacity
            style={{
              width: SIZES.width / 4,
              alignItems: 'flex-end',
            }}
            onPress={() => {
              setSelectedMale(true);
              if (selectedFemale) {
                setSelectedFemale(false);
              }
              if (selectedOther) {
                setSelectedOther(false);
              }
            }}>
            <RadioButton
              style={{borderColor: themeState.appTheme.textColor}}
              selected={selectedMale}
            />
            <View style={{paddingTop: 5}}>
              <Text
                style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
                Nam
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: SIZES.width / 3.5, alignItems: 'flex-end'}}
            onPress={() => {
              setSelectedFemale(true);
              if (selectedMale) {
                setSelectedMale(false);
              }
              if (selectedOther) {
                setSelectedOther(false);
              }
            }}>
            <RadioButton
              style={{borderColor: themeState.appTheme.textColor}}
              selected={selectedFemale}
            />
            <View style={{paddingTop: 5}}>
              <Text
                style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
                Nữ
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: SIZES.width / 3.5, alignItems: 'flex-end'}}
            onPress={() => {
              setSelectedOther(true);
              if (selectedFemale) {
                setSelectedFemale(false);
              }
              if (selectedMale) {
                setSelectedMale(false);
              }
            }}>
            <RadioButton
              style={{borderColor: themeState.appTheme.textColor}}
              selected={selectedOther}
            />
            <View style={{paddingTop: 5}}>
              <Text
                style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
                Khác
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Phone */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
            Số điện thoại
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: themeState.appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={{fontSize: 15, color: 'black'}}
          />
        </View>
        {/* Address */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
            Địa chỉ
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: themeState.appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={{fontSize: 15, color: 'black'}}
          />
        </View>
        {/* Email */}
        <View style={{marginTop: 5, marginHorizontal: 20}}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
            Email
          </Text>
        </View>
        <View
          style={{
            borderColor: COLORS.gray,
            backgroundColor: themeState.appTheme.textColor,
            borderRadius: 20,
            marginHorizontal: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{fontSize: 15, color: 'black'}}
          />
        </View>
        <DateTimePicker
          mode="date"
          date={new Date()}
          onConfirm={onConfirm}
          onCancel={hideDatePicker}
          isVisible={dob}
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};
function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    signInState: state.signInReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    profileActions: bindActionCreators(profileActionsCreators, dispatch),
    signInActions: bindActionCreators(signInActionsCreator, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(Information);
