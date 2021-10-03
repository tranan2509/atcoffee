import server from '../server'

const LoginCommand = {

  /**
   * Function: login by username and password
   * @param {*} user 
   * @returns 
   */
  login: async (user) => {

    try{
      
      const url = '/api/authenticate';
      const res = await server.postDataLogin(url, user);
      return res ? res : null;
    } catch (error){
      return null;
    }
    
  },

  /**
   * Function: authenticated
   * @returns 
   */
  authenticated: async () => {
    
    try{

      const url = '/api/user/authenticate';
      const res = await server.getData(url);
      return res ? res : null;
    } catch (error) {
      return null;
    }
  }
}

export default LoginCommand;