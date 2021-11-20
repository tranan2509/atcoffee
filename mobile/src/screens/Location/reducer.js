import * as types from './action';

const initialState = {
  allLocation: [],
  error: '',
};

const locationReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_LOCATION:
      return {
        ...state,
        allLocation: action.payload,
      };
    case types.ERROR_LOCATION:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export {locationReducer};
