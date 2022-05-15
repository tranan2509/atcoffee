import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {images} from '../../constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  Extrapolate,
  withDelay,
} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';
import * as SignInActionsCreator from './action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../constants';
import {LoadingProcess} from '../../components';
import * as locationActionsCreator from '../Location/action';
import * as orderActionsCreator from '../Order/action';
import * as rewardActionsCreator from '../Rewards/action';
import * as cartActionsCreator from '../Cart/action';
import * as themeActionsCreator from '../../appTheme/themeAction';

const SignIn = ({
  navigation,
  signInActions,
  signInState,
  orderActions,
  locationActions,
  rewardActions,
  cartActions,
  themeActions,
  orderState,
}) => {
  const {width, height} = Dimensions.get('window');
  const opacityButton = useSharedValue(1);
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState('');

  const gestureHandler = useAnimatedGestureHandler({
    onEnd: _ => {
      opacityButton.value = withTiming(0, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.25, 0.25, 1),
      });
    },
  });

  const autoLogin = async () => {
    if (!token) {
      const jwt = await AsyncStorage.getItem('token');
      setToken(jwt);
    }
  };
  React.useEffect(() => {
    //remember me
    rememberMeHandler();
    //login auto
    autoLogin();
    if (loading) {
      setLoading(false);
    }
    //get location
    locationActions.getAllLocation();
    //get categories
    orderActions.getAllCategories();
    //get promotion
    rewardActions.getPromotion();
    //get method delivery
    cartActions.getPayment();
    //get method delivery
    cartActions.getDelivery();
    //get rewards
    rewardActions.getReward();
    //get addressShipping
    //cartActions.getAddress();
    //get all products
    orderActions.getAllProducts('');
    //get all Type
    signInActions.getType();
    //get theme
    themeActions.getTheme();
    //realtime

    //clean
    return () => setLoading(false);
  }, []);

  React.useEffect(() => {
    if (token) {
      setLoading(true);
      signInActions.authenticated();
    }
    if (loading) {
      setLoading(false);
    }
    return () => setLoading(false);
  }, [token]);

  React.useEffect(() => {
    if (signInState.error !== '') {
      Alert.alert('Thông báo', 'Đã xảy ra lỗi vui lòng thử lại!', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
      if (loading) {
        setLoading(false);
      }
    }
  }, [signInState.error]);
  const rememberMeHandler = async () => {
    const _username = await AsyncStorage.getItem('username');
    const _password = await AsyncStorage.getItem('password');
    const _remember = await AsyncStorage.getItem('remember');
    if (_remember == 'true') {
      setPhone(_username);
      setPassword(_password);
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  };

  const toggleSwitch = () => {
    setRememberMe(previousState => !previousState);
    async () => await AsyncStorage.setItem('remember', `${!previousState}`);
  };

  const login = async () => {
    navigation.navigate('Main', {screen: 'Home'});
    // setLoading(true);
    // await signInActions.signIn(phone, password);
    // if (rememberMe) {
    //   await AsyncStorage.setItem('username', phone);
    //   await AsyncStorage.setItem('password', password);
    //   await AsyncStorage.setItem('remember', 'true');
    //   //console.log('item', true);
    // } else {
    //   await AsyncStorage.setItem('username', '');
    //   await AsyncStorage.setItem('password', '');
    //   await AsyncStorage.setItem('remember', 'false');
    //   //console.log('item', false);
    // }
  };
  //console.log('sign in', signInState.error);
  const loginHandler = async () => {
    if (phone && password) {
      await login();
      //console.log('sign in', signInState.error);
    } else {
      Alert.alert('Thông báo', 'Nhập đầy đủ thông tin!', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  // React.useEffect(() => {
  //   opacityButton.value = withTiming(0, {
  //     duration: 2750,
  //     easing: Easing.bezier(0.3, 0.45, 0.5, 0.55),
  //   });
  // }, []);

  const onCloseState = useAnimatedGestureHandler({
    onEnd: _ => {
      opacityButton.value = withTiming(1, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.25, 0.25, 1),
      });
    },
  });

  const styleButtonOpacity = useAnimatedStyle(() => {
    const translateButtonY = interpolate(
      opacityButton.value,
      [0, 1],
      [100, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacityButton.value,
      transform: [
        {
          translateY: translateButtonY,
        },
      ],
    };
  });
  const styleImage = useAnimatedStyle(() => {
    const translateImageY = interpolate(
      opacityButton.value,
      [0, 1],
      [-height / 2.3, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          translateY: translateImageY,
        },
      ],
    };
  });
  const styleForm = useAnimatedStyle(() => {
    const translateFormY = interpolate(
      opacityButton.value,
      [0, 1],
      [0, 100],
      Extrapolate.CLAMP,
    );
    const textInputZindex = interpolate(
      opacityButton.value,
      [0, 1],
      [1, -1],
      Extrapolate.CLAMP,
    );
    const textInputOpacity = interpolate(
      opacityButton.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: textInputOpacity,
      zIndex: textInputZindex,
      transform: [
        {
          translateY: translateFormY,
        },
      ],
    };
  });
  const styleCloseButton = useAnimatedStyle(() => {
    const closeButtonRotation = interpolate(
      opacityButton.value,
      [0, 1],
      [180, 360],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          rotate: closeButtonRotation + 'deg',
        },
      ],
    };
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView
        contentContainerStyle={[
          {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'flex-end',
          },
        ]}>
        <Animated.View style={[{...StyleSheet.absoluteFill}, styleImage]}>
          <Image
            source={images.background1}
            style={{
              flex: 1,
              height: null,
              width: null,
            }}
          />
        </Animated.View>
        <View
          style={{
            height: height / 2.3,
            justifyContent: 'center',
          }}>
          {loading ? <LoadingProcess title="Đang tải ..." /> : null}

          <TapGestureHandler onHandlerStateChange={gestureHandler}>
            <Animated.View style={[styles.button, styleButtonOpacity]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome!!!</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={[
              {
                height: height / 2.3,
                ...StyleSheet.absoluteFill,
                top: null,
                justifyContent: 'center',
              },
              styleForm,
            ]}>
            <TapGestureHandler onHandlerStateChange={onCloseState}>
              <Animated.View
                style={{...styles.closeButton, left: width / 2 - 20}}>
                <Animated.Text style={[{fontSize: 15}, styleCloseButton]}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            {/* Sign In */}
            <TextInput
              placeholder="Số điện thoại"
              style={styles.textInput}
              placeholderTextColor="black"
              onChangeText={setPhone}
              value={phone}
            />
            <TextInput
              placeholder="Mật khẩu"
              style={styles.textInput}
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingHorizontal: '5%', flexDirection: 'row'}}>
                <Switch
                  trackColor={{false: '#f4f3f4', true: '#35C677'}}
                  thumbColor={rememberMe ? '#ffffff' : '#6e7376'}
                  onValueChange={toggleSwitch}
                  value={rememberMe}
                />
                <Text style={{paddingTop: '2%', paddingLeft: '2%'}}>
                  Nhớ tài khoản
                </Text>
              </View>
              <TapGestureHandler
                onHandlerStateChange={() =>
                  navigation.push('ChangePassword', {forgot: true})
                }>
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginHorizontal: '5%',
                    marginVertical: '2%',
                    marginLeft: '20%',
                  }}>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      textDecorationLine: 'underline',
                    }}>
                    Quên mật khẩu?
                  </Text>
                </View>
              </TapGestureHandler>
            </View>
            <TapGestureHandler onHandlerStateChange={loginHandler}>
              <View style={styles.button}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Đăng nhập
                </Text>
              </View>
            </TapGestureHandler>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20,
                marginVertical: 5,
              }}>
              <TapGestureHandler
                onHandlerStateChange={() => navigation.navigate('SignUp')}>
                <Animated.View style={{flexDirection: 'row'}}>
                  <Text style={{fontStyle: 'italic'}}>Tài khoản mới?</Text>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      textDecorationLine: 'underline',
                      paddingLeft: 3,
                    }}>
                    Đăng ký
                  </Text>
                </Animated.View>
              </TapGestureHandler>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
      {/* <LoadingModal visible={loading} /> */}
    </KeyboardAvoidingView>
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
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    shadowOffset: {width: 3, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 3,
  },
  container: {
    flex: 1,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,2)',
  },
});

function mapStateToProps(state) {
  return {
    signInState: state.signInReducer,
    orderState: state.orderReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    signInActions: bindActionCreators(SignInActionsCreator, dispatch),
    locationActions: bindActionCreators(locationActionsCreator, dispatch),
    orderActions: bindActionCreators(orderActionsCreator, dispatch),
    rewardActions: bindActionCreators(rewardActionsCreator, dispatch),
    cartActions: bindActionCreators(cartActionsCreator, dispatch),
    themeActions: bindActionCreators(themeActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(SignIn);
