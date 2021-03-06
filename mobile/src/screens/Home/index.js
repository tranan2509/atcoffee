import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Image,
} from 'react-native';
import {
  COLORS,
  SIZES,
  icons,
  constants,
  images,
  FONTS,
  dummyData,
} from '../../constants';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {HeaderBar, CustomButton} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cartActionsCreator from '../Cart/action';
import * as manageOrderActionsCreator from '../ManageOrder/action';
import * as notificationActionCreators from '../Notification/action';
import * as locationActionsCreator from '../Location/action';
import {bindActionCreators} from 'redux';

const promoTabs = constants.promoTabs.map(promoTab => ({
  ...promoTab,
  ref: React.createRef(),
}));
const TabIndicator = ({measureLayout, scrollX}) => {
  const inputRange = promoTabs.map((_, i) => i * SIZES.width);

  const TabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: '100%',
        width: TabIndicatorWidth,
        left: 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({appTheme, scrollX, onPromoTabsPress}) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef();

  const tabPosition = Animated.divide(scrollX, SIZES.width);

  React.useEffect(() => {
    let ml = [];

    promoTabs.forEach(promo => {
      //console.log(promo.ref.current);
      try {
        promo.ref.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            //console.log(x, y, width, height);
            ml.push({
              x,
              y,
              width,
              height,
            });
            if (ml.length === promoTabs.length) {
              setMeasureLayout(ml);
            }
          },
        );
      } catch (e) {
        console.log(e.message);
      }
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZES.padding,
        backgroundColor: appTheme.tabBackgroundColor,
        borderRadius: SIZES.radius,
      }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {/* Tabs */}
      {promoTabs.map((item, index) => {
        const textColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.lightGray2, COLORS.white, COLORS.lightGray2],
          extrapolate: 'clamp',
        });
        return (
          <TouchableOpacity
            key={`PromoTab-${index}`}
            onPress={() => onPromoTabsPress(index)}>
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 11,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Animated.Text
                style={{
                  color: textColor,
                  ...FONTS.h3,
                }}>
                {item.title}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = ({
  navigation,
  themeState,
  signInState,
  cartActions,
  cartState,
  manageOrderActions,
  manageOrderState,
  notificationsActions,
  notificationState,
  locationActions,
  rewardsState,
}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const promoScrollViewRef = React.useRef();

  const onPromoTabsPress = React.useCallback(promoTabIndex => {
    promoScrollViewRef?.current?.scrollToOffset({
      offset: promoTabIndex * SIZES.width,
    });
  });
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  const setToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('lalalaaaa', token);
    if (!token) {
      await AsyncStorage.setItem('token', signInState.data.jwt);
      console.log('lalalaaaa2', token);
    }
    await cartActions.getCart(userInfo.id);
    await manageOrderActions.getData(userInfo.id);
    await manageOrderActions.updateOrder(userInfo.id, userInfo.phone);
    await notificationsActions.getDataNotifications(userInfo.phone);
    await locationActions.getData(userInfo.phone);
  };
  React.useEffect(() => {
    setToken();

    //sendNotification('Don hang da hoan thanh vui long nhan hang ngay a!!!');
    //get cart
    //getChangeOrder();
  }, []);
  // React.useEffect(() => {
  //   const newReference = database().ref('/users').push();

  //   console.log('Auto generated key: ', newReference.key);

  //   newReference
  //     .set({
  //       age: 32,
  //     })
  //     .then(() => console.log('Data updated.'));
  // }, []);

  function renderAvailableRewards() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          height: 100,
        }}
        onPress={() => navigation.navigate('Rewards')}>
        {/* Reward Cup */}
        <View
          style={{
            width: 100,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.pink,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}>
          <ImageBackground
            source={icons.reward_cup}
            resizeMode="contain"
            style={{
              width: 85,
              height: 85,
              marginLeft: 3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.transparentBlack,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                }}>
                280
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Reward Details */}
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.lightPink,
            marginLeft: -12,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h2,
              fontSize: 20,
            }}>
            Ph???n th?????ng kh??? d???ng
          </Text>
          <View
            style={{
              marginTop: 5,
              padding: SIZES.base,
              borderRadius: SIZES.radius * 2,
              backgroundColor: COLORS.primary,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
              }}>
              {rewardsState.allRewards.find(
                reward => reward && userInfo.currentPoints > reward.proviso,
              )?.name
                ? rewardsState.allRewards.find(
                    reward => reward && userInfo.currentPoints > reward.proviso,
                  )?.name
                : 'Ch??a ?????t ??i???u ki???n'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function renderPromoDeals() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        {/* Header - Tabs */}
        <Tabs
          appTheme={themeState.appTheme}
          scrollX={scrollX}
          onPromoTabsPress={onPromoTabsPress}
        />
        {/* Details */}
        <Animated.FlatList
          ref={promoScrollViewRef}
          data={dummyData.promos}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                width: SIZES.width,
                paddingTop: 15,
              }}>
              {/* Image */}
              <Image
                source={images.strawberryBackground}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: 180,
                }}
              />
              {/* Name */}
              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.h1,
                  fontSize: 27,
                }}>
                {item.name}
              </Text>
              {/* Description */}
              <Text
                style={{
                  marginTop: 3,
                  color: themeState.appTheme.textColor,
                  ...FONTS.body4,
                }}>
                {item.description}
              </Text>
              {/* Calories */}
              {/* <Text
                style={{
                  marginTop: 3,
                  color: appTheme.textColor,
                  ...FONTS.body4,
                }}>
                Calories: {item.calories}
              </Text> */}
              {/* Button */}
              <CustomButton
                label="Mua ngay"
                isPrimaryButton={true}
                containerStyle={{
                  marginTop: 10,
                  paddingHorizontal: SIZES.padding,
                  paddingVertical: SIZES.base,
                  borderRadius: SIZES.radius * 2,
                }}
                labelStyle={{
                  ...FONTS.h3,
                }}
                onPress={() => navigation.navigate('Location')}
              />
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar
        userInfo={userInfo}
        navigation={navigation}
        amountProduct={cartState.cart.length}
      />

      <ScrollView
        style={{
          flex: 1,
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: themeState.appTheme?.backgroundColor,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        {/* Rewards */}
        {renderAvailableRewards()}
        {/* Promo */}
        {renderPromoDeals()}
      </ScrollView>
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
    signInState: state.signInReducer,
    cartState: state.cartReducer,
    manageOrderState: state.manageOrderReducer,
    notificationState: state.notificationReducer,
    rewardsState: state.rewardReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    cartActions: bindActionCreators(cartActionsCreator, dispatch),
    manageOrderActions: bindActionCreators(manageOrderActionsCreator, dispatch),
    notificationsActions: bindActionCreators(
      notificationActionCreators,
      dispatch,
    ),
    locationActions: bindActionCreators(locationActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Home);
