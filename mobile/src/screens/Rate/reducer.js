import * as types from './action';

const initialState = {
  allRate: [],
  ratePro: [],
  error: '',
};

const rateReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_RATE:
      //console.log('reducer', action.payload);
      return {
        ...state,
        error: '',
      };
    case types.ERROR_RATE:
      return {
        ...state,
        error: action.error,
      };
    case types.UPDATE_STATE_RATE:
      return {
        ...state,
        error: '',
      };
    case types.GET_RATE:
      return {
        ...state,
        ratePro: action.payload,
        error: '',
      };
    case types.GET_ALL:
      return {
        ...state,
        allRate: action.payload,
        error: '',
      };
    default:
      return state;
  }
};
export {rateReducer};
