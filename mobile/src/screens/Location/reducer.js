import * as types from './action';

const initialState = {
  allLocation: [],
  locationLike: [],
  error: '',
};

const locationReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_LOCATION:
      return {
        ...state,
        allLocation: action.payload,
        error: '',
      };
    case types.ERROR_LOCATION:
      return {
        ...state,
        error: action.error,
      };
    case types.GET_LOCATION_LIKE:
      return {
        ...state,
        locationLike: action.payload,
        error: '',
      };
    default:
      return state;
  }
};
export {locationReducer};
