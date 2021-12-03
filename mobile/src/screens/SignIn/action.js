import apiServer from '../../api/apiServer';
import * as RootNavigation from '../../navigation/navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SIGN_IN = 'SIGN_IN';
export const AUTO_SIGN_IN = 'AUTO_SIGN_IN';
export const ERROR_SIGN_IN = 'ERROR_SIGN_IN';
export const LOG_OUT = 'LOG_OUT';
export const GET_USER = 'GET_USER';
export const GET_TYPE = 'GET_TYPE';

export const signIn = (username, password) => {
  return async dispatch => {
    try {
      user = {
        username,
        password,
      };
      const res = await apiServer.post('/api/authenticate', user);
      dispatch({type: SIGN_IN, payload: res.data});
      RootNavigation.navigate('Main');
    } catch (err) {
      console.log('This is error in action Sign In', err);
      dispatch({type: ERROR_SIGN_IN, error: err});
    }
  };
};

export const authenticated = () => {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/user/authenticate`);
      dispatch({type: AUTO_SIGN_IN, payload: res.data});
      //console.log(res.data);
      RootNavigation.navigate('Main');
    } catch (err) {
      console.log('This is error in action Sign In', err);
      dispatch({type: ERROR_SIGN_IN, error: err});
    }
  };
};

export const getUser = username => {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/info/user?username=${username}`);
      dispatch({type: GET_USER, payload: res.data});
      console.log(res.data);
    } catch (err) {
      console.log('This is error in action Sign In', err);
      dispatch({type: ERROR_SIGN_IN, error: err});
    }
  };
};

export const getType = () => {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/info/type`);
      dispatch({type: GET_TYPE, payload: res.data});
      console.log(res.data);
    } catch (err) {
      console.log('This is error in action Sign In', err);
      dispatch({type: ERROR_SIGN_IN, error: err});
    }
  };
};

export const logOut = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('delivery');
    dispatch({
      type: LOG_OUT,
    });
  };
};
