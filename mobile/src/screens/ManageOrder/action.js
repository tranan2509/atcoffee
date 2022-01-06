import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
export const GET_BILLS = 'GET_BILLS';
export const ERROR = 'ERROR';
export const UPDATE_ORDER = 'UPDATE_ORDER';

export const getData = userId => {
  return dispatch => {
    //console.log('id: ', userId);
    try {
      database()
        .ref('/bills')
        .on('value', snapshot => {
          console.log('User data: ', snapshot.val());
          let data = [];
          for (const property in snapshot.val()) {
            //console.log(`${property}: ${snapshot.val()[property].customerId}`);
            snapshot.val()[property].customerId === userId
              ? data.push(snapshot.val()[property])
              : null;
          }
          console.log('data: ', data);
          dispatch({type: GET_BILLS, payload: data});
        });
    } catch (err) {
      console.log('error in manage order', err);
      dispatch({type: ERROR, error: err});
    }
  };
};

export const updateOrder = (userId, phone) => {
  return dispatch => {
    //console.log('id: ', userId);
    try {
      database()
        .ref('/bills')
        .on('child_changed', snapshot => {
          if (snapshot.val().customerId === userId) {
            dispatch({type: UPDATE_ORDER, payload: snapshot.val()});
            let mess = '';
            switch (snapshot.val().status) {
              case 'REQUESTED':
                mess = `Đơn hàng ${snapshot.val().code} đang chờ được xác nhận`;
                break;
              case 'APPROVED':
                mess = `Đơn hàng ${snapshot.val().code} đang chuẩn bị`;
                break;
              case 'DELIVERING':
                mess = `Đơn hàng ${snapshot.val().code} đang được giao`;
                break;
              case 'COMPLETED':
                mess = `Đơn hàng ${snapshot.val().code} đã giao thành công`;
                break;
              default:
                mess = `Đơn hàng ${snapshot.val().code} đã hủy`;
                break;
            }
            sendNotification(mess, phone);
            database()
              .ref(
                `/notifications/${phone}/${snapshot.val().code}_${
                  snapshot.val().status
                }`,
              )
              .set({
                title: 'Thông báo',
                body: mess,
                isSeen: false,
                codeOrder: snapshot.val().code,
                code: `${snapshot.val().code}_${snapshot.val().status}`,
                //time:
              })
              .then(() => console.log('Data Noti set.'));
          }
        });
      //console.log('data: ', data);
    } catch (err) {
      console.log('error in manage order', err);
      dispatch({type: ERROR, error: err});
    }
  };
};

const sendNotification = (message, phone) => {
  firestore()
    .collection('usertoken')
    .doc(phone)
    .get()
    .then(querySnap => {
      console.log(querySnap._data.token);
      let data = {token: querySnap._data.token, message: message};
      try {
        console.log('querySnap._data.token');
        axios.post(
          'http://5887-2402-9d80-36d-aa65-2d43-4811-aa25-7f22.ngrok.io/send-noti',
          data,
        );
      } catch (err) {
        console.log(err);
      }
    });
};
