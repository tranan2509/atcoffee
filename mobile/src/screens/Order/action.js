import apiServer from '../../api/apiServer';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ERROR_CATEGORIES = 'ERROR_CATEGORIES';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const ERROR_PRODUCTS = 'ERROR_PRODUCTS';

export function getAllCategories() {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/info/category?list=${true}`);
      //console.log('action', res.data);
      dispatch({type: GET_CATEGORIES, payload: res.data});
    } catch (err) {
      console.log('This is error in order-cate', err);
      dispatch({type: ERROR_CATEGORIES, error: err});
    }
  };
}

export function getAllProducts(storeCode) {
  return async dispatch => {
    //console.log('action 1');
    try {
      if (storeCode != '') {
        const res = await apiServer.get(
          `/api/info/product??page=1&size=1000&store=${storeCode}&category&keyword`,
        );
        dispatch({type: GET_PRODUCTS, payload: res.data.products});
      } else {
        const res = await apiServer.get(
          `/api/info/product??page=1&size=1000&store&category&keyword`,
        );
        //console.log('action', res.data.products);
        dispatch({type: GET_ALL_PRODUCTS, payload: res.data.products});
      }
    } catch (err) {
      console.log('This is error in order-pro', err);
      dispatch({type: ERROR_CATEGORIES, error: err});
    }
  };
}
