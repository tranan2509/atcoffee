import * as types from './action';

const initialState = {
  user: [],
  resetPassword: false,
  error: '',
};

const profileReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.EDIT_PROFILE:
      //console.log('reducer', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case types.ERROR_EDIT:
      return {
        ...state,
        error: action.error,
      };
    case types.RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    case types.EDIT_PASSWORD:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export {profileReducer};
