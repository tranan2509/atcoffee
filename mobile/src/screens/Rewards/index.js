import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {HeaderBar, CustomButton} from '../../components';
import {FONTS, COLORS, dummyData, SIZES, icons} from '../../constants';
import {connect} from 'react-redux';

const Rewards = ({
  navigation,
  themeState,
  signInState,
  cartState,
  rewardsState,
}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  const amountProduct = cartState.cart.length;
  const getType = () => {
    let typeUser = 'Đồng';
    signInState.allType.forEach(types =>
      userInfo.currentPoints > types.point
        ? (typeUser = types.name)
        : console.log('typeUser', types),
    );
    //console.log('typeeee', typeUser);
    return typeUser;
  };
  //console.log('hangggggggggggg', getType());
  function renderRewardPointSection() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginVertical: SIZES.padding,
        }}>
        {/* Text */}
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.h1,
            fontSize: 35,
          }}>
          Phần thưởng
        </Text>
        <Text
          style={{
            color: themeState.appTheme.textColor,
            marginTop: 10,
            width: SIZES.width * 0.6,
            textAlign: 'center',
            ...FONTS.h3,
            lineHeight: 18,
          }}>
          Bạn có: {userInfo.currentPoints} điểm
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: themeState.appTheme.textColor,
              marginTop: 10,

              textAlign: 'center',
              ...FONTS.h3,
              lineHeight: 18,
            }}>
            Hạng : {getType()}
          </Text>
          <Image
            source={icons.point}
            style={{height: 25, width: 25, tintColor: 'yellow', marginTop: 5}}
          />
        </View>
        {/* Image */}
        <ImageBackground
          source={icons.reward_cup}
          resizeMode="stretch"
          style={{
            marginTop: SIZES.padding,
            width: SIZES.width * 0.65,
            height: SIZES.height * 0.35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
            }}>
            <Text style={{...FONTS.h1}}>280</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderAvailableRewardsHeader() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <Text style={{color: themeState.appTheme.textColor, ...FONTS.h2}}>
          Phần thưởng dùng được
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderBar
        userInfo={userInfo}
        navigation={navigation}
        amountProduct={amountProduct}
      />

      {/* Details */}
      <FlatList
        style={{
          marginTop: -25,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          backgroundColor: themeState.appTheme.backgroundColor,
        }}
        data={rewardsState.allRewards}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Reward Point */}
            {renderRewardPointSection()}
            {/* Header Label */}
            {renderAvailableRewardsHeader()}
          </View>
        }
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.base,
                paddingVertical: SIZES.base,
                borderRadius: 40,
                backgroundColor:
                  userInfo.currentPoints > item.proviso
                    ? COLORS.yellow
                    : COLORS.gray2,
              }}>
              <Text
                style={{
                  color:
                    userInfo.currentPoints > item.proviso
                      ? COLORS.black
                      : COLORS.lightGray2,
                  ...FONTS.body3,
                }}>
                {item.name}
              </Text>
            </View>
          );
        }}
        ListFooterComponent={<View style={{marginBottom: 120}} />}
      />
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
    signInState: state.signInReducer,
    cartState: state.cartReducer,
    rewardsState: state.rewardReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProp)(Rewards);
