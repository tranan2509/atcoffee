import database from '@react-native-firebase/database';
export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const ERROR = 'ERROR';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';

export const getDataNotifications = phone => {
  return dispatch => {
    //console.log('id: ', userId);
    try {
      database()
        .ref(`/notifications/${phone}`)
        .on('value', snapshot => {
          // console.log('User data: ', snapshot.val());
          console.log('data: ', snapshot.val());
          if (snapshot.val()) {
            let data = Object.values(snapshot.val());
            dispatch({
              type: GET_NOTIFICATIONS,
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
export const updateIsSeen = (phone, code) => {
  return async dispatch => {
    try {
      database()
        .ref(`/notification/${phone}/${code}`)
        .update({
          state: true,
        })
        .then(() => console.log('Data updated.'));
      dispatch({type: UPDATE_NOTIFICATIONS});
    } catch (err) {
      console.log('This is error in notification', err);
      dispatch({type: ERROR, error: err});
    }
  };
};
