import * as types from './action';

const initialState = {
  allPromotions: [],
  allRewards: [],
  error: '',
};

const rewardReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_PROMOTION:
      return {
        ...state,
        allPromotions: action.payload,
      };
    case types.ERROR_LOCATION:
      return {
        ...state,
        error: action.error,
      };
    case types.GET_REWARDS:
      return {
        ...state,
        allRewards: action.payload,
      };
    default:
      return state;
  }
};
export {rewardReducer};
