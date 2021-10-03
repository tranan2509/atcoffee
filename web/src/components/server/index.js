import axios from 'axios'
import JWT from '../common/Jwt'
import * as Constants from '../common/Constants' 

const instance = axios.create({
  baseURL: Constants.HOSTNAME_DEFAULT,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': JWT.getBearerJWT()
  }
});

const instanceLogin = axios.create({
  baseURL: Constants.HOSTNAME_DEFAULT,
  headers: {
    'Content-Type': 'application/json',
  }
});

const connect = {

    /**
     * postData
     * @param {*} url 
     * @param {*} data 
     * @returns 
     */
    postData: async (url, data) => {

      let res = await instance.post(url, data);
      return res ? res : null;
    },

    /**
     * postDataLogin
     * @param {*} url 
     * @param {*} data 
     * @returns 
     */
     postDataLogin: async (url, data) => {

      let res = await instanceLogin.post(url, data);
      return res ? res : null;
    },

    /**
     * Function: getData
     * @param {*} url 
     * @returns 
     */
    getData: async (url) => {

      let res = await instance.get(url);
      return res.data ? res.data : null;
    }

}

export default connect;