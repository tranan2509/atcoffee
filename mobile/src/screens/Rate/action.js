import apiServer from '../../api/apiServer';
import * as RootNavigation from '../../navigation/navigationRef';

export const ADD_RATE = 'ADD_RATE';
export const ERROR_RATE = 'ERROR_RATE';

export const addRate = ratePro => {
  return async dispatch => {
    try {
      const res = await apiServer.post(`/api/user/rate`, ratePro);
      console.log('action', res.data);
      dispatch({type: ADD_RATE, payload: res.data});
    } catch (err) {
      console.log('This is error in order-cate', err);
      dispatch({type: ERROR_RATE, error: err});
    }
  };
};
