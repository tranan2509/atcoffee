import * as types from './action';

const initialState = {
  user: [],
  error: '',
};

const signUpReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.SIGN_UP:
      //console.log('reducer', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case types.ERROR_SIGN_UP:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export {signUpReducer};
