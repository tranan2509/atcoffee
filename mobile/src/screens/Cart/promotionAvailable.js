import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {Header, IconButton} from '../../components';
import {connect} from 'react-redux';
import {SIZES, COLORS, icons, FONTS} from '../../constants';
import {formatDate} from '../../common/format';
import * as cartActionsCreator from './action';
import {bindActionCreators} from 'redux';
import {set} from 'react-native-reanimated';

const promotionAvailable = ({
  route,
  navigation,
  themeState,
  rewardsState,
  signInState,
  cartActions,
  cartState,
}) => {
  const [amount, setAmount] = React.useState(0);
  const [typeName, setTypeName] = React.useState('');
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  React.useEffect(() => {
    let {total} = route.params;
    setAmount(total);
    getNameType();
    console.log('total', total);
    console.log('reward', rewardsState);
  }, []);
  console.log('type', typeName);
  const getNameType = () => {
    signInState.allType.forEach(type =>
      type.id == userInfo.typeId ? setTypeName(type.code) : null,
    );
  };

  const usePromotionHandler = async item => {
    console.log('date', new Date() - item.endDate);
    if (amount >= item.proviso && typeName == item.object) {
      await cartActions.useCodeDiscount(item);
      navigation.navigate('Cart');
    } else {
      Alert.alert('Thông báo', 'Không đủ điều kiện dùng mã khuyến mãi', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  const useRewardHandler = async item => {
    if (userInfo.currentPoints > item.proviso) {
      await cartActions.useCodeDiscount(item);
      navigation.navigate('Cart');
    } else {
      Alert.alert('Thông báo', 'Không đủ điều kiện dùng mã quà tặng', [
        {
          text: 'Bỏ qua',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Mã giảm giá" navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: themeState.appTheme.backgroundColor,
          //marginTop: -20,
          //borderTopLeftRadius: SIZES.radius * 2,
          //borderTopRightRadius: SIZES.radius * 2,
          //padding: SIZES.padding,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 5,
          }}>
          {/* Promo */}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                padding: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h2,
              }}>
              Khuyến mãi
            </Text>
          </View>

          {rewardsState.allPromotions.map(
            element =>
              new Date() - element.endDate < 0 && (
                <View
                  key={element.id}
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
                      {element.name}
                    </Text>
                  </View>
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
                      {element.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: SIZES.base,
                      width: '80%',
                    }}>
                    <Text
                      style={{
                        color: themeState.appTheme.textColor,
                        ...FONTS.body4,
                        lineHeight: 21,
                      }}>
                      Áp dụng: từ {formatDate(element.startDate)} đến{' '}
                      {formatDate(element.endDate)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: SIZES.base,
                    }}>
                    {/* Pick up */}

                    <TouchableOpacity
                      style={{
                        borderColor: themeState.appTheme.textColor,
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingHorizontal: SIZES.radius,
                        paddingVertical: 5,
                      }}
                      onPress={() => usePromotionHandler(element)}>
                      <Text
                        style={{
                          color: themeState.appTheme.textColor,
                          ...FONTS.body3,
                        }}>
                        Dùng ngay
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ),
          )}
          {/* Rewards */}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                padding: 5,
                color: themeState.appTheme.textColor,
                ...FONTS.h2,
              }}>
              Quà tặng hội viên
            </Text>
          </View>
          {rewardsState.allRewards.map(element => (
            <View
              key={element.id}
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
                <IconButton
                  icon={icons.promotion}
                  iconStyle={{tintColor: themeState.appTheme.textColor}}
                />
                <Text
                  style={{
                    flex: 1,
                    color: themeState.appTheme.textColor,
                    ...FONTS.h2,
                  }}>
                  {element.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.base,
                }}>
                <TouchableOpacity
                  style={{
                    borderColor: themeState.appTheme.textColor,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                  }}
                  onPress={() => useRewardHandler(element)}>
                  <Text
                    style={{
                      color: themeState.appTheme.textColor,
                      ...FONTS.body3,
                    }}>
                    Dùng ngay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    //locationState: state.locationReducer,
    cartState: state.cartReducer,
    rewardsState: state.rewardReducer,
    signInState: state.signInReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    //locationActions: bindActionCreators(locationActionsCreator, dispatch),
    //orderActions: bindActionCreators(OrderActionsCreator, dispatch),
    cartActions: bindActionCreators(cartActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(promotionAvailable);
