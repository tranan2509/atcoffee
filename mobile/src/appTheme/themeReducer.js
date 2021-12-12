import * as themeActionTypes from './themeAction';
import {selectedTheme} from '../constants';

const initialState = {
  appTheme: selectedTheme,
  error: null,
};
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case themeActionTypes.TOGGLE_THEME_BEGIN:
      return {
        ...state,
        error: null,
      };
    case themeActionTypes.TOGGLE_THEME_SUCCESS:
      return {
        ...state,
        appTheme: action.payload.selectedTheme,
      };
    case themeActionTypes.TOGGLE_THEME_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case themeActionTypes.GET_THEME:
      return {
        ...state,
        appTheme: action.payload,
      };
    default:
      return state;
  }
};

export {themeReducer};
