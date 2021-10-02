import server from '../server'

const LoginCommand = {

  /**
   * Function: login by username and password
   * @param {*} user 
   * @returns 
   */
  login: async (user) => {

    const url = '/api/authenticate';
    const res = await server.postDataLogin(url, user);
    return res ? res : null;
  }

}

export default LoginCommand;