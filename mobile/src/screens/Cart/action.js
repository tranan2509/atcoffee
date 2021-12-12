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
export const GET_ADDRESS = 'GET_ADDRESS';
export const UPDATE_DELIVERY = 'UPDATE_DELIVERY';
export const GET_DELIVERY = 'GET_DELIVERY';
export const UPDATE_STATE_PRODUCT_IN_CART = 'UPDATE_STATE_PRODUCT_IN_CART';
export const USE_CODE_DISCOUNT = 'USE_CODE_DISCOUNT';

export const useCodeDiscount = code => {
  return dispatch => {
    dispatch({type: USE_CODE_DISCOUNT, payload: code});
  };
};

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
      if (res.data) {
        dispatch({type: UPDATE_CART, payload: res.data});
      } else {
        dispatch({type: ERROR_CART, error: 'error'});
      }
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

export const updateDelivery = shipping => {
  return async dispatch => {
    console.log('update delivery', `${shipping}`);
    await AsyncStorage.setItem('delivery', `${shipping}`);
    console.log('update delivery', `${shipping}`);
    dispatch({type: UPDATE_DELIVERY, payload: shipping});
  };
};

export const getDelivery = () => {
  return async dispatch => {
    try {
      const res = await AsyncStorage.getItem('delivery');
      console.log('delivery', res);
      if (res == 'true') {
        dispatch({type: GET_DELIVERY, payload: true});
      } else {
        dispatch({type: GET_DELIVERY, payload: false});
      }
    } catch (err) {
      console.log('This is error in action get delivery', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const updateStateProductInCart = (id, state) => {
  return dispatch => {
    console.log('action', id, state);
    dispatch({type: UPDATE_STATE_PRODUCT_IN_CART, payload: {id, state}});
  };
};

export const addAddress = address => {
  return async dispatch => {
    const countAddress = await AsyncStorage.getItem('address');
    let amountAddress = parseInt(countAddress);
    amountAddress = amountAddress + 1;
    await AsyncStorage.setItem('address', `${amountAddress}`);
    await AsyncStorage.setItem(`address${amountAddress}`, address);
    dispatch({type: ADD_ADDRESS, payload: address});
  };
};

export const getAddress = () => {
  return async dispatch => {
    const countAddress = await AsyncStorage.getItem('address');
    let amountAddress = parseInt(countAddress);
    let allAddress = [];
    //fix
    allAddress = {...allAddress, amountAddress};
    if (amountAddress > 0) {
      while (amountAddress) {
        const addressShipping = await AsyncStorage.getItem(
          `address${amountAddress}`,
        );
        let title = `address${amountAddress}`;
        let address = {[title]: addressShipping};
        amountAddress = amountAddress - 1;
        allAddress = [...allAddress, address];
      }
    }
    dispatch({type: GET_ADDRESS, payload: allAddress});
  };
};
