const JWT = {

  /**
   * Function: setJWT
   * @param {*} jwt
   */
  setJWT: (jwt) => {
    localStorage.setItem('jwt', jwt);
  },

  /**
   * Function: getJWT
   * @returns
   */
  getJWT: () => {

    const jwt = localStorage.getItem("jwt");
    return jwt;
  },

  /**
   * Function: getBearerJWT
   * @returns
   */
   getBearerJWT: () => {

    const jwt = `Bearer ${localStorage.getItem('jwt')}`;
    return jwt;
  },
};

export default JWT;
