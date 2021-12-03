import apiServer from '../../api/apiServer';

export const GET_PROMOTION = 'GET_PROMOTION';
export const ERROR_PROMOTION = 'ERROR_PROMOTION';
export const GET_REWARDS = 'GET_REWARDS';

export const getPromotion = () => {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/info/promotion?list=true`);
      //console.log(res.data);
      dispatch({type: GET_PROMOTION, payload: res.data});
    } catch (err) {
      console.log('This is error in action get promotion', err);
      dispatch({type: ERROR_PROMOTION, error: err});
    }
  };
};

export const getReward = () => {
  return async dispatch => {
    try {
      const res = await apiServer.get(`/api/info/reward`);
      //console.log(res.data);
      dispatch({type: GET_REWARDS, payload: res.data});
    } catch (err) {
      console.log('This is error in action get rewards', err);
      dispatch({type: ERROR_PROMOTION, error: err});
    }
  };
};
