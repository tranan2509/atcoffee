import apiServer from '../../api/apiServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const DELETE_ALL_CART = 'DELETE_ALL_CART';
export const GET_CART = 'GET_CART';
export const ERROR_CART = 'ERROR_CART';
export const GET_METHOD_DELIVERY = 'GET_METHOD_DELIVERY';
export const GET_PAYMENT = 'GET_PAYMENT';
export const ADD_ADDRESS = 'ADD_ADDRESS';

export const getCart = customerId => {
  return async dispatch => {
    try {
      const res = await apiServer.get(
        `/api/user/cart?customerId=${customerId}`,
      );
      console.log('getcart', res.data);
      dispatch({type: GET_CART, payload: res.data});
    } catch (err) {
      console.log('This is error in action get cart', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const addToCart = product => {
  return async dispatch => {
    try {
      const res = await apiServer.post('/api/user/cart', product);
      console.log('addcart', res.data);
      dispatch({type: ADD_TO_CART, payload: res.data});
    } catch (err) {
      console.log('This is error in action add cart', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const updateCart = product => {
  return async dispatch => {
    try {
      const res = await apiServer.put('/api/user/cart', product);
      console.log('updatecart', res.data);
      dispatch({type: UPDATE_CART, payload: res.data});
    } catch (err) {
      console.log('This is error in action update cart', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const deleteCart = cartId => {
  return async dispatch => {
    try {
      const res = await apiServer.delete(`/api/user/cart?cartId=${cartId}`);
      if (res) {
        dispatch({type: DELETE_CART, payload: cartId});
      }
    } catch (err) {
      console.log('This is error in action delete cart', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const deleteAllCart = userId => {
  return async dispatch => {
    try {
      const res = await apiServer.delete(`/api/user/cart?userId=${userId}`);
      console.log(res.data);
      if (res.data) {
        dispatch({type: DELETE_ALL_CART});
      }
    } catch (err) {
      console.log('This is error in action delete all cart', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const getPayment = () => {
  return async dispatch => {
    try {
      const res = await apiServer.get('/api/info/payment');
      dispatch({type: GET_PAYMENT, payload: res.data});
    } catch (err) {
      console.log('This is error in action get payment', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const getDelivery = () => {
  return async dispatch => {
    try {
      const res = await AsyncStorage.getItem('delivery');
      if ((res = 'true')) {
        dispatch({type: GET_PAYMENT, payload: true});
      } else {
        dispatch({type: GET_PAYMENT, payload: false});
      }
    } catch (err) {
      console.log('This is error in action get delivery', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const addAddress = address => {
  return async dispatch => {};
};
