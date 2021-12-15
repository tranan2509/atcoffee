import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {Header} from '../../components';
import {FONTS, SIZES, COLORS, icons, dummyData} from '../../constants';
import {formatMoney, formatDate} from '../../common/format';
import * as manageActionsCreator from './action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const detailsOrder = ({
  navigation,
  orderState,
  signInState,
  manageOrderState,
  themeState,
  route,
}) => {
  const [bill, setBill] = React.useState(null);

  React.useEffect(() => {
    let bills = route.params.bills;
    console.log('bill:', bills);
    setBill(bills);
  }, []);

  const getPriceWithoutDiscount = () => {
    return bill?.billDetails.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.quantity * currentValue.price,
      0,
    );
  };

  const getUriImage = id => {
    return orderState.allProducts.find(item => item.id === id).image;
  };

  const flastListHeader = () => {
    return (
      <View
        style={{
          //   backgroundColor:
          //     themeState.appTheme.name == 'dark' ? COLORS.gray1 : COLORS.white,
          width: '100%',
          paddingBottom: 20,
          //paddingTop: 5,
        }}>
        <View
          style={{
            borderBottomColor: themeState.appTheme.textColor,
            borderBottomWidth: 0.35,
          }}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.h2}}>
            Tình trạng đơn hàng
          </Text>
          <Text
            style={{
              color: COLORS.blueLight,
              ...FONTS.h3,
              paddingBottom: 10,
              paddingTop: 10,
            }}>
            {
              dummyData.statusBill.find(item => item.status === bill?.status)
                ?.name
            }
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: themeState.appTheme.textColor,
            borderBottomWidth: 0.35,
          }}>
          <Text style={{color: themeState.appTheme.textColor, ...FONTS.h2}}>
            Địa chỉ nhận hàng
          </Text>
          <Text
            style={{
              color: COLORS.blueLight,
              ...FONTS.h3,
              paddingBottom: 10,
              paddingTop: 10,
            }}>
            {bill?.address}
          </Text>
        </View>
      </View>
    );
  };

  const flastListFooter = () => {
    return (
      <View
        style={{
          width: '100%',
          paddingBottom: 20,
        }}>
        <View
          style={{
            borderBottomColor: themeState.appTheme.textColor,
            borderBottomWidth: 0.35,
          }}>
          <Text
            style={{
              color: themeState.appTheme.textColor,
              ...FONTS.h2,
              paddingTop: 10,
            }}>
            Tổng tiền
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.lightGray2,
                ...FONTS.h3,
                paddingBottom: 5,
                paddingTop: 10,
              }}>
              Tổng cộng:
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: COLORS.lightGray2,
                  ...FONTS.h3,
                  paddingBottom: 5,
                  paddingTop: 10,
                }}>
                {formatMoney(getPriceWithoutDiscount())}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.lightGray2,
                ...FONTS.h3,
                paddingBottom: 10,
                paddingTop: 5,
              }}>
              Giảm giá:
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: COLORS.lightGray2,
                  ...FONTS.h3,
                  paddingBottom: 10,
                  paddingTop: 5,
                }}>
                {formatMoney(getPriceWithoutDiscount() - bill?.price)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.lightGray2,
                ...FONTS.h3,
                paddingBottom: 10,
                paddingTop: 5,
              }}>
              Mã khuyến mãi/Phần thưởng:
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: COLORS.lightGray2,
                  ...FONTS.h3,
                  paddingBottom: 10,
                  paddingTop: 5,
                }}>
                {formatMoney(bill?.price - bill?.amount)}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.lightGray2,
                ...FONTS.h3,
                paddingBottom: 10,
                paddingTop: 5,
              }}>
              Thành tiền:
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: COLORS.lightGray2,
                  ...FONTS.h3,
                  paddingBottom: 10,
                  paddingTop: 5,
                }}>
                {formatMoney(bill?.amount)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  function renderProductList() {
    return (
      <FlatList
        data={bill?.billDetails}
        keyExtractor={item => item?.code}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={flastListHeader}
        ListFooterComponent={flastListFooter}
        keyboardDismissMode="on-drag"
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                height: 150,
                //paddingHorizontal: SIZES.padding,
                marginTop: index > 0 ? SIZES.padding : 0,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              {/* Image */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
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
                    uri: getUriImage(item?.productId),
                  }}
                  resizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
              <View
                style={{
                  width: '75%',
                  height: '85%',
                  paddingLeft: '20%',
                  paddingRight: SIZES.base,
                  paddingVertical: SIZES.base,
                  borderRadius: SIZES.radius,
                  //justifyContent: 'space-between',
                  backgroundColor: COLORS.primary,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h2,
                    fontSize: 18,
                    lineHeight: 25,
                  }}>
                  {item?.quantity} x {item?.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginTop: 5,
                  }}>
                  {item?.discount ? (
                    <Text
                      style={{
                        color: COLORS.lightGray,
                        ...FONTS.h2,
                        fontSize: 15,
                        lineHeight: 25,
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        paddingRight: 10,
                      }}>
                      {formatMoney(item?.price)}
                    </Text>
                  ) : null}
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h2,
                      fontSize: 15,
                      lineHeight: 25,
                      paddingRight: 15,
                    }}>
                    {formatMoney(item?.price * (1 - item?.discount / 100))}
                  </Text>
                </View>

                <Text
                  style={{
                    color: COLORS.yellow,
                    ...FONTS.h2,
                    fontSize: 15,
                    lineHeight: 25,
                    marginTop: 5,
                  }}>
                  Size: {item?.size} {item?.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <Header title="Chi tiết" navigation={navigation} />
      <View
        style={{
          flex: 1,
          backgroundColor: themeState.appTheme.backgroundColor,
          marginTop: -20,
          //borderTopLeftRadius: SIZES.radius * 2,
          //borderTopRightRadius: SIZES.radius * 2,
          padding: SIZES.padding,
        }}>
        <View>{renderProductList()}</View>
      </View>
    </View>
  );
};
function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    signInState: state.signInReducer,
    manageOrderState: state.manageOrderReducer,
    locationState: state.locationReducer,
    orderState: state.orderReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    manageOrderActions: bindActionCreators(manageActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(detailsOrder);
