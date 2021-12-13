import * as types from './action';

const initialState = {
  bills: [],
  error: '',
};

const manageOrderReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_BILLS:
      return {
        ...state,
        bills: action.payload,
        error: '',
      };
    case types.ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export {manageOrderReducer};
