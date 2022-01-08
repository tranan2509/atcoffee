import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Alert,
  ToastAndroid,
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
import {RadioButton, IconButton, LoadingProcess} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SignUpActionsCreator from './action';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
  const [loading, setLoading] = React.useState(false);
  const [idCard, setIdCard] = React.useState('');
  const [flag, setFlag] = React.useState(false);
  const [token, setToken] = React.useState('');
  const getTokenDe = async () => {
    const token = await messaging().getToken();
    setToken(token);
  };
  const addToken = async username => {
    await firestore()
      .collection('usertoken')
      .doc(username)
      .set({token: token})
      .then(() => {
        console.log('update');
      });
  };
  // React.useEffect(() => {
  //   //console.log(signUpState);
  //   //getTokenDe();
  //   //console.log(firestore().collection('usertoken').get());
  //   if (phone) {
  //     addToken(phone);
  //   }
  //   console.log('update');
  // }, [phone]);
  React.useEffect(() => {
    //console.log(signUpState);
    getTokenDe();
    //console.log(firestore().collection('usertoken').get());
    //addToken('nam');
    if (loading) {
      setLoading(false);
    }
    return () => setLoading(false);
  }, []);
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

  const signUpHandler = async () => {
    if (flag === false) {
      if (
        name &&
        phone &&
        password &&
        passwordConfirm &&
        email &&
        address &&
        idCard
      ) {
        if (selectedMale || selectedFemale || selectedOther) {
          if (password === passwordConfirm) {
            setLoading(true);
            setFlag(true);
            if (selectedMale) {
              await addToken(phone);
              await signUpActions.signUp(
                name,
                'Nam',
                phone,
                idCard,
                email,
                password,
                address,
              );
              ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);
            } else if (selectedFemale) {
              await signUpActions.signUp(
                name,
                'Nữ',
                phone,
                idCard,
                email,
                password,
                address,
              );
              //console.log('nữ');
              ToastAndroid.show('Đăng ký thành công', ToastAndroid.LONG);
            } else {
              await signUpActions.signUp(
                name,
                'Khác',
                phone,
                idCard,
                email,
                password,
                address,
              );
              //console.log('khác');
              ToastAndroid.show('Đăng ký thành công!', ToastAndroid.LONG);
            }
          } else {
            Alert.alert(
              'Thông báo',
              'Mật khẩu và Nhập lại mật khẩu không giống nhau!',
              [
                {
                  text: 'Bỏ qua',
                  onPress: () => {},
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {}},
              ],
            );
            //alert('Mật khẩu và Nhập lại mật khẩu không giống nhau');
          }
        } else {
          Alert.alert('Thông báo', 'Phải chọn giới tính!', [
            {
              text: 'Bỏ qua',
              onPress: () => {},
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {}},
          ]);
          //alert('Chọn giới tính');
        }
      } else {
        Alert.alert('Thông báo', 'Phải điền tất cả các trường!', [
          {
            text: 'Bỏ qua',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {}},
        ]);
        //alert('Điền tất cả các trường');
      }
    }
  };

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
                height: 150,
                width: 150,
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
            //keyboardType="ascii-capable"
          />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.textInput}
            placeholderTextColor="black"
            keyboardType="number-pad"
            onChangeText={setPhone}
            value={phone}
          />
          <TextInput
            placeholder="CMND/CCCD"
            style={styles.textInput}
            placeholderTextColor="black"
            keyboardType="number-pad"
            onChangeText={setIdCard}
            value={idCard}
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
                if (selectedFemale) {
                  setSelectedFemale(false);
                }
                if (selectedOther) {
                  setSelectedOther(false);
                }
              }}>
              <View style={{width: width / 3.7, alignItems: 'flex-end'}}>
                <RadioButton
                  style={{marginVertical: 5, backgroundColor: 'white'}}
                  selected={selectedMale}
                />
                <Text>Nam</Text>
              </View>
            </TapGestureHandler>
            <TapGestureHandler
              onHandlerStateChange={() => {
                setSelectedFemale(true);
                if (selectedMale) {
                  setSelectedMale(false);
                }
                if (selectedOther) {
                  setSelectedOther(false);
                }
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
                setSelectedOther(true);
                if (selectedMale) {
                  setSelectedMale(false);
                }
                if (selectedFemale) {
                  setSelectedFemale(false);
                }
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
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="Địa chỉ"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={setAddress}
            value={address}
            //keyboardType="numeric"
          />
          <TapGestureHandler onHandlerStateChange={signUpHandler}>
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
                  Đăng nhập
                </Text>
              </View>
            </TapGestureHandler>
          </View>
        </Animated.View>
        {loading ? (
          <View zIndex={1} style={{marginTop: -250, height: 350}}>
            <LoadingProcess title="Đang tải ..." />
          </View>
        ) : null}
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
