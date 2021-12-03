import * as types from './action';

const initialState = {
  cart: [],
  delivery: true,
  payment: [],
  amountAddress: 0,
  address: {},
  codeDiscount: {},
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
    case types.GET_ADDRESS:
      console.log('state', state);
      return {
        ...state,
        amountAddress: action.payload.amountAddress,
        address: action.payload.address,
      };
    case types.ADD_ADDRESS:
      let title = `address${state.amountAddress + 1}`;
      return {
        ...state,
        amountAddress: state.amountAddress + 1,
        address: [...state.address, {[title]: action.payload}],
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
    case types.GET_METHOD_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
      };
    case types.GET_DELIVERY:
      console.log('reducer get delivery', action.payload);
      return {
        ...state,
        delivery: action.payload,
      };
    case types.UPDATE_DELIVERY:
      console.log('reducer update delivery', action.payload);
      return {
        ...state,
        delivery: action.payload,
      };
    case types.UPDATE_STATE_PRODUCT_IN_CART:
      console.log('reducer state', action.payload);
      return {
        ...state,
        cart: state.cart.map(cartItem =>
          cartItem.id === action.payload.id
            ? {...cartItem, state: !action.payload.state}
            : cartItem,
        ),
      };
    case types.USE_CODE_DISCOUNT:
      return {
        ...state,
        codeDiscount: action.payload,
      };
    default:
      return state;
  }
};
export {cartReducer};
