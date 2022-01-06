import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Header, IconButton} from '../../components';
import {images, COLORS, SIZES, icons, FONTS, dummyData} from '../../constants';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import {Picker} from '@react-native-picker/picker';
import * as cartActionsCreator from './action';
import * as orderActionsCreator from '../Order/action';
import * as profileActionsCreator from '../Profile/action';
import * as signInActionsCreator from '../SignIn/action';
import {bindActionCreators} from 'redux';
import {formatMoney} from '../../common/format';
import * as manageOrderActionsCreator from '../ManageOrder/action';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
const Cart = ({
  themeState,
  navigation,
  cartState,
  locationState,
  signInState,
  cartActions,
  orderState,
  orderActions,
  manageOrderActions,
  profileActions,
  signInActions,
}) => {
  const [discount, setDiscount] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [amountWithoutDiscount, setAmountWithoutDiscount] = React.useState(0);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [methodShipping, setMethodShipping] = React.useState(
    dummyData.methodShipping[0].name,
  );
  const [methodPayment, setMethodPayment] = React.useState(
    cartState.payment[0].name,
  );
  const [loading, setLoading] = React.useState(false);
  //const [itemCart, setItemCart] = React.useState([]);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [money, setMoney] = React.useState(amount - discount);
  const [num, setNum] = React.useState([]);
  const [flag, setFlag] = React.useState(0);
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  let storeId = cartState.cart[0]?.storeId;
  let product = cartState.cart?.filter(item => item.storeId != storeId)[0];

  const getProName = pro => {
    return orderState.allProducts.find(item => item.id == pro.productId).name;
  };

  const getProPrice = pro => {
    return orderState.allProducts
      .find(item => item.id == pro.productId)
      .sizes.find(sizeItem => sizeItem.size == pro.size).price;
  };
  const getProDiscount = pro => {
    return orderState.allProducts.find(item => item.id == pro.productId)
      .discount;
  };

  const orderHandler = async () => {
    if (product) {
      Alert.alert('Thông báo', 'Sản phẩm bạn chọn từ hai cửa hàng khác nhau!', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      let now = new Date();
      let code = `BI${now.getTime().toString().slice(1, 9)}`;
      //console.log('all pro', getProName(cartState.cart[0]));
      database()
        .ref(`/bills/${code}`)
        .set({
          address: cartState.delivery
            ? userInfo.address
            : selectedLocation?.address,
          amount: amount - discount,
          code: code,
          createdDate: new Date().getTime(),
          customerId: userInfo.id,
          customerName: userInfo.name,
          discount: amountWithoutDiscount - (amount - discount),
          paymentId: cartState.payment.filter(
            pay => pay.name == methodPayment,
          )[0].id,
          paymentName: methodPayment,
          point: Math.floor((amount - discount) / 1000),
          price: amount,
          promotionId: cartState.codeDiscount?.discount
            ? cartState.codeDiscount.id
            : 0,
          promotionCode: cartState.codeDiscount?.discount
            ? cartState.codeDiscount.code
            : '',
          read: false,
          rewardId: cartState.codeDiscount?.redution
            ? cartState.codeDiscount.id
            : 0,
          staffId: '',
          staffName: '',
          state: true,
          status: 'REQUESTED',
          storeId: storeId,
          billDetails: cartState.cart
            .map(
              (item, index) =>
                item.state && {
                  ...item,
                  code: code + `D${index + 1}`,
                  name: getProName(item),
                  price: getProPrice(item),
                  discount: getProDiscount(item),
                  amount:
                    getProPrice(item) *
                    item.quantity *
                    (1 - getProDiscount(item) / 100),
                },
            )
            .filter(item => item),
        })
        .then(() => console.log('Data set.'));
      sendNotification(`Đơn hàng ${code} đang chờ xác nhận`, userInfo.phone);
      database()
        .ref(`/notifications/${userInfo.phone}/${code}_REQUESTED`)
        .set({
          title: 'Thông báo',
          body: `Đơn hàng ${code} đang chờ xác nhận`,
          isSeen: false,
          codeOrder: code,
          code: `${code}_REQUESTED`,
        })
        .then(() => console.log('Data Noti set.'));
      let totalNum = 0;
      //let idCart = []
      await cartState.cart.forEach(async item =>
        item.state
          ? await cartActions.deleteCart(item.id)
          : (totalNum += item.quantity),
      );
      //console.log('numberOrder');
      //setNum(totalNum);
      console.log('num', totalNum);
      setOrderNumber(totalNum);
      await cartActions.getCart(userInfo.id);
      setFlag(1);
      //await manageOrderActions.getData(userInfo.id);
      if (cartState.codeDiscount?.redution) {
        await profileActions.editProfile(
          userInfo.id,
          userInfo.name,
          userInfo.gender,
          userInfo.phone,
          userInfo.identityCard,
          userInfo.email,
          userInfo.password,
          userInfo.address,
          userInfo.dob,
          userInfo.accumulatedPoints,
          userInfo.currentPoints - cartState.codeDiscount?.proviso,
        );
      }
      await signInActions.getUser(userInfo.username);
      ToastAndroid.show('Đặt hàng thành công!', ToastAndroid.LONG);
    }
  };

  const sendNotification = (message, phone) => {
    firestore()
      .collection('usertoken')
      .doc(phone)
      .get()
      .then(querySnap => {
        console.log(querySnap._data.token);
        let data = {token: querySnap._data.token, message: message};
        try {
          console.log('querySnap._data.token');
          axios.post(
            'http://5887-2402-9d80-36d-aa65-2d43-4811-aa25-7f22.ngrok.io/send-noti',
            data,
          );
        } catch (err) {
          console.log(err);
        }
      });
  };

  // React.useEffect(() => {
  //   console.log('num', num);
  //   if (flag) {
  //     console.log('numberOrder');
  //     setOrderNumber(num);
  //   }
  // }, [flag]);

  const deleteCartItem = async item => {
    if (cartState.cart[0]) {
      await cartActions.deleteCart(item.id);
      setOrderNumber(orderNumber - item.quantity);
    }
  };

  const deleteAllCart = async () => {
    if (cartState.cart[0]) {
      await cartState.cart.forEach(
        async item => await cartActions.deleteCart(item),
      );
      setOrderNumber(0);
    } else {
      Alert.alert('Thông báo', 'Chưa có sản phẩm trong giỏ hàng!', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  const checkAddressHandler = () => {
    if (!cartState.delivery) {
      if (product) {
        Alert.alert(
          'Thông báo',
          'Sản phẩm bạn chọn từ hai cửa hàng khác nhau!',
          [
            {
              text: 'Bỏ qua',
              onPress: () => {},
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {}},
          ],
        );
      } else {
        setMethodShipping(dummyData.methodShipping[1].name);
      }
    }

    if (!cartState.delivery) {
      //let product = cartState.cart.filter(item => item.storeId !== storeId)[0];
      if (product) {
        Alert.alert(
          'Thông báo',
          'Sản phẩm bạn chọn từ hai cửa hàng khác nhau!',
          [
            {
              text: 'Bỏ qua',
              onPress: () => {},
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {}},
          ],
        );
      } else {
        setSelectedLocation(
          locationState.allLocation.filter(item => item.id == storeId)[0],
        );
      }
    }
  };

  //get total number order
  const getTotalNumberOrder = () => {
    if (cartState.cart[0]) {
      let total = cartState.cart.reduce(
        (previousValue, currentValue) =>
          currentValue.state
            ? previousValue + currentValue.quantity
            : previousValue,
        0,
      );
      setOrderNumber(total);
    }
  };

  React.useEffect(() => {
    getTotalNumberOrder();
  }, []);
  React.useEffect(() => {
    setMoney(amount - discount);
  }, [amount, discount]);

  React.useEffect(() => {
    checkAddressHandler();
    amountMoney();
    return () => cartActions.useCodeDiscount({});
  }, [cartState.cart]);
  //console.log('code', cartState.codeDiscount);
  React.useEffect(() => {
    //console.log('code in useEffet', cartState.codeDiscount);

    if (cartState.codeDiscount?.redution) {
      setDiscount(cartState.codeDiscount.redution);
      //setMoney(amount - cartState.codeDiscount.redution);
    } else if (cartState.codeDiscount?.discount) {
      setDiscount((amount * cartState.codeDiscount?.discount) / 100);
      //setMoney(amount - (amount * cartState.codeDiscount?.discount) / 100);
    } else {
      setDiscount(0);
    }
  }, [cartState.codeDiscount]);

  const getDeliveryHandler = async method => {
    if (method == dummyData.methodShipping[0].name && !cartState.delivery) {
      //console.log('delivery');
      await cartActions.updateDelivery(!cartState.delivery);
      navigation.navigate('Address');
    } else if (
      method == dummyData.methodShipping[1].name &&
      cartState.delivery
    ) {
      if (product) {
        Alert.alert(
          'Thông báo',
          'Sản phẩm bạn chọn từ hai cửa hàng khác nhau!',
          [
            {
              text: 'Bỏ qua',
              onPress: () => {},
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {}},
          ],
        );
      } else {
        await setSelectedLocation(
          locationState.allLocation.filter(item => (item.id = storeId))[0],
        );
        await cartActions.updateDelivery(!cartState.delivery);
      }
    }
  };
  const changeAddressHandler = () => {
    if (methodShipping == dummyData.methodShipping[0].name) {
      navigation.navigate('Address');
    }
    //  else {
    //   navigation.navigate('Location', {stateNow: true});
    // }
  };

  const amountMoney = () => {
    let total = 0;
    let amountWithoutDiscount = 0;
    cartState.cart.forEach(cartItem => {
      if (cartItem.state) {
        total =
          total +
          getProPrice(cartItem) *
            cartItem.quantity *
            (1 - getProDiscount(cartItem) / 100);
        amountWithoutDiscount =
          amountWithoutDiscount + getProPrice(cartItem) * cartItem.quantity;
      }
    });
    setAmount(total);
    setAmountWithoutDiscount(amountWithoutDiscount);
  };
  const updateStateCheckBox = async (id, state) => {
    await cartActions.updateStateProductInCart(id, state);
    cartState.cart.forEach(item =>
      item.id === id && state
        ? setOrderNumber(orderNumber - item.quantity)
        : item.id === id
        ? setOrderNumber(orderNumber + item.quantity)
        : null,
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Giỏ hàng" navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: themeState.appTheme.backgroundColor,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            paddingTop: 5,
          }}>
          {/* Delivery */}
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <Picker
              dropdownIconColor={themeState.appTheme.textColor}
              style={{
                backgroundColor: COLORS.transparent,
                color: themeState.appTheme.textColor,
                width: '50%',
              }}
              mode="dropdown"
              selectedValue={methodShipping}
              onValueChange={(itemValue, itemIndex) => {
                console.log('ITEM VALUE __', itemValue);
                setMethodShipping(itemValue);
                getDeliveryHandler(itemValue);
              }}>
              {dummyData.methodShipping.map((item, index) => {
                return (
                  <Picker.Item
                    label={item.name}
                    value={item.name}
                    key={index}
                  />
                );
              })}
            </Picker>
            {cartState.delivery && (
              <TouchableOpacity
                style={{flex: 1, marginTop: '2%', paddingRight: 10}}
                onPress={changeAddressHandler}>
                <Text
                  style={{
                    paddingTop: 5,
                    color: COLORS.blueLight,
                    alignSelf: 'flex-end',
                    ...FONTS.body3,
                  }}>
                  Thay đổi
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <IconButton
              icon={icons.address}
              iconStyle={{tintColor: themeState.appTheme.textColor}}
            />
            {/* address */}
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.body3,
                marginLeft: 10,
              }}>
              {cartState.delivery
                ? userInfo.address
                : selectedLocation?.address
                ? selectedLocation?.address
                : 'Chọn cửa hàng'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 5,
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            marginTop: 10,
          }}>
          {/* product */}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h2,
              }}>
              Các sản phẩm đã chọn
            </Text>
            <TouchableOpacity
              style={{flex: 1, marginTop: '2%'}}
              onPress={() => navigation.navigate('Location')}>
              <Text
                style={{
                  paddingTop: 5,
                  color: COLORS.blueLight,
                  alignSelf: 'flex-end',
                  ...FONTS.body3,
                }}>
                + Thêm
              </Text>
            </TouchableOpacity>
          </View>
          {cartState.cart[0] ? (
            cartState.cart.map(item => (
              <View
                key={item.id}
                style={{
                  paddingVertical: 20,
                  borderBottomColor: themeState.appTheme.textColor,
                  borderBottomWidth: 0.5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <IconButton
                    icon={item.state ? icons.checkbox : icons.uncheckbox}
                    iconStyle={{tintColor: themeState.appTheme.textColor}}
                    onPress={() => updateStateCheckBox(item.id, item.state)}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('OrderDetail', {
                        selectedItem: orderState.allProducts.filter(
                          pro => pro.id == item.productId,
                        )[0],
                        selectedLocation: orderState.allProducts
                          ?.filter(cartItem => cartItem.id == item.productId)[0]
                          .stores.filter(
                            storeItem => storeItem.id == item.storeId,
                          )[0],
                        editedCart: item.id,
                      })
                    }>
                    <Text
                      style={{
                        color: themeState.appTheme.textColor,
                        ...FONTS.body3,
                        marginLeft: 10,
                      }}>
                      {item.quantity} x{' '}
                      {
                        orderState.allProducts.filter(
                          pro => pro.id == item.productId,
                        )[0].name
                      }{' '}
                      x {formatMoney(getProPrice(item) * item.quantity)}
                    </Text>
                    <Text
                      style={{
                        color: themeState.appTheme.textColor,
                        ...FONTS.body5,
                        marginLeft: 10,
                      }}>
                      ĐCCH:{' '}
                      {
                        orderState.allProducts
                          ?.filter(cartItem => cartItem.id == item.productId)[0]
                          .stores.filter(
                            storeItem => storeItem.id == item.storeId,
                          )[0].address
                      }
                    </Text>
                    <Text
                      style={{
                        color: themeState.appTheme.textColor,
                        ...FONTS.body5,
                        marginLeft: 10,
                      }}>
                      Size: {item.size}, {item.description}
                    </Text>
                  </TouchableOpacity>
                  <View style={{flex: 1}}>
                    <IconButton
                      icon={icons.deleted}
                      containerStyle={{
                        alignSelf: 'flex-end',
                        marginTop: 26,
                      }}
                      iconStyle={{tintColor: COLORS.red}}
                      onPress={() => deleteCartItem(item)}
                    />
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                paddingVertical: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: themeState.appTheme.textColor,
                  ...FONTS.h3,
                }}>
                Chưa có sản phẩm trong giỏ!!!!
              </Text>
              <Image
                resizeMode="contain"
                source={icons.cart}
                style={{height: 100, width: 100}}
              />
            </View>
          )}
        </View>
        {/* Total */}
        <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            paddingTop: 5,
            marginTop: 10,
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h2,
              }}>
              Tổng cộng
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 20,
                borderBottomColor: themeState.appTheme.textColor,
                borderBottomWidth: 0.5,
              }}>
              <Text
                style={{
                  paddingTop: 5,
                  color: themeState.appTheme.textColor,
                  ...FONTS.body3,
                }}>
                Thành tiền
              </Text>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 5,
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                  }}>
                  {formatMoney(amountWithoutDiscount)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 20,
                borderBottomColor: themeState.appTheme.textColor,
                borderBottomWidth: 0.5,
              }}>
              <Text
                style={{
                  paddingTop: 5,
                  color: themeState.appTheme.textColor,
                  ...FONTS.body3,
                }}>
                Giảm giá
              </Text>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 5,
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                  }}>
                  {formatMoney(amountWithoutDiscount - amount)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 20, paddingTop: 15}}>
            <View
              style={{
                borderBottomColor: themeState.appTheme.textColor,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PromoAvai', {total: money})
                }>
                <Text
                  style={{
                    color: COLORS.blueLight,
                    ...FONTS.body3,
                  }}>
                  Mã khuyến mãi
                </Text>
                {cartState.codeDiscount?.id ? (
                  <Text
                    style={{
                      color: themeState.appTheme.textColor,
                      ...FONTS.body4,
                    }}>
                    {cartState.codeDiscount?.name}
                  </Text>
                ) : null}
              </TouchableOpacity>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {!cartState.codeDiscount?.id ? (
                  <Image
                    source={icons.rightArrow}
                    style={{
                      alignSelf: 'flex-end',
                      //paddingTop: 9,
                      height: 10,
                      width: 10,
                      tintColor: themeState.appTheme.textColor,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      color: themeState.appTheme.textColor,
                      ...FONTS.body3,
                    }}>
                    {formatMoney(discount)}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 20,
                borderBottomColor: themeState.appTheme.textColor,
                borderBottomWidth: 0.5,
              }}>
              <Text
                style={{
                  paddingTop: 5,
                  color: themeState.appTheme.textColor,
                  ...FONTS.body3,
                }}>
                Tổng tiền
              </Text>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 5,
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                  }}>
                  {formatMoney(amount - discount)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Method payment */}
        <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            paddingTop: 5,
            marginTop: 10,
          }}>
          <View
            style={{
              //paddingHorizontal: 20,
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h2,
                paddingHorizontal: 20,
              }}>
              Thanh toán
            </Text>
          </View>
          <View>
            <Picker
              zIndex={1}
              dropdownIconColor={COLORS.white}
              style={{
                backgroundColor: COLORS.transparent,
                color: themeState.appTheme.textColor,
                marginLeft: 5,
                width: '100%',
              }}
              mode="dropdown"
              selectedValue={cartState.payment[0].name}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue !== cartState.payment[0].name) {
                  Alert.alert(
                    'Thông báo',
                    'Hiện tại chỉ thanh toán với tiền mặt!',
                    [
                      {
                        text: 'Bỏ qua',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => {}},
                    ],
                  );
                }
              }}>
              {cartState.payment.map((item, index) => {
                return (
                  <Picker.Item label={item.name} value={item.name} key={item} />
                );
              })}
            </Picker>
          </View>
        </View>
        {/* delete */}
        <View
          style={{
            backgroundColor:
              themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
            paddingTop: 5,
            marginTop: 10,
          }}>
          <View style={{paddingHorizontal: 20, paddingTop: 15}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingBottom: 20,
              }}
              onPress={deleteAllCart}>
              <IconButton
                icon={icons.deleted}
                iconStyle={{tintColor: COLORS.red}}
              />

              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.body3,
                  marginLeft: 10,
                }}>
                Xóa đơn hàng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: '10%',
          width: '100%',
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text
              style={{
                //paddingTop: 10,
                color: themeState.appTheme.textColor,
                ...FONTS.h3,
                marginLeft: 20,
              }}>
              {cartState.delivery ? 'Giao tận nơi' : 'Tự đến lấy'}
            </Text>
            <Text
              style={{
                paddingTop: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h3,
                marginLeft: 20,
              }}>
              {formatMoney(money)}
            </Text>
          </View>
          <View>
            <Text
              style={{
                //paddingTop: 10,
                color: themeState.appTheme.textColor,
                ...FONTS.h3,
                marginLeft: 7,
              }}>
              - {orderNumber} sản phẩm
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: COLORS.lightPurple,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 50,
              borderRadius: 20,
              marginRight: 10,
              paddingRight: 34,
            }}
            onPress={orderHandler}>
            <Text
              style={{
                alignSelf: 'flex-end',
                color: themeState.appTheme.textColor,
                ...FONTS.h3,
              }}>
              Đặt hàng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    cartState: state.cartReducer,
    locationState: state.locationReducer,
    orderState: state.orderReducer,
    signInState: state.signInReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    cartActions: bindActionCreators(cartActionsCreator, dispatch),
    orderActions: bindActionCreators(orderActionsCreator, dispatch),
    manageOrderActions: bindActionCreators(manageOrderActionsCreator, dispatch),
    profileActions: bindActionCreators(profileActionsCreator, dispatch),
    signInActions: bindActionCreators(signInActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Cart);
