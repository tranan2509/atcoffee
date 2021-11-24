import * as types from './action';

const initialState = {
  data: {},
  error: '',
};

const signInReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        data: action.payload,
      };
    case types.ERROR_SIGN_IN:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export {signInReducer};
