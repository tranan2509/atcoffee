import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  StyleSheet,
} from 'react-native';
import {IconButton, TabButton, VerticalTextButton} from '../../components';
import {icons, COLORS, SIZES, FONTS, dummyData} from '../../constants';
import Svg, {Circle} from 'react-native-svg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as OrderActionsCreator from './action';
import {formatMoney} from '../../common/format';

const Order = ({navigation, themeState, route, orderActions, orderState}) => {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [selectedCategory, setSelectedCategory] = React.useState(
    orderState.allCategories[0].name,
  );

  const [menu, setMenu] = React.useState(null);

  React.useEffect(() => {
    let {selectedLocation} = route.params;
    setSelectedLocation(selectedLocation);
    //get categories
    //orderActions.getAllCategories();
    //get products
    //orderActions.getAllProducts(selectedLocation.code);
    //return () => console.log('cleanup');
    setMenu(orderState.allProducts);
    //console.log('allProducts', orderState.allProducts);
  }, []);

  React.useEffect(() => {
    //let {selectedLocation} = route.params;
    // if (selectedCategory == '') {
    //   setMenu(orderState.allProducts);
    // } else {
    let menuList = orderState.allProducts.filter(
      pro =>
        1 &&
        pro.categories.filter(menuItem => menuItem.name == selectedCategory)[0],
    );
    //console.log(menuList);
    setMenu(menuList);
    // }
  }, [selectedCategory]);
  //console.log(menu);
  function renderHeaderSection() {
    return (
      <SafeAreaView
        style={{
          height: 160,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
        }}>
        {/* Nav bar */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            alignItems: 'center',
            marginTop: Platform.OS === 'android' ? 20 : 0,
          }}>
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h1,
                fontSize: 25,
              }}>
              Pick-up Order
            </Text>
          </View>
          <View style={{width: 25}} />
        </View>
        {/* Location */}
        <View
          style={{
            marginTop: SIZES.radius,
            backgroundColor: COLORS.white1,
            paddingHorizontal: SIZES.radius,
            paddingVertical: 5,
            borderRadius: SIZES.padding,
          }}>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}>
            {selectedLocation?.name}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  function renderTopBarSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginTop: SIZES.radius,
          justifyContent: 'center',
          paddingLeft: SIZES.padding * 2,
          paddingRight: SIZES.padding,
        }}>
        {/* Tab Button */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <TabButton
            containerStyle={{
              width: 60,
            }}
            label="Menu"
            selected={selectedTab == 0}
            onPress={() => setSelectedTab(0)}
          />
          <TabButton
            containerStyle={{
              width: 90,
            }}
            label="Previous"
            selected={selectedTab == 1}
            onPress={() => setSelectedTab(1)}
          />
          <TabButton
            containerStyle={{
              width: 90,
            }}
            label="Favourite"
            selected={selectedTab == 2}
            onPress={() => setSelectedTab(2)}
          />
        </View>
      </View>
    );
  }

  function renderSideBar() {
    return (
      <View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="60" r="60" fill={COLORS.primary} />
        </Svg>
        <View
          style={{
            marginTop: -10,
            width: 65,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
          <FlatList
            data={orderState.allCategories}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            //keyboardDismissMode="on-drag"
            renderItem={({item}) => {
              return item.state ? (
                <VerticalTextButton
                  label={item.name}
                  containerStyle={{
                    marginTop: 40,
                    width: 80,
                    marginBottom: 40,
                  }}
                  selected={selectedCategory == item.name}
                  onPress={() => setSelectedCategory(item.name)}
                />
              ) : null;
            }}
          />
        </View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="0" r="60" fill={COLORS.primary} />
        </Svg>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeaderSection()}
      {/* Details */}
      <View
        style={{
          flex: 1,
          backgroundColor: themeState.appTheme.backgroundColor,
          // backgroundColor: 'red',
          marginTop: -45,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        {/* Tab Bar */}
        {renderTopBarSection()}

        {/* side bar & Listing */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {/* Side Bar */}
          {renderSideBar()}

          {/* Listing */}
          <FlatList
            data={menu}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              paddingBottom: 50,
            }}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return item.state ? (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('OrderDetail', {
                      selectedItem: item,
                      selectedLocation: selectedLocation,
                    })
                  }>
                  <View
                    style={{
                      height: 150,
                      paddingHorizontal: SIZES.padding,
                      marginTop: index > 0 ? SIZES.padding : 0,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    {/* Image */}

                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: SIZES.padding,
                        width: 130,
                        height: 140,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightYellow,
                        zIndex: 1,
                      }}>
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        resizeMode="contain"
                        style={{
                          width: 100,
                          height: 100,
                        }}
                      />
                    </View>
                    {/* Detail */}
                    <View
                      style={{
                        width: '70%',
                        height: '85%',
                        paddingLeft: '22%',
                        paddingRight: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.primary,
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h2,
                          fontSize: 18,
                          lineHeight: 25,
                        }}>
                        {item.name}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: COLORS.lightYellow,
                            ...FONTS.h2,
                            fontSize: 18,
                          }}>
                          {formatMoney(
                            item.sizes.filter(
                              sizeItem => sizeItem.size == 'S',
                            )[0].price,
                          )}{' '}
                        </Text>
                        {item.discount ? (
                          <View
                            style={{
                              height: 45,
                              width: 45,
                              borderRadius: 20,
                              backgroundColor: COLORS.red,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 30,
                            }}>
                            <Text
                              style={{
                                color: COLORS.lightYellow,
                                ...FONTS.h2,
                                fontSize: 18,
                              }}>
                              {-item.discount + '%'}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ) : null;
            }}
          />
        </View>
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
    orderState: state.orderReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    orderActions: bindActionCreators(OrderActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Order);
