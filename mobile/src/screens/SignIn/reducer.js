import * as types from './action';

const initialState = {
  data: {},
  allType: [],
  error: '',
};

const signInReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.EDIT_PASSWORD:
      console.log('reducer', action.payload);
      return {
        ...state,
        data: action.payload,
        error: '',
      };
    case types.SIGN_IN || types.AUTO_SIGN_IN:
      //console.log('reducer', action.payload);
      return {
        ...state,
        data: action.payload,
        error: '',
      };
    case types.GET_USER:
      return {
        ...state,
        data: action.payload,
        error: '',
      };
    case types.AUTO_SIGN_IN:
      //console.log('reducer');
      return {
        ...state,
        data: action.payload,
        error: '',
      };
    case types.ERROR_SIGN_IN:
      console.log('error', action.error);
      return {
        ...state,
        error: action.error,
      };
    case types.LOG_OUT:
      return {
        data: {},
        error: '',
      };
    case types.GET_TYPE:
      return {
        ...state,
        allType: action.payload,
        error: '',
      };
    default:
      return state;
  }
};
export {signInReducer};
