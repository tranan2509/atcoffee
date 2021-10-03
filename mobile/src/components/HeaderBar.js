import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {SIZES, COLORS, FONTS, icons} from '../constants';
import {connect} from 'react-redux';
import {toggleTheme} from '../stores/themeAction';

const HeaderBar = ({appTheme, toggleTheme}) => {
  function toggleThemeHandler() {
    if (appTheme.name == 'light') {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }
  }
  return (
    <SafeAreaView
      style={{
        height: 150,
        width: '100%',
        backgroundColor: COLORS.purple,
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {/* Greettings */}
      <View style={{flex: 1, paddingLeft: SIZES.padding}}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
          }}>
          Wendy,
        </Text>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
          }}>
          Welcome back!!!
        </Text>
      </View>

      {/* Toggle Button  */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: SIZES.padding,
          height: 40,
          borderRadius: 20,
          backgroundColor: COLORS.lightPurple,
        }}
        onPress={() => toggleThemeHandler()}>
        {/* Sun */}
        <View
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            ...(appTheme.name == 'light' ? styles.selectedLightModeStyle : {}),
          }}>
          <Image
            source={icons.sunny}
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.white,
            }}
          />
        </View>
        {/* Moon */}
        <View
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            ...(appTheme.name == 'dark' ? styles.selectedNightModeStyle : {}),
          }}>
          <Image
            source={icons.night}
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedNightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  selectedLightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
  },
});

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    toggleTheme: themeType => {
      return dispatch(toggleTheme(themeType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(HeaderBar);
