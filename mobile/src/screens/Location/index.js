import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {Header, TabButton} from '../../components';
import {dummyData, COLORS, SIZES, FONTS, icons, images} from '../../constants';
import {connect} from 'react-redux';
import * as locationActionsCreator from './action';
import {bindActionCreators} from 'redux';
import * as OrderActionsCreator from '../Order/action';

const Location = ({
  navigation,
  themeState,
  locationState,
  locationActions,
  orderActions,
  cartState,
  route,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [stateMethod, setStateMethod] = React.useState(true);

  React.useEffect(() => {
    let stateNow = route.params?.stateNow;
    console.log('state now', stateNow);
    console.log('state now', route);
    if (stateNow) {
      setStateMethod(false);
    }
  }, []);

  function renderTopBarSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        {/* Nearby */}
        <TabButton
          containerStyle={{
            width: 80,
          }}
          label="Nearby"
          selected={selectedTab == 0}
          onPress={() => setSelectedTab(0)}
        />
        {/* Previous */}
        <TabButton
          containerStyle={{
            width: 100,
          }}
          label="Previous"
          selected={selectedTab == 1}
          onPress={() => setSelectedTab(1)}
        />
        {/* Favourite */}
        <TabButton
          containerStyle={{
            width: 100,
          }}
          label="Favourite"
          selected={selectedTab == 2}
          onPress={() => setSelectedTab(2)}
        />
      </View>
    );
  }
  function renderSearchBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          height: 50,
          paddingHorizontal: SIZES.padding,
          borderRadius: 25,
          backgroundColor: COLORS.lightGreen2,
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            flex: 1,
            height: 50,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholder="Enter your city, state or zip code"
          placeholderTextColor={COLORS.lightGray2}
        />
        <Image
          source={icons.search}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.lightGray2,
          }}
        />
      </View>
    );
  }

  function renderLocationList() {
    return (
      <FlatList
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
        }}
        data={locationState.allLocation}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        renderItem={({item}) => {
          return (
            <View
              style={{
                marginBottom: SIZES.radius,
                borderRadius: SIZES.radius * 2,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                backgroundColor: themeState.appTheme.cardBackgroundColor,
              }}>
              {/* Name & Bookmark */}
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: themeState.appTheme.textColor,
                    ...FONTS.h2,
                  }}>
                  {item.name}
                </Text>
                {/* <Image
                  source={
                    item.bookmarked ? icons.bookmarkFilled : icons.bookmark
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: item.bookmarked ? COLORS.red2 : COLORS.white,
                  }}
                /> */}
              </View>
              {/* Address */}
              <View
                style={{
                  marginTop: SIZES.base,
                  width: '80%',
                }}>
                <Text
                  style={{
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                    lineHeight: 21,
                  }}>
                  {item.address}
                </Text>
              </View>
              {/* Operation Hours */}
              <View
                style={{
                  marginTop: SIZES.base,
                }}>
                <Text
                  style={{
                    color: themeState.appTheme.textColor,
                    ...FONTS.body5,
                    lineHeight: 16,
                  }}>
                  {item.timeOpen} - {item.timeClose}
                </Text>
              </View>
              {/* Services */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.base,
                }}>
                {/* Pick up */}
                {stateMethod && (
                  <TouchableOpacity
                    style={{
                      borderColor: themeState.appTheme.textColor,
                      borderWidth: 1,
                      borderRadius: 20,
                      paddingHorizontal: SIZES.radius,
                      paddingVertical: 5,
                    }}
                    onPress={async () => {
                      await orderActions.getAllProducts(item.code);
                      navigation.navigate('Order', {selectedLocation: item});
                    }}>
                    <Text
                      style={{
                        color: themeState.appTheme.textColor,
                        ...FONTS.body3,
                      }}>
                      Đặt hàng
                    </Text>
                  </TouchableOpacity>
                )}
                {/* Delivery */}
                {!stateMethod && (
                  <TouchableOpacity
                    style={{
                      borderColor: themeState.appTheme.textColor,
                      borderWidth: 1,
                      borderRadius: 20,
                      paddingHorizontal: SIZES.radius,
                      paddingVertical: 5,
                      marginLeft: 5,
                    }}
                    onPress={() =>
                      navigation.navigate('Cart', {selectedItem: item})
                    }>
                    <Text
                      style={{
                        color: themeState.appTheme.textColor,
                        ...FONTS.body3,
                      }}>
                      Nhận hàng
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Cửa hàng" navigation={navigation} />
      {/* Detail */}
      <View
        style={{
          flex: 1,
          backgroundColor: themeState.appTheme.backgroundColor,
          marginTop: -20,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          padding: SIZES.padding,
        }}>
        {renderTopBarSection()}
        {renderSearchBar()}
        {renderLocationList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    locationState: state.locationReducer,
    cartState: state.cartReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    locationActions: bindActionCreators(locationActionsCreator, dispatch),
    orderActions: bindActionCreators(OrderActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Location);
