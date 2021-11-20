import * as types from './action';

const initialState = {
  allCategories: [],
  errorCategory: '',
  allProducts: [],
  errorProduct: '',
};

const orderReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case types.ERROR_CATEGORIES:
      return {
        ...state,
        errorCategory: action.error,
      };
    case types.GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
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
