import * as types from './action';

const initialState = {
  notifications: [],
  error: '',
};

const notificationReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_NOTIFICATIONS:
      return {
        notifications: action.payload,
        error: '',
      };
    case types.UPDATE_NOTIFICATIONS:
      return {
        ...state,
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
export {notificationReducer};
