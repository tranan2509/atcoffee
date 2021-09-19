import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { HeaderBar, CustomeButton } from "../components";
import { FONTS, COLORS, dummyData, SIZES, icons } from "../constants";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { connect } from "react-redux";

const Rewards = ({ navigation, appTheme }) => {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {/* Header */}
        <HeaderBar />

        {/* Details */}
        <FlatList
          style={{
            marginTop: -25,
            marginTopLeftRadius: SIZES.radius * 2,
            borderTopRightRadius: SIZES.radius * 2,
            backgroundColor: appTheme.backgroundColor,
          }}
          data={dummyData.availableRewards}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* Reward Point */}

              {/* Buttons */}

              {/* Header Label */}
            </View>
          }
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: SIZES.padding,
                  marginBottom: SIZES.base,
                  paddingVertical: SIZES.base,
                  borderRadius: 20,
                  backgroundColor: item.eligible ? COLORS.yellow : COLORS.gray2,
                }}
              >
                <Text
                  style={{
                    color: item.eligible ? COLORS.black : COLORS.lightGray2,
                    fontFamily: "Rotobo_400Regular",
                    ...FONTS.body3,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
}

function mapDispatchToProp(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProp)(Rewards);
