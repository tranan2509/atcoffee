import apiServer from '../../api/apiServer';

export const SIGN_IN = 'SIGN_IN';
export const ERROR_SIGN_IN = 'ERROR_SIGN_IN';

export const signIn = (username, password) => {
  return async dispatch => {
    try {
      user = {
        username,
        password,
      };
      const res = await apiServer.post('/api/authenticate', user);
      dispatch({type: SIGN_IN, payload: res.data});
    } catch (err) {
      console.log('This is error in action Sign In', err);
      dispatch({type: ERROR_SIGN_IN, error: err});
    }
  };
};
