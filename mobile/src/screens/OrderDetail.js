import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS, images, icons, SIZES, dummyData} from '../constants';
import {IconButton} from '../components';
import {connect} from 'react-redux';

const OrderDetail = ({navigation, appTheme, route}) => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const [selectedSize, setSelectedSize] = React.useState(32);

  const [selectedMilkIndex, setSelectedMilkIndex] = React.useState(0);

  const [selectedSweetnessLevel, setSelectedSweetnessLevel] =
    React.useState(50);

  const [selectedIceLevel, setSelectedIceLevel] = React.useState(50);

  React.useEffect(() => {
    let {selectedItem} = route.params;
    setSelectedItem(selectedItem);
  }, []);

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

  function renderHeaderSection() {
    return (
      <View
        style={{
          width: '100%',
          height: '50%',
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
          source={selectedItem?.thumbnail}
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.7,
            height: SIZES.width * 0.7,
          }}
        />
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
          onPress={() => navigation.navigate('Order')}
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
              color: appTheme.headerColor,
              ...FONTS.h1,
              fontSize: 25,
            }}>
            {selectedItem?.name}
          </Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: appTheme.textColor,
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
              color: appTheme.headerColor,
              ...FONTS.h2,
              fontSize: 20,
            }}>
            Pick A Size
          </Text>
          {/* Cup */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              onPress={() => setSelectedSize(20)}>
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{
                  tintColor: selectedSize == 20 ? COLORS.primary : COLORS.gray2,
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>20oz</Text>
              </ImageBackground>
              <Text
                style={{
                  marginTop: 3,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}>
                $4.50
              </Text>
            </TouchableOpacity>

            {/* Cup2 */}
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              onPress={() => setSelectedSize(32)}>
              <ImageBackground
                source={icons.coffee_cup}
                style={{
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{
                  tintColor: selectedSize == 32 ? COLORS.primary : COLORS.gray2,
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>32oz</Text>
              </ImageBackground>
              <Text
                style={{
                  marginTop: 3,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}>
                $5.00
              </Text>
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
                color: appTheme.headerColor,
                ...FONTS.h2,
                fontSize: 20,
              }}>
              Milk
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
                color: COLORS.white,
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
                  color: appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                }}>
                Sweetness
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
                  color: appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                }}>
                Ice
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

  //console.log(selectedMilkIndex);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150,
        }}>
        {/* Header */}
        {renderHeaderSection()}
        {/* Detail */}
        {renderDetailSection()}
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
}

function mapDispatchToProp(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProp)(OrderDetail);
