import * as types from './action';

const initialState = {
  bills: [],
  changing: {},
  error: '',
};

const manageOrderReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_BILLS:
      return {
        bills: action.payload,
        changing: {},
        error: '',
      };
    case types.UPDATE_ORDER:
      return {
        ...state,
        changing: action.payload,
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
