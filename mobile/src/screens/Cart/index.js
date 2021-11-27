import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Header, IconButton} from '../../components';
import {images, COLORS, SIZES, icons, FONTS} from '../../constants';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';

const Cart = ({
  themeState,
  navigation,
  cartState,
  locationState,
  customerState,
}) => {
  const [count, setCount] = React.useState(0);
  const [payment, setPayment] = React.useState('');
  const [discount, setdiscount] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [amountDiscount, setAmountDiscount] = React.useState(0);
  React.useEffect(() => {
    locationState.cart?.map(item => setCount(count + item.quantity));
  }, [locationState]);

  const orderHandler = () => {
    const newReference = database().ref('/bills').push();

    console.log('Auto generated key: ', newReference.key);
    let now = new Date();
    const customerInfo = customerState.data.user
      ? customerState.data.user
      : customerState.data;
    let code = `BI${now.getTime().toString().slice(5)}`;
    newReference
      .set({
        address: customerInfo.address,
        amount,
        customerId: customerInfo.id,
        code,
        discount: amountDiscount,
        id: newReference.key,
        //paymentId:
      })
      .then(() => console.log('Data updated.'));
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
              {cartState.delivery ? 'Giao tận nơi' : 'Tự đến lấy'}
            </Text>
            <TouchableOpacity
              style={{flex: 1, marginTop: '2%'}}
              //onPress={() => navigation.navigate('Information')}
            >
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
              {cartState.delivery ? 'address' : 'store'}
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
              //onPress={() => navigation.navigate('Information')}
            >
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
          {locationState.allLocation.map(item => (
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
                  icon={icons.edited}
                  iconStyle={{tintColor: themeState.appTheme.textColor}}
                />
                <View>
                  <Text
                    style={{
                      color: themeState.appTheme.textColor,
                      ...FONTS.body3,
                      marginLeft: 10,
                    }}>
                    số lượng x Tên sản phẩm
                  </Text>
                  <Text
                    style={{
                      color: themeState.appTheme.textColor,
                      ...FONTS.body3,
                      marginLeft: 10,
                    }}>
                    size, description
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      color: themeState.appTheme.textColor,
                      ...FONTS.body3,
                      //marginRight: 5,
                      marginTop: 15,
                    }}>
                    50000
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
                  50000
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
              <View>
                <Text
                  style={{
                    color: COLORS.blueLight,
                    ...FONTS.body3,
                  }}>
                  Khuyến mãi
                </Text>
                {discount ? (
                  <Text
                    style={{
                      color: themeState.appTheme.textColor,
                      ...FONTS.body4,
                    }}>
                    Giảm 20k đơn từ 89k
                  </Text>
                ) : null}
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                {!discount ? (
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
                    50000
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
                  50000
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
              Thanh toán
            </Text>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 15,
              }}>
              <View>
                <Text
                  style={{
                    color: COLORS.blueLight,
                    ...FONTS.body3,
                  }}>
                  {payment ? payment : 'Bấm chọn phương thức thanh toán'}
                </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Image
                  source={icons.rightArrow}
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 5,
                    height: 10,
                    width: 10,
                    tintColor: themeState.appTheme.textColor,
                  }}
                />
              </View>
            </View>
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
              }}>
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
              500000
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
              - {count} sản phẩm
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
              paddingRight: 28,
            }}>
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
    customerState: state.signInReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProp)(Cart);
