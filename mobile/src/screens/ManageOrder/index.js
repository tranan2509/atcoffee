import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {Header, TabButton} from '../../components';
import {COLORS, FONTS, images, icons, SIZES, dummyData} from '../../constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as manageActionsCreator from './action';
import {formatMoney} from '../../common/format';

const ManageOrder = ({
  navigation,
  themeState,
  manageOrderActions,
  signInState,
  manageOrderState,
  locationState,
  orderState,
}) => {
  const [selectedTab, setSelectedTab] = React.useState(1);
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  React.useEffect(() => {
    //console.log('bills: ', manageOrderState);
    //console.log('products: ', orderState);
    //let st = getStatusOrder();
    //console.log('status: ', st, getStatusOrder());
    //console.log('uriImage', getUriImage(2));
    //console.log('quantity', getQuantityOrder(manageOrderState.bills[0]));
  }, [manageOrderState.bills]);

  const getQuantityOrder = bill => {
    return bill.billDetails.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0,
    );
  };

  const getUriImage = id => {
    return orderState.allProducts.find(item => item.id === id).image;
  };

  const getStatusOrder = () => {
    return dummyData.statusBill.find(item => item.id === selectedTab).status;
  };

  function renderTopBarSection() {
    return (
      <FlatList
        style={{
          // marginTop: -SIZES.radius * 15,
          //paddingHorizontal: SIZES.radius,
          height: 50,
        }}
        data={dummyData.statusBill}
        keyExtractor={item => item.id}
        //showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => {
          return (
            <View>
              <TabButton
                containerStyle={{
                  width:
                    item.name === 'Chờ xác nhận' ||
                    item.name === 'Đang chuẩn bị'
                      ? 130
                      : item.name === 'Đã hủy'
                      ? 85
                      : 110,
                }}
                label={item.name}
                selected={selectedTab == item.id}
                onPress={() => setSelectedTab(item.id)}
              />
            </View>
          );
        }}>
        {/* Nearby */}
      </FlatList>
    );
  }
  function renderLocationList() {
    return (
      <FlatList
        style={{
          //marginTop: -SIZES.radius * 15,
          paddingHorizontal: SIZES.radius,
        }}
        data={manageOrderState.bills.filter(
          item => item.status === getStatusOrder(),
        )}
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
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
                    uri: getUriImage(item.billDetails[0].productId),
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
                  {item.billDetails[0].quantity} x {item.billDetails[0].name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginTop: 5,
                  }}>
                  {item.billDetails[0].discount ? (
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
                      {formatMoney(item.billDetails[0].price)}
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
                    {formatMoney(
                      item.billDetails[0].price *
                        (1 - item.billDetails[0].discount / 100),
                    )}
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
                  {getQuantityOrder(item)} sản phẩm x {formatMoney(item.amount)}
                </Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-end',
                    paddingRight: 15,
                    marginTop: 5,
                  }}
                  onPress={() => navigation.navigate('DetailOrder')}>
                  <Text style={{color: COLORS.red}}>{'>>>>'}Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      <Header title="Đơn hàng" navigation={navigation} />
      {/* <TouchableOpacity onPress={() => manageOrderActions.getData(userInfo.id)}>
        <Text>Get</Text>
      </TouchableOpacity> */}
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
        <View style={{height: 530}}>{renderLocationList()}</View>
        {/* {renderLocationList()} */}
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

export default connect(mapStateToProps, mapDispatchToProp)(ManageOrder);
