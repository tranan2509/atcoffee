import database from '@react-native-firebase/database';

export const GET_BILLS = 'GET_BILLS';
export const ERROR = 'ERROR';

export const getData = userId => {
  return async dispatch => {
    let data = [];
    console.log('id: ', userId);
    try {
      await database()
        .ref('/bills')
        .once('value')
        .then(snapshot => {
          for (const property in snapshot.val()) {
            //console.log(`${property}: ${snapshot.val()[property].customerId}`);
            snapshot.val()[property].customerId === userId
              ? data.push(snapshot.val()[property])
              : null;
          }
          console.log('data: ', data);
        });
      console.log('data: ', data);
      dispatch({type: GET_BILLS, payload: data});
    } catch (err) {
      console.log('error in manage order', err);
      dispatch({type: ERROR, error: err});
    }
  };
};
