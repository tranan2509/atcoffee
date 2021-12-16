import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {Header, TabButton, LoadingProcess} from '../../components';
import {COLORS, FONTS, images, icons, SIZES, dummyData} from '../../constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as manageActionsCreator from './action';
import {formatMoney} from '../../common/format';
import Rate from '../Rate';
import database from '@react-native-firebase/database';

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
  const [visible, setVisible] = React.useState(false);
  const [itemPro, setItemPro] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
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
    //manageOrderActions.getData(userInfo.id);
    console.log('product', getProRate());

    //updateStateRate('BI63966690D1');
  }, [manageOrderState.bills]);

  const updateStateRate = async code => {
    let codeBill = code.split(`D`);
    database()
      .ref(`/bills/${codeBill[0]}/billDetails/${codeBill[1] - 1}`)
      .update({
        state: false,
      })
      .then(() => console.log('Data updated.'));
    // let data = [];
    // console.log('code', codeBill[0]);
    // await database()
    //   .ref(`/bills/${codeBill[0]}/billDetails/${codeBill[1] - 1}`)
    //   .once('value')
    //   .then(snapshot => {
    //     // for (const property in snapshot.val()) {
    //     //   //console.log(`${property}: ${snapshot.val()[property].customerId}`);
    //     //   snapshot.val()[property].customerId === userInfo.id
    //     //     ? data.push(snapshot.val()[property])
    //     //     : null;
    //     // }
    //     console.log('data state: ', snapshot.val());
    //   });
    //console.log('data: ', data);
  };

  const rateHandler = pro => {
    setItemPro(pro);
    setVisible(true);
  };

  const getProRate = () => {
    let listPro = [];
    const listOrder = manageOrderState.bills?.filter(
      item => item?.status === 'COMPLETED',
    );
    listOrder.forEach(item =>
      item?.billDetails.forEach(pro => pro.state && listPro.push(pro)),
    );
    console.log('order', listOrder);
    return listPro;
  };

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
          height: 50,
        }}
        data={dummyData.statusBill}
        keyExtractor={item => item.id}
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
  const flastListEmpty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode="contain"
          source={icons.createOrder}
          style={{height: 75, width: 75}}
        />
        <Text style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
          Chưa có đơn hàng
        </Text>
      </View>
    );
  };
  function renderOrderList() {
    return (
      <FlatList
        style={{
          //marginTop: -SIZES.radius * 15,
          paddingHorizontal: SIZES.radius,
        }}
        data={manageOrderState.bills.filter(
          item => item.status === getStatusOrder(),
        )}
        ListEmptyComponent={flastListEmpty}
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
                  {getQuantityOrder(item)} sản phẩm - {formatMoney(item.amount)}
                </Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-end',
                    paddingRight: 15,
                    marginTop: 5,
                  }}
                  onPress={() =>
                    navigation.navigate('DetailOrder', {bills: item})
                  }>
                  <Text>{'>>>>'}Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    );
  }

  const headerRate = () => {
    return (
      <View
        style={{
          paddingBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: themeState.appTheme.textColor, ...FONTS.h3}}>
          Hãy đánh giá để quán rút kinh nghiệm ạ!!!
        </Text>
      </View>
    );
  };

  const emptyRate = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: themeState.appTheme.textColor, ...FONTS.h3}}>
          Chưa có sản phẩm có thể đánh giá!!!
        </Text>
      </View>
    );
  };

  function renderRateList() {
    return (
      <FlatList
        style={{
          //marginTop: -SIZES.radius * 15,
          paddingHorizontal: SIZES.radius,
        }}
        data={getProRate()}
        ListEmptyComponent={emptyRate}
        ListHeaderComponent={headerRate}
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
                    uri: getUriImage(item.productId),
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
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.yellow,
                    ...FONTS.h2,
                    fontSize: 14,
                    lineHeight: 25,
                    marginTop: 5,
                  }}>
                  Size: {item.size}, {item.description}
                </Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'flex-end',
                    paddingRight: 15,
                    marginTop: 5,
                  }}
                  onPress={() => rateHandler(item)}>
                  <Text>{'>>>>'}Đánh giá</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    );
  }
  return (
    <View
      style={{flex: 1, backgroundColor: themeState.appTheme.backgroundColor}}>
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
        {getStatusOrder() !== 'RATE' ? (
          <View style={{height: 530}}>{renderOrderList()}</View>
        ) : (
          <View style={{height: 530}}>{renderRateList()}</View>
        )}
      </View>
      {visible && (
        <View
          //zIndex={1}
          style={{
            // height: '80%',
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <Rate
            onPress={() => setVisible(false)}
            itemPro={itemPro}
            showLoading={params => setLoading(params)}
          />
        </View>
      )}
      {loading && (
        <View zIndex={1} style={{marginTop: -100}}>
          <LoadingProcess title="Đang tải..." />
        </View>
      )}
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
