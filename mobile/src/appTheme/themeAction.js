import {lightTheme, darkTheme} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOGGLE_THEME_BEGIN = 'TOGGLE_THEME_BEGIN';
export const TOGGLE_THEME_SUCCESS = 'TOGGLE_THEME_SUCCESS';
export const TOGGLE_THEME_FAILURE = 'TOGGLE_THEME_FAILURE';
export const GET_THEME = 'GET_THEME';

export const getTheme = () => {
  return async dispatch => {
    const mode = await AsyncStorage.getItem(`dark`);
    console.log('modeeeeeeeeeee', mode);
    if (mode === 'true') {
      dispatch({type: GET_THEME, payload: darkTheme});
    }
  };
};

export const toggleThemeBegin = () => ({
  type: TOGGLE_THEME_BEGIN,
});

export const toggleThemeSuccess = selectedTheme => ({
  type: TOGGLE_THEME_SUCCESS,
  payload: {selectedTheme},
});

export const toggleThemeFailure = error => ({
  type: TOGGLE_THEME_FAILURE,
  payload: {error},
});

export function toggleTheme(themeType) {
  return async dispatch => {
    dispatch(toggleThemeBegin());

    switch (themeType) {
      case 'dark':
        await AsyncStorage.setItem(`dark`, `true`);
        dispatch(toggleThemeSuccess(darkTheme));
        break;
      case 'light':
        await AsyncStorage.setItem(`dark`, `false`);
        dispatch(toggleThemeSuccess(lightTheme));
        break;
      default:
        dispatch(toggleThemeFailure({error: 'Invalid theme type'}));
        break;
    }
  };
}
