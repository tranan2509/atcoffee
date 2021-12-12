import React from 'react';
import {View, Text} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {icons} from '../../constants';

const Rate = () => {
  //const WATER_IMAGE = require('./water.png')
  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }
  return (
    <View>
      <AirbnbRating />

      <AirbnbRating
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
      />

      <Rating
        showRating
        onFinishRating={ratingCompleted}
        style={{paddingVertical: 10}}
      />

      <Rating
        type="heart"
        ratingCount={3}
        imageSize={60}
        showRating
        onFinishRating={ratingCompleted}
      />

      <Rating
        type="custom"
        ratingImage={icons.heart}
        ratingColor="#3498db"
        ratingBackgroundColor="#c8c7c8"
        ratingCount={10}
        imageSize={30}
        onFinishRating={ratingCompleted}
        style={{paddingVertical: 10}}
      />
    </View>
  );
};

export default Rate;
