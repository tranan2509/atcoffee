import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {HeaderBar, IconButton} from '../../components';
import {SIZES, images, COLORS, FONTS, icons} from '../../constants';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as notificationActionCreators from './action';
import {formatDate} from '../../common/format';

const Notification = ({
  themeState,
  navigation,
  signInState,
  cartState,
  notificationState,
  manageOrderState,
  notificationsActions,
}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;

  React.useEffect(() => {
    console.log('billssssssss', notificationState.notifications);
  });

  const onActionNotification = async item => {
    navigation.navigate('DetailOrder', {
      bills: manageOrderState.bills.find(
        itemBill => itemBill.code === item.codeOrder,
      ),
    }),
      await notificationsActions.updateIsSeen(userInfo.phone, item.code);
  };

  const flastListEmpty = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: themeState.appTheme.textColor, ...FONTS.body2}}>
          Chưa có thông báo
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{flex: 1, backgroundColor: themeState.appTheme.backgroundColor}}>
      <HeaderBar
        userInfo={userInfo}
        navigation={navigation}
        amountProduct={cartState.cart.length}
      />
      <FlatList
        // style={{
        //   //marginTop: -SIZES.radius * 15,
        //   paddingHorizontal: SIZES.radius,
        // }}
        data={notificationState.notifications}
        ListEmptyComponent={flastListEmpty}
        keyExtractor={item => item.code}
        showsVerticalScrollIndicator={false}
        //extraData={manageOrderState.bills}
        //keyboardDismissMode="on-drag"
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: !item.isSeen
                  ? themeState.appTheme.name == 'dark'
                    ? COLORS.gray1
                    : COLORS.white
                  : themeState.appTheme.backgroundColor,
                padding: 10,
                marginBottom: 10,
              }}
              onPress={() => onActionNotification(item)}>
              <Text style={{color: themeState.appTheme.textColor, ...FONTS.h2}}>
                {item.title}
              </Text>
              <Text
                style={{color: themeState.appTheme.textColor, ...FONTS.body3}}>
                {item.body}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    signInState: state.signInReducer,
    cartState: state.cartReducer,
    notificationState: state.notificationReducer,
    manageOrderState: state.manageOrderReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    //signInActions: bindActionCreators(signInActionsCreator, dispatch),
    notificationsActions: bindActionCreators(
      notificationActionCreators,
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Notification);
