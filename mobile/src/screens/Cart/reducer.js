import * as types from './action';

const initialState = {
  cart: [],
  delivery: true,
  payment: [],
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
    case types.GET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case types.DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.id !== action.payload),
      };
    case types.DELETE_ALL_CART:
      return {
        ...state,
        cart: [],
      };
    case types.UPDATE_CART:
      return {
        ...state,
        cart: state.cart.map(cartItem =>
          cartItem.id === action.payload.id ? action.payload : cartItem,
        ),
      };
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
