import * as types from './action';

const initialState = {
  data: {},
  error: '',
};

const signInReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN || AUTO_SIGN_IN:
      return {
        ...state,
        data: action.payload,
      };
    case types.ERROR_SIGN_IN:
      return {
        ...state,
        error: action.error,
      };
    case types.LOG_OUT:
      return {
        data: {},
        err: '',
      };
    default:
      return state;
  }
};
export {signInReducer};
