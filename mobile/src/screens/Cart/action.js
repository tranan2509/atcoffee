import apiServer from '../../api/apiServer';

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const GET_CART = 'GET_CART';
export const ERROR_CART = 'ERROR_CART';
export const GET_METHOD_DELIVERY = 'GET_METHOD_DELIVERY';
export const GET_PROMOTION = 'GET_PROMOTION';

export const getCart = customerId => {
  return async dispatch => {
    try {
      const res = await apiServer.get(
        `/api/user/cart?customerId=${customerId}`,
      );
      dispatch({type: GET_CART, payload: res.data});
    } catch (err) {
      console.log('This is error in action', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const addToCart = product => {
  return async dispatch => {
    try {
      const res = await apiServer.post('/api/user/cart', product);
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
      dispatch({type: UPDATE_CART, payload: res.data});
    } catch (err) {
      console.log('This is error in action update cart', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};

export const deleteCart = () => {
  return async dispatch => {
    try {
    } catch (err) {}
  };
};

export const deleteAllCart = () => {
  return async dispatch => {
    try {
    } catch (err) {}
  };
};
