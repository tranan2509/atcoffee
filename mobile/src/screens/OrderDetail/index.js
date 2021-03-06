import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {COLORS, FONTS, images, icons, SIZES, dummyData} from '../../constants';
import {IconButton, LoadingProcess} from '../../components';
import {connect} from 'react-redux';
import {formatMoney} from '../../common/format';
import * as CartActionsCreator from '../Cart/action';
import * as RateActionsCreator from '../Rate/action';
import * as orderActionsCreator from '../Order/action';
import {bindActionCreators} from 'redux';
import {FlatList} from 'react-native-gesture-handler';

const OrderDetail = ({
  navigation,
  themeState,
  route,
  cartActions,
  cartState,
  userState,
  orderState,
  rateState,
  rateActions,
  orderActions,
  signInState,
}) => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const [selectedSize, setSelectedSize] = React.useState('L');

  const [selectedMilkIndex, setSelectedMilkIndex] = React.useState(0);

  const [selectedSweetnessLevel, setSelectedSweetnessLevel] =
    React.useState(50);

  const [selectedIceLevel, setSelectedIceLevel] = React.useState(50);

  const [numberOrder, setNumberOrder] = React.useState(1);

  const [favorites, setFavorites] = React.useState(false);

  const [amountMoney, setAmountMoney] = React.useState(0);

  const [selectedStar, setSelectedStar] = React.useState(0);

  const [selectedLocation, setSelectedLocation] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [editedCart, setEditedCart] = React.useState(0);
  const userInfo = userState.data.user ? userState.data.user : userState.data;
  //console.log('all pro', selectedLocation);
  const getRate = async id => {
    await rateActions.getRateByProduct(id);
  };
  React.useEffect(() => {
    let {selectedItem} = route?.params;
    getRate(selectedItem.id);
  }, []);
  console.log('rateeeeeeeeee', rateState);
  React.useEffect(() => {
    let {selectedItem} = route?.params;
    setSelectedItem(selectedItem);
    let {selectedLocation} = route?.params;
    setSelectedLocation(selectedLocation);
    amountMoneyHandler(selectedSize, numberOrder);
    if (loading) {
      setLoading(false);
    }
    return () => setLoading(false);
  }, [amountMoney]);
  // console.log('item', selectedLocation);
  function amountMoneyHandler(size, total) {
    setAmountMoney(
      selectedItem?.sizes.filter(sizeItem => sizeItem.size == size)[0].price *
        total *
        (1 - selectedItem?.discount / 100),
    );
  }

  // const userInfo = signInState.data.user
  //   ? signInState.data.user
  //   : signInState.data;

  const getTotalRating = item => {
    let sum = 0;
    if (item === -1) {
      sum = rateState.ratePro?.length;
    } else if (item === 0) {
      sum = rateState.ratePro?.reduce(
        (previousValue, currentValue) =>
          currentValue.userId === userInfo.id
            ? previousValue + 1
            : previousValue,
        0,
      );
    } else {
      sum = rateState.ratePro?.reduce(
        (previousValue, currentValue) =>
          currentValue.star === item ? previousValue + 1 : previousValue,
        0,
      );
    }
    return sum;
  };

  function numberOrderHandler(action) {
    let total = 0;
    if (action == '+') {
      total = numberOrder + 1;
      setNumberOrder(total);
    } else if (action == '-' && numberOrder > 0) {
      total = numberOrder - 1;
      setNumberOrder(total);
    }
    amountMoneyHandler(selectedSize, total);
  }

  function milkButtonHandler(action) {
    if (action == 'next' && selectedMilkIndex < dummyData.milkList.length - 1) {
      setSelectedMilkIndex(selectedMilkIndex + 1);
    } else if (action == 'prev' && selectedMilkIndex > 0) {
      setSelectedMilkIndex(selectedMilkIndex - 1);
    }
  }

  function sweetnessLevelButtonHandler(action) {
    if (action == '+' && selectedSweetnessLevel < 100) {
      setSelectedSweetnessLevel(selectedSweetnessLevel + 25);
    } else if (action == '-' && selectedSweetnessLevel > 0) {
      setSelectedSweetnessLevel(selectedSweetnessLevel - 25);
    }
  }

  function iceLevelButtonHandler(action) {
    if (action == '+' && selectedIceLevel < 100) {
      setSelectedIceLevel(selectedIceLevel + 25);
    } else if (action == '-' && selectedIceLevel > 0) {
      setSelectedIceLevel(selectedIceLevel - 25);
    }
  }

  React.useEffect(() => {
    async () => await cartActions.getCart(userInfo.id);
    let {editedCart} = route?.params;
    let {selectedItem} = route?.params;
    if (editedCart) {
      setEditedCart(editedCart);
      setNumberOrder(
        cartState.cart.find(item => item.productId === selectedItem.id)
          .quantity,
      );
      setSelectedSize(
        cartState.cart.find(item => item.productId === selectedItem.id).size,
      );
    }
    if (loading) {
      setLoading(false);
    }
    return () => setLoading(false);
  }, []);
  console.log('orderdetail', orderState.allProducts);
  const checkProInCart = (size, productId, storeId, description) => {
    const cartInfo = cartState.cart.find(
      cartItem =>
        cartItem.productId === productId &&
        cartItem.storeId === storeId &&
        cartItem.size === size &&
        cartItem.description === description,
    );

    if (cartInfo) {
      return {id: cartInfo.id, quantity: cartInfo.quantity};
    }
    return false;
  };

  const dataItem = () => {
    //console.log('all pro', selectedLocation.id);
    let customerId = userInfo.id;
    let productId = selectedItem.id;
    let storeId = selectedLocation.id;
    let size = selectedSize;
    let quantity = numberOrder;
    let code = productId + size + '_' + storeId;
    let milk = 'S???a: ' + dummyData.milkList[selectedMilkIndex].name;
    let sweet = '???????ng: ' + selectedSweetnessLevel + '%';
    let ice = '????: ' + selectedIceLevel + '%';
    let description = milk + ', ' + sweet + ', ' + ice;
    let state = true;
    return {
      customerId,
      productId,
      size,
      description,
      storeId,
      quantity,
      code,
      state,
    };
  };
  const updateCart = async data => {
    await cartActions.updateCart(data);
  };

  const updateCartHandler = async () => {
    setLoading(true);
    var dataItems = dataItem();
    let number = dataItems.quantity;

    await updateCart({
      ...dataItems,
      id: selectedItem.id,
      quantity: number,
    });
    await cartActions.getCart(userInfo.id);
    navigation.goBack();
  };

  const deleteCartItem = async id => {
    if (cartState.cart[0]) {
      await cartActions.deleteCart(id);
    }
    navigation.push('Cart');
  };
  const addToCart = async data => {
    await cartActions.addToCart(data);
  };
  const buyNowHandler = async callback => {
    setLoading(true);
    var dataItems = dataItem();
    const idCard = checkProInCart(
      dataItems.size,
      dataItems.productId,
      dataItems.storeId,
      dataItems.description,
    );
    if (idCard.id) {
      let number = dataItems.quantity + idCard.quantity;

      await updateCart({
        ...dataItems,
        id: idCard.id,
        quantity: number,
      });
      await cartActions.getCart(userInfo.id);
      callback();
    } else {
      await addToCart(dataItems);
      await cartActions.getCart(userInfo.id);
      callback();
    }
    setLoading(false);
  };

  const goToCart = async () => {
    setLoading(true);
    await cartActions.getCart(userInfo.id);
    setLoading(false);
    navigation.push('Cart');
  };

  const addToCartHandler = async () => {
    setLoading(true);
    var dataItems = dataItem();
    const idCard = checkProInCart(
      dataItems.size,
      dataItems.productId,
      dataItems.storeId,
      dataItems.description,
    );

    if (idCard.id) {
      let number = dataItems.quantity + idCard.quantity;
      await updateCart({
        ...dataItems,
        id: idCard.id,
        quantity: number,
      });
      ToastAndroid.show(
        'S???n ph???m ???????c c???p nh???t th??nh c??ng!',
        ToastAndroid.LONG,
      );
      await cartActions.getCart(userInfo.id);
      setLoading(false);
      navigation.goBack();
    } else {
      await addToCart(dataItems);
      ToastAndroid.show('Th??m s???n ph???m th??nh c??ng!', ToastAndroid.LONG);
      await cartActions.getCart(userInfo.id);
      setLoading(false);
      navigation.goBack();
    }
  };

  function renderHeaderSection() {
    return (
      <View
        style={{
          width: '100%',
          height: 400,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 40,
            borderBottomLeftRadius: 100,
            backgroundColor: COLORS.primary,
          }}
        />
        {/* Image item */}
        <Image
          source={{uri: selectedItem?.image}}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.7,
            height: SIZES.width * 0.7,
            marginBottom: 20,
          }}
        />
        {/* numberOrder */}
        <View
          style={{
            position: 'absolute',
            bottom: -20,
            width: SIZES.width,
            height: 50,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
            }}
            onPress={() => numberOrderHandler('-')}>
            <Text style={{...FONTS.body1}}>-</Text>
          </TouchableOpacity>
          <View
            style={{
              width: 50,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text> */}
            <TextInput
              style={{...FONTS.h2}}
              value={numberOrder.toString()}
              onChangeText={setNumberOrder}
            />
          </View>

          <TouchableOpacity
            style={{
              width: 50,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
            }}
            onPress={() => numberOrderHandler('+')}>
            <Text style={{...FONTS.body1}}>+</Text>
          </TouchableOpacity>
        </View>
        {/* Back button */}
        <IconButton
          containerStyle={{
            position: 'absolute',
            top: 30,
            left: 20,
            padding: 10,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.black,
          }}
          icon={icons.leftArrow}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          containerStyle={{
            position: 'absolute',
            top: 30,
            right: 10,
            padding: 10,
            borderRadius: SIZES.radius,
            //backgroundColor: COLORS.black,
          }}
          iconStyle={{tintColor: favorites ? COLORS.red2 : COLORS.white}}
          icon={icons.heart}
          onPress={() => setFavorites(!favorites)}
        />
      </View>
    );
  }

  function renderDetailSection() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 30,
          marginTop: SIZES.padding,
          justifyContent: 'space-between',
        }}>
        {/* Name and Description */}
        <View style={{}}>
          <Text
            style={{
              color: themeState.appTheme.headerColor,
              ...FONTS.h1,
              fontSize: 25,
            }}>
            {selectedItem?.name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: themeState.appTheme.textColor,
              ...FONTS.body3,
            }}>
            {selectedItem?.description}
          </Text>
        </View>
        {/* Size */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.radius,
          }}>
          {/* Label */}
          <Text
            style={{
              flex: 1,
              color: themeState.appTheme.headerColor,
              ...FONTS.h2,
              fontSize: 20,
            }}>
            Size
          </Text>

          {/* Cup1 */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginRight: 100,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: 15,
              }}
              onPress={() => {
                setSelectedSize('S');
                amountMoneyHandler('S', numberOrder);
              }}>
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{
                  tintColor:
                    selectedSize == 'S' ? COLORS.primary : COLORS.gray2,
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>S</Text>
              </ImageBackground>
              <Text
                style={
                  selectedItem?.discount
                    ? {
                        marginTop: 3,
                        color: COLORS.lightYellow,
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        ...FONTS.body3,
                      }
                    : {
                        marginTop: 3,
                        color: themeState.appTheme.textColor,
                        ...FONTS.body3,
                      }
                }>
                {formatMoney(selectedItem?.sizes[0].price)}
              </Text>
              {selectedItem?.discount ? (
                <Text
                  style={{
                    marginTop: 3,
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                  }}>
                  {formatMoney(
                    selectedItem?.sizes[0].price *
                      (1 - selectedItem?.discount / 100),
                  )}
                </Text>
              ) : null}
            </TouchableOpacity>
            {/* Cup2 */}
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              onPress={() => {
                setSelectedSize('M');
                amountMoneyHandler('M', numberOrder);
              }}>
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{
                  tintColor:
                    selectedSize == 'M' ? COLORS.primary : COLORS.gray2,
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>M</Text>
              </ImageBackground>
              <Text
                style={
                  selectedItem?.discount
                    ? {
                        marginTop: 3,
                        color: COLORS.lightYellow,
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        ...FONTS.body3,
                      }
                    : {
                        marginTop: 3,
                        color: themeState.appTheme.textColor,

                        ...FONTS.body3,
                      }
                }>
                {formatMoney(selectedItem?.sizes[1].price)}
              </Text>
              {selectedItem?.discount ? (
                <Text
                  style={{
                    marginTop: 3,
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                  }}>
                  {formatMoney(
                    selectedItem?.sizes[1].price *
                      (1 - selectedItem?.discount / 100),
                  )}
                </Text>
              ) : null}
            </TouchableOpacity>

            {/* Cup3 */}
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              onPress={() => {
                setSelectedSize('L');
                amountMoneyHandler('L', numberOrder);
              }}>
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{
                  tintColor:
                    selectedSize == 'L' ? COLORS.primary : COLORS.gray2,
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>L</Text>
              </ImageBackground>
              <Text
                style={
                  selectedItem?.discount
                    ? {
                        marginTop: 3,
                        color: COLORS.lightYellow,
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        ...FONTS.body3,
                      }
                    : {
                        marginTop: 3,
                        color: themeState.appTheme.textColor,
                        ...FONTS.body3,
                      }
                }>
                {formatMoney(selectedItem?.sizes[2].price)}
              </Text>
              {selectedItem?.discount ? (
                <Text
                  style={{
                    marginTop: 3,
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                  }}>
                  {formatMoney(
                    selectedItem?.sizes[2].price *
                      (1 - selectedItem?.discount / 100),
                  )}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        {/* Milk, Sweetness and Ice */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
          }}>
          {/* Milk */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: themeState.appTheme.headerColor,
                ...FONTS.h2,
                fontSize: 20,
              }}>
              S???a
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                height: 100,
                marginTop: SIZES.base,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}>
              <IconButton
                icon={icons.leftArrow}
                containerStyle={{
                  marginLeft: -15,
                  width: 25,
                  height: 25,
                  borderRadius: 3,
                  backgroundColor: COLORS.white,
                }}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black,
                }}
                onPress={() => milkButtonHandler('prev')}
              />
              <Image
                source={dummyData.milkList[selectedMilkIndex].image}
                resizeMode="contain"
                style={{
                  flex: 1,
                  width: 70,
                  height: 70,
                  tintColor: COLORS.white,
                }}
              />

              <IconButton
                icon={icons.rightArrow}
                containerStyle={{
                  marginRight: -15,
                  height: 25,
                  width: 25,
                  borderRadius: 3,
                  backgroundColor: COLORS.white,
                }}
                iconStyle={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.black,
                }}
                onPress={() => milkButtonHandler('next')}
              />
            </View>
            <Text
              style={{
                marginTop: SIZES.base,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
              }}>
              {dummyData.milkList[selectedMilkIndex].name}
            </Text>
          </View>
          {/* Sweetness & Ice */}
          <View
            style={{
              flex: 1,
            }}>
            {/* Sweetness */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: SIZES.padding,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: themeState.appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                }}>
                ???????ng
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '60%',
                  borderRadius: 15,
                  backgroundColor: COLORS.primary,
                }}>
                <IconButton
                  icon={icons.leftArrow}
                  containerStyle={{
                    marginLeft: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                  onPress={() => sweetnessLevelButtonHandler('-')}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {selectedSweetnessLevel}%
                  </Text>
                </View>
                <IconButton
                  icon={icons.rightArrow}
                  containerStyle={{
                    marginRight: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                  onPress={() => sweetnessLevelButtonHandler('+')}
                />
              </View>
            </View>
            {/* Ice */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: SIZES.padding,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: themeState.appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                }}>
                ????
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '60%',
                  borderRadius: 15,
                  backgroundColor: COLORS.primary,
                }}>
                <IconButton
                  icon={icons.leftArrow}
                  containerStyle={{
                    marginLeft: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                  onPress={() => iceLevelButtonHandler('-')}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {selectedIceLevel}%
                  </Text>
                </View>
                <IconButton
                  icon={icons.rightArrow}
                  containerStyle={{
                    marginRight: -8,
                    width: 25,
                    height: 25,
                    borderRadius: 3,
                    backgroundColor: COLORS.white,
                  }}
                  iconStyle={{
                    width: 15,
                    height: 15,
                    tintColor: COLORS.black,
                  }}
                  onPress={() => iceLevelButtonHandler('+')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  const renderRateProduct = () => {
    return (
      <View style={{paddingTop: 30}}>
        {rateState.ratePro.length > 0 && (
          <View>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: themeState.appTheme.textColor, ...FONTS.h2}}>
                ------Nh???n x??t v?? ????nh gi??-----
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <FlatList
                data={[-1, 0, 1, 2, 3, 4, 5]}
                keyExtractor={item => item}
                horizontal
                contentContainerStyle={{marginBottom: 10}}
                renderItem={({item}) => {
                  return (
                    <View>
                      <TouchableOpacity
                        style={{
                          height: 50,
                          width: item === 0 ? 150 : 80,
                          borderRadius: 10,
                          borderWidth: 0.5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderColor: COLORS.primary,
                          margin: 5,
                          backgroundColor:
                            selectedStar === item ? COLORS.primary : null,
                        }}
                        onPress={() => setSelectedStar(item)}>
                        <Text
                          style={{
                            color: themeState.appTheme.textColor,
                            ...FONTS.h3,
                          }}>
                          {item === -1
                            ? 'T???t c???'
                            : item === 0
                            ? '????nh gi?? c???a b???n'
                            : item}
                        </Text>
                        {item !== 0 && item !== -1 && (
                          <IconButton
                            icon={icons.star}
                            iconStyle={{
                              tintColor: COLORS.yellow,
                              height: 20,
                              width: 20,
                            }}
                            onPress={() => setSelectedStar(item)}
                          />
                        )}
                        <Text
                          style={{
                            color: themeState.appTheme.textColor,
                            ...FONTS.b,
                          }}>
                          ({getTotalRating(item)})
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
        {rateState.ratePro.map(
          item =>
            (item.star === selectedStar ||
              selectedStar === -1 ||
              (selectedStar === 0 && item.userId === userInfo.id)) && (
              <View
                key={item.code}
                style={{
                  padding: 25,
                  marginBottom: 10,
                  backgroundColor:
                    themeState.appTheme.name == 'dark'
                      ? COLORS.gray1
                      : COLORS.white,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <IconButton
                    icon={icons.profile}
                    iconStyle={{
                      tintColor: themeState.appTheme.textColor,
                      height: 40,
                      width: 40,
                    }}
                  />
                  <View style={{marginLeft: 20}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: themeState.appTheme.textColor,

                          ...FONTS.h3,
                        }}>
                        User{' '}
                        {
                          rateState?.ratePro.find(
                            rateItem => rateItem.code == item.code,
                          ).userId
                        }{' '}
                        - {item.star}
                      </Text>
                      <IconButton
                        icon={icons.star}
                        iconStyle={{
                          tintColor: COLORS.yellow,
                          height: 20,
                          width: 20,
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: themeState.appTheme.textColor,
                          ...FONTS.body4,
                        }}>
                        {
                          rateState?.ratePro.find(
                            rateItem => rateItem.code == item.code,
                          ).comment
                        }
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ),
        )}
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeState.appTheme.backgroundColor,
      }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        {/* Header */}
        {renderHeaderSection()}

        {/* Detail */}
        {renderDetailSection()}
        {loading ? (
          <View
            style={{
              marginTop: -250,
              height: 300,
              width: 400,
            }}
            zIndex={1}>
            <LoadingProcess title="??ang t???i ..." />
          </View>
        ) : null}
        {renderRateProduct()}
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.backgroundColor,
          height: 70,
          width: '100%',
          flexDirection: 'row',
        }}>
        {/* Buy now */}
        {!editedCart ? (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              height: '100%',
              width: SIZES.width * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
              //borderRadius: 20,
            }}
            onPress={goToCart}>
            <Text style={{color: 'white', ...FONTS.h3}}>
              Gi??? h??ng ({cartState.cart.length})
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              height: '100%',
              width: SIZES.width * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
              //borderRadius: 20,
            }}
            onPress={updateCartHandler}>
            <Text style={{color: 'white', ...FONTS.h3}}>C???p nh???t</Text>
          </TouchableOpacity>
        )}
        {/* T???ng */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: SIZES.width * 0.4,
            backgroundColor: themeState.appTheme.textColor,
          }}>
          <Text style={{color: COLORS.gray, ...FONTS.h3}}>T???ng ti???n:</Text>
          <Text style={{color: COLORS.gray, ...FONTS.h3}}>
            {formatMoney(amountMoney)}
          </Text>
        </View>
        {/* Th??m v??o gi??? */}
        {!editedCart ? (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              height: '100%',
              width: SIZES.width * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={addToCartHandler}>
            <Text style={{color: 'white', ...FONTS.h3}}>Th??m v??o gi???</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.red2,
              height: '100%',
              width: SIZES.width * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => deleteCartItem(selectedItem.id)}>
            <Text style={{color: 'white', ...FONTS.h3}}>X??a s???n ph???m</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    cartState: state.cartReducer,
    userState: state.signInReducer,
    orderState: state.orderReducer,
    rateState: state.rateReducer,
    signInState: state.signInReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    cartActions: bindActionCreators(CartActionsCreator, dispatch),
    rateActions: bindActionCreators(RateActionsCreator, dispatch),
    orderActions: bindActionCreators(orderActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(OrderDetail);
