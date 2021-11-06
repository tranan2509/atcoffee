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
import {images} from '../../constants';

const SignUpScreen = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const opacityForm = useSharedValue(0);
  const [selectedMale, setSelectedMale] = React.useState(false);
  const [selectedFemale, setSelectedFemale] = React.useState(false);
  const [selectedOther, setSelectedOther] = React.useState(false);

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
  function RadioButton(props) {
    return (
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          },
          props.style,
        ]}>
        {props.selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}
          />
        ) : null}
      </View>
    );
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
            placeholder="Name"
            style={styles.textInput}
            placeholderTextColor="black"
          />
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
          <TextInput
            placeholder="Confirm Password"
            style={styles.textInput}
            placeholderTextColor="black"
            secureTextEntry={true}
          />
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
          />
          <TextInput
            placeholder="Address"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <View style={styles.button}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN UP</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}>
            <TapGestureHandler
              onHandlerStateChange={() => navigation.navigate('SignIn')}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontStyle: 'italic'}}>
                  Already have an account?
                </Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                    textDecorationLine: 'underline',
                    paddingLeft: 3,
                  }}>
                  Sign In
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

export default SignUpScreen;
