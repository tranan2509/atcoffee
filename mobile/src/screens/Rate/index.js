import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as manageActionsCreator from '../ManageOrder/action';
import * as rateActionsCreator from './action';
import {FONTS, COLORS, images, icons, SIZES} from '../../constants';
import {LoadingProcess} from '../../components';
const Rate = ({
  onPress,
  themeState,
  signInState,
  itemPro,
  showLoading,
  rateActions,
  rateState,
  manageOrderActions,
}) => {
  const userInfo = signInState.data.user
    ? signInState.data.user
    : signInState.data;
  const [comment, setComment] = React.useState('');
  const [pointRate, setPointRate] = React.useState(5);

  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    setPointRate(rating);
  }

  const ratingHandler = async () => {
    showLoading(true);
    onPress();
    let ratePro = {
      code: `RATE${itemPro.code}`,
      state: true,
      comment: comment,
      star: pointRate,
      productId: itemPro.productId,
      userId: userInfo.id,
    };
    await rateActions.addRate(ratePro);
    await rateActions.updateStateRate(itemPro.code);
    await manageOrderActions.getData(userInfo.id);
    showLoading(false);
  };

  return (
    <View
      //zIndex={1}
      style={{
        borderColor: themeState.appTheme.textColor,
        borderWidth: 0.35,
        backgroundColor: themeState.appTheme.backgroundColor,
        borderRadius: 20,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingRight: 10,
          paddingTop: 5,
        }}>
        <Text style={{color: themeState.appTheme.textColor, ...FONTS.h3}}>
          X
        </Text>
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* <AirbnbRating
          count={11}
          reviews={[
            'Terrible',
            'Bad',
            'Meh',
            'OK',
            'Good',
            'Hmm...',
            'Very Good',
            'Wow',
            'Amazing',
            'Unbelievable',
            'Jesus',
          ]}
          defaultRating={11}
          size={20}
        /> */}

        {/* <Rating
          type="heart"
          ratingCount={3}
          imageSize={60}
          showRating
          onFinishRating={ratingCompleted}
        /> */}
        {/* <Rating
          showRating
          ratingCount={5}
          startingValue={5}
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10}}
        /> */}
        <AirbnbRating
          defaultRating={5}
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10}}
          count={5}
          reviews={[
            '1/5 - Tệ :((',
            '2/5 - Tạm -_-',
            '3/5 - Ổn ^-^',
            '4/5 - Ngon <_>',
            '5/5 - Tuyệt <3',
          ]}
        />

        <View
          style={{
            paddingTop: 10,
            //borderColor: themeState.appTheme.textColor,
            height: '30%',
            width: '90%',
            marginBottom: 10,
          }}>
          <TextInput
            placeholder="Bình luận"
            multiline
            value={comment}
            style={{backgroundColor: COLORS.white, padding: 10, height: 100}}
            onChangeText={setComment}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingRight: 20,
          paddingTop: 35,
        }}
        onPress={ratingHandler}>
        <Text style={{color: COLORS.blueLight, ...FONTS.h2}}>Gửi</Text>
      </TouchableOpacity>
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
    rateState: state.rateReducer,
  };
}

function mapDispatchToProp(dispatch) {
  return {
    manageOrderActions: bindActionCreators(manageActionsCreator, dispatch),
    rateActions: bindActionCreators(rateActionsCreator, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(Rate);
