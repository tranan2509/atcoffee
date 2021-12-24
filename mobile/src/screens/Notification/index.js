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
}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;

  React.useEffect(() => {
    console.log('billssssssss', notificationState.notifications);
  });

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
            <View>
              <Text>{item.body}</Text>
            </View>
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
  };
}

function mapDispatchToProp(dispatch) {
  return {
    //signInActions: bindActionCreators(signInActionsCreator, dispatch),
    //notificationsActions: bindActionCreators(notificationActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Notification);
