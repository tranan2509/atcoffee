import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Header, IconButton} from '../../components';
import {images, COLORS, SIZES, icons, FONTS} from '../../constants';
import {connect} from 'react-redux';

const Cart = ({themeState, navigation, cartState, locationState}) => {
  return (
    <View style={{flex: 1}}>
      <Header title="Giỏ hàng" navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
          //marginTop: -25,
          //borderTopLeftRadius: SIZES.radius * 2,
          //borderTopRightRadius: SIZES.radius * 2,
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
              {cartState.delivery ? 'Giao đến' : 'Tự đến lấy'}
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
                  icon={icons.logout}
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
          <View style={{paddingHorizontal: 20, paddingTop: 10}}>
            <View
              style={{
                borderBottomColor: themeState.appTheme.textColor,
                borderBottomWidth: 0.5,
                flexDirection: 'row',
                paddingBottom: 15,
              }}>
              <View>
                <Text
                  style={{
                    paddingTop: 5,
                    color: COLORS.blueLight,
                    ...FONTS.body3,
                  }}>
                  Khuyến mãi
                </Text>
                <Text
                  style={{
                    color: themeState.appTheme.textColor,
                    ...FONTS.body4,
                  }}>
                  Giảm 20k đơn từ 89k
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    paddingTop: 15,
                    color: themeState.appTheme.textColor,
                    ...FONTS.body3,
                  }}>
                  50000
                </Text>
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
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    cartState: state.cartReducer,
    locationState: state.locationReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProp)(Cart);
