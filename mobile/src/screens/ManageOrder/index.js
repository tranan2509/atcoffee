import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header} from '../../components';
import {COLORS, FONTS, images} from '../../constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as manageActionsCreator from './action';

const ManageOrder = ({
  navigation,
  themeState,
  manageOrderActions,
  signInState,
  manageOrderState,
}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  React.useEffect(() => {
    console.log('bills: ', manageOrderState);
    //console.log('user: ', signInState);
  }, [manageOrderState.bills]);

  return (
    <View>
      <TouchableOpacity onPress={() => manageOrderActions.getData(userInfo.id)}>
        <Text>Get</Text>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    themeState: state.themeReducer,
    signInState: state.signInReducer,
    manageOrderState: state.manageOrderReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    manageOrderActions: bindActionCreators(manageActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(ManageOrder);
