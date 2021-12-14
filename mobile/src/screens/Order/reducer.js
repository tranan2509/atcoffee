import * as types from './action';

const initialState = {
  allCategories: [],
  errorCategory: '',
  allProducts: [],
  products: [],
  errorProduct: '',
};

const orderReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
        errorProduct: '',
      };
    case types.ERROR_CATEGORIES:
      return {
        ...state,
        errorCategory: action.error,
        errorProduct: '',
      };
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        errorProduct: '',
      };
    case types.GET_ALL_PRODUCTS:
      //console.log('reducer', action.payload);
      return {
        ...state,
        allProducts: action.payload,
        errorProduct: '',
      };
    case types.ERROR_PRODUCTS:
      return {
        ...state,
        errorProduct: action.error,
      };
    default:
      return state;
  }
};
export {orderReducer};
