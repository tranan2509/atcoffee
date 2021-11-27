import apiServer from '../../api/apiServer';

export const GET_LOCATION = 'GET_LOCATION';
export const ERROR_LOCATION = 'ERROR_LOCATION';

export function getAllLocation() {
  return async dispatch => {
    try {
      const res = await apiServer.get('/api/info/store');
      dispatch({type: GET_LOCATION, payload: res.data});
    } catch (err) {
      console.log('This is error in action', err);
      dispatch({type: ERROR_LOCATION, error: err});
    }
  };
}
