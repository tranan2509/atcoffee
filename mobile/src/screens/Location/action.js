import apiServer from '../../api/apiServer';
import database from '@react-native-firebase/database';

export const GET_LOCATION = 'GET_LOCATION';
export const ERROR_LOCATION = 'ERROR_LOCATION';
export const GET_LOCATION_LIKE = 'GET_LOCATION_LIKE';

export function getAllLocation() {
  return async dispatch => {
    try {
      const res = await apiServer.get('/api/info/store');
      dispatch({type: GET_LOCATION, payload: res.data});
    } catch (err) {
      console.log('This is error in action', err);
      dispatch({type: ERROR_LOCATION, error: err});
    }
  };
}

export const getData = phone => {
  return dispatch => {
    //console.log('id: ', userId);
    try {
      database()
        .ref(`/locations/${phone}`)
        .on('value', snapshot => {
          // console.log('User data: ', snapshot.val());
          console.log('data location: ', snapshot.val());
          if (snapshot.val()) {
            let data = Object.values(snapshot.val());
            dispatch({
              type: GET_LOCATION_LIKE,
              payload: data,
            });
          }
        });
    } catch (err) {
      console.log('error in manage order', err);
      dispatch({type: ERROR, error: err});
    }
  };
};
