import * as types from './action';

const initialState = {
  cart: [],
  delivery: true,
  error: '',
};

const cartReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_CART || types.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case types.ERROR_CART:
      return {
        ...state,
        error: action.error,
      };
    //case types.UPDATE_CART:
    // case types.ADD_TO_CART:
    //   return {
    //     ...state,
    //     cart: action.payload,
    //   };

    default:
      return state;
  }
};
export {cartReducer};
