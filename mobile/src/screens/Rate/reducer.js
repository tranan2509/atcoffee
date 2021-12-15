import * as types from './action';

const initialState = {
  ratePro: [],
  error: '',
};

const rateReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_RATE:
      //console.log('reducer', action.payload);
      return {
        ...state,
        ratePro: action.payload,
        error: '',
      };
    case types.ERROR_RATE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export {rateReducer};
