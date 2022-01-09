import * as types from './action';

const initialState = {
  user: [],
  error: '',
};

const profileReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.EDIT_PROFILE:
      //console.log('reducer', action.payload);
      return {
        ...state,
        user: action.payload,
        error: '',
      };
    case types.ERROR_EDIT:
      return {
        ...state,
        error: action.error,
      };
    case types.RESET_PASSWORD:
      console.log('reducer', action.payload);
      return {
        ...state,
        resetPassword: action.payload,
        error: '',
      };
    default:
      return state;
  }
};
export {profileReducer};
