import apiServer from '../../api/apiServer';

const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_CART = 'DELETE_CART';
const GET_CART = 'GET_CART';
const ERROR_CART = 'ERROR_CART';

export const getCart = () => {
  return async dispatch => {
    try {
      const res = await apiServer.get('/api/info/store');
      dispatch({type: GET_CART, payload: res.data});
    } catch (err) {
      console.log('This is error in action', err);
      dispatch({type: ERROR_CART, error: err});
    }
  };
};
