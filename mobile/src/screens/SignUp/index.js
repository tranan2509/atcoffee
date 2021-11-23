import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  withDelay,
} from 'react-native-reanimated';
import {images, icons} from '../../constants';
import {RadioButton, IconButton} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SignUpActionsCreator from './action';

const SignUp = ({navigation, signUpActions, signUpState}) => {
  const {width, height} = Dimensions.get('window');
  const opacityForm = useSharedValue(0);
  const [selectedMale, setSelectedMale] = React.useState(false);
  const [selectedFemale, setSelectedFemale] = React.useState(false);
  const [selectedOther, setSelectedOther] = React.useState(false);
  const [hide, setHide] = React.useState(true);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  React.useEffect(() => {
    console.log(signUpState);
  });
  React.useEffect(() => {
    opacityForm.value = withDelay(
      500,
      withTiming(1, {
        duration: 2000,
        easing: Easing.bezier(0.25, 0.35, 0.5, 0.7),
      }),
    );
  }, []);
  const styleImage = useAnimatedStyle(() => {
    const translateY = interpolate(
      opacityForm.value,
      [0, 0.5, 1],
      [-height, -height / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          translateY: translateY,
        },
      ],
    };
  });
  const styleForm = useAnimatedStyle(() => {
    const translateY = interpolate(
      opacityForm.value,
      [0, 0.5, 1],
      [height / 1.55, height / 3, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacityForm.value,
      transform: [
        {
          translateY: translateY,
        },
      ],
    };
  });

  function signUpHandler() {
    if (name && phone && password && passwordConfirm && email && address) {
      if (selectedMale || selectedFemale || selectedOther) {
        if (password === passwordConfirm) {
          if (selectedMale) {
            signUpActions.signUp(name, 'Nam', phone, email, password, address);
          } else if (selectedFemale) {
            signUpActions.signUp(name, 'Nữ', phone, email, password, address);
          } else {
            signUpActions.signUp(name, 'Khác', phone, email, password, address);
          }
        } else {
          alert('Mật khẩu và Nhập lại mật khẩu không giống nhau');
        }
      } else {
        alert('Chọn giới tính');
      }
    } else {
      alert('Điền tất cả các trường');
    }
  }

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: 'white',
          //justifyContent: 'flex-end',
        },
      ]}>
      <Animated.View style={[{...StyleSheet.absoluteFill}, styleImage]}>
        <Image
          source={images.background7}
          style={{flex: 1, height: null, width: null}}
        />
      </Animated.View>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        extraHeight={120}
        enableAutomaticScroll={true}
        extraScrollHeight={120}
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}>
        <Animated.View style={[{...styles.form}, styleForm]}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={images.logo}
              resizeMode="stretch"
              style={{
                height: 200,
                width: 200,
                tintColor: 'rgba(0,0,0,2)',
              }}
            />
          </View>
          <TextInput
            placeholder="Họ và tên"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={setPhone}
            value={phone}
          />
          <View style={[styles.textInput, {flexDirection: 'row'}]}>
            <IconButton
              icon={hide ? icons.hidden : icons.password_eye}
              onPress={() => setHide(!hide)}
            />
            <TextInput
              placeholder="Mật khẩu"
              placeholderTextColor="black"
              secureTextEntry={hide}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View style={[styles.textInput, {flexDirection: 'row'}]}>
            <IconButton
              icon={hide ? icons.hidden : icons.password_eye}
              onPress={() => setHide(!hide)}
            />
            <TextInput
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="black"
              secureTextEntry={hide}
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TapGestureHandler
              onHandlerStateChange={() => {
                setSelectedMale(true);
                setSelectedFemale(false);
                setSelectedOther(false);
              }}>
              <View style={{width: width / 3.5, alignItems: 'flex-end'}}>
                <RadioButton
                  style={{marginVertical: 5, backgroundColor: 'white'}}
                  selected={selectedMale}
                />
                <Text>Nam</Text>
              </View>
            </TapGestureHandler>
            <TapGestureHandler
              onHandlerStateChange={() => {
                setSelectedMale(false);
                setSelectedFemale(true);
                setSelectedOther(false);
              }}>
              <View style={{width: width / 4, alignItems: 'flex-end'}}>
                <RadioButton
                  style={{marginVertical: 5, backgroundColor: 'white'}}
                  selected={selectedFemale}
                />
                <Text>Nữ</Text>
              </View>
            </TapGestureHandler>
            <TapGestureHandler
              onHandlerStateChange={() => {
                setSelectedMale(false);
                setSelectedFemale(false);
                setSelectedOther(true);
              }}>
              <View style={{width: width / 4.5, alignItems: 'flex-end'}}>
                <RadioButton
                  style={{marginVertical: 5, backgroundColor: 'white'}}
                  selected={selectedOther}
                />
                <Text>Khác</Text>
              </View>
            </TapGestureHandler>
          </View>

          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="Địa chỉ"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={setAddress}
            value={address}
          />
          <TapGestureHandler
            onHandlerStateChange={() => {
              signUpHandler();
              //navigation.navigate('SignIn')
            }}>
            <View style={styles.button}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Đăng ký</Text>
            </View>
          </TapGestureHandler>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <TapGestureHandler
              onHandlerStateChange={() => navigation.navigate('SignIn')}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontStyle: 'italic'}}>Đã có tài khoản?</Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                    textDecorationLine: 'underline',
                    paddingLeft: 3,
                  }}>
                  Đăng ký
                </Text>
              </View>
            </TapGestureHandler>
          </View>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#37A372',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 3, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  form: {
    backgroundColor: '#70707080',

    marginHorizontal: 10,
    paddingBottom: 20,

    borderRadius: 20,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    backgroundColor: '#dedcdc',
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,2)',
  },
});

function mapStateToProps(state) {
  return {
    signUpState: state.signUpReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    signUpActions: bindActionCreators(SignUpActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(SignUp);
