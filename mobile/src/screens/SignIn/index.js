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
  TouchableOpacity,
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

const SignInScreen = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const opacityButton = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onEnd: _ => {
      opacityButton.value = withTiming(0, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.25, 0.25, 1),
      });
    },
  });

  //   React.useEffect(() => {
  //     opacityButton.value = withTiming(0, {
  //       duration: 2750,
  //       easing: Easing.bezier(0.3, 0.45, 0.5, 0.55),
  //     });
  //   }, []);

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
              placeholder="Phone Number"
              style={styles.textInput}
              placeholderTextColor="black"
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor="black"
              secureTextEntry={true}
            />
            <TapGestureHandler
              onHandlerStateChange={() => navigation.navigate('SignUp')}>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginHorizontal: 20,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    fontStyle: 'italic',
                    textDecorationLine: 'underline',
                  }}>
                  Forgot your password?
                </Text>
              </View>
            </TapGestureHandler>
            <View style={styles.button}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
            </View>
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
                  <Text style={{fontStyle: 'italic'}}>New user?</Text>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      textDecorationLine: 'underline',
                      paddingLeft: 3,
                    }}>
                    Sign Up
                  </Text>
                </Animated.View>
              </TapGestureHandler>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
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

export default SignInScreen;
