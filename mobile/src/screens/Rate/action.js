import apiServer from '../../api/apiServer';
import * as RootNavigation from '../../navigation/navigationRef';
import database from '@react-native-firebase/database';

export const ADD_RATE = 'ADD_RATE';
export const UPDATE_STATE_RATE = 'UPDATE_STATE_RATE';
export const ERROR_RATE = 'ERROR_RATE';
export const GET_RATE = 'GET_RATE';
export const GET_ALL = 'GET_ALL';

export const getAllRate = () => {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/info/rate`);
      console.log('action', res.data);
      dispatch({type: GET_ALL, payload: res.data});
    } catch (err) {
      console.log('This is error in rate', err);
      dispatch({type: ERROR_RATE, error: err});
    }
  };
};

export const addRate = ratePro => {
  return async dispatch => {
    try {
      const res = await apiServer.post(`/api/user/rate`, ratePro);
      console.log('action', res.data);
      dispatch({type: ADD_RATE, payload: res.data});
    } catch (err) {
      console.log('This is error in rate', err);
      dispatch({type: ERROR_RATE, error: err});
    }
  };
};
export const updateStateRate = code => {
  return async dispatch => {
    try {
      let codeBill = code.split(`D`);
      database()
        .ref(`/bills/${codeBill[0]}/billDetails/${codeBill[1] - 1}`)
        .update({
          state: false,
        })
        .then(() => console.log('Data updated.'));
      dispatch({type: UPDATE_STATE_RATE});
    } catch (err) {
      console.log('This is error in order-cate', err);
      dispatch({type: ERROR_RATE, error: err});
    }
  };
};
export const getRateByProduct = productId => {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/info/rate?productId=${productId}`);
      console.log('action', res.data);
      dispatch({type: GET_RATE, payload: res.data});
    } catch (err) {
      console.log('This is error in order-cate', err);
      dispatch({type: ERROR_RATE, error: err});
    }
  };
};
